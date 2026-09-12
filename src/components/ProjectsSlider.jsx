import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import ProjectCard from './ProjectCard'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from './Icons'
import './ProjectsSlider.css'

const SPEED_PX_PER_SEC = 36 // lento a propósito: da tiempo a leer el título al pasar
const DRAG_CLICK_THRESHOLD = 6 // px — por debajo de esto, un arrastre corto se trata como click
const INTERACTION_PAUSE_MS = 2500 // pausa tras arrastrar o usar las flechas, antes de retomar el autoplay

function prefiereMenosMovimiento() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/**
 * Carrusel horizontal infinito: la lista de proyectos se duplica una vez
 * en el DOM y el track se desplaza con translate3d en un bucle de
 * requestAnimationFrame, reseteando la posición (módulo el ancho de una
 * copia) para que el bucle sea indetectable — la misma técnica que un
 * "marquee" de logos, pero además arrastrable con el puntero/dedo, no
 * solo autoplay. No se usa ninguna librería de carrusel: con una sola
 * animación y sin "slides" discretos (los proyectos se leen en cualquier
 * punto del scroll, no de uno en uno), el patrón completo de ARIA
 * "carousel" con roles slide/group no encaja bien aquí — se trata en su
 * lugar como una lista horizontal de botones con sus propios controles.
 */
export default function ProjectsSlider({ projects, onOpenProject, paused = false }) {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const viewportRef = useRef(null)

  const setWidthRef = useRef(0)
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const lastTsRef = useRef(null)

  const flagsRef = useRef({ hover: false, focus: false, drag: false, manual: prefiereMenosMovimiento(), interaction: false })
  const dragStartXRef = useRef(0)
  const dragStartOffsetRef = useRef(0)
  const dragDistanceRef = useRef(0)
  const suppressClickRef = useRef(false)
  const interactionTimeoutRef = useRef(null)

  const [manuallyPaused, setManuallyPaused] = useState(() => prefiereMenosMovimiento())

  useEffect(() => {
    flagsRef.current.external = paused
  }, [paused])

  const normalize = useCallback((x) => {
    const w = setWidthRef.current
    if (w <= 0) return x
    let v = x % w
    if (v > 0) v -= w
    return v
  }, [])

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
    }
  }, [])

  // Mide el ancho de una sola copia de la lista (el track contiene dos)
  // para saber sobre qué módulo resetear el scroll infinito. Se
  // recalcula si cambia el tamaño de las tarjetas (breakpoints) o la
  // ventana.
  useEffect(() => {
    function medir() {
      if (trackRef.current) {
        setWidthRef.current = trackRef.current.scrollWidth / 2
      }
    }
    medir()
    const ro = new ResizeObserver(medir)
    if (trackRef.current) ro.observe(trackRef.current)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [projects])

  useEffect(() => {
    function tick(ts) {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts

      const f = flagsRef.current
      const detenido = f.hover || f.focus || f.drag || f.manual || f.external || f.interaction
      if (!detenido && setWidthRef.current > 0) {
        offsetRef.current = normalize(offsetRef.current - SPEED_PX_PER_SEC * dt)
        applyTransform()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [normalize, applyTransform])

  function marcarInteraccion() {
    flagsRef.current.interaction = true
    clearTimeout(interactionTimeoutRef.current)
    interactionTimeoutRef.current = setTimeout(() => {
      flagsRef.current.interaction = false
    }, INTERACTION_PAUSE_MS)
  }

  function desplazarUnaTarjeta(direccion) {
    const total = projects.length
    if (total === 0 || setWidthRef.current === 0) return
    const anchoTarjeta = setWidthRef.current / total
    offsetRef.current = normalize(offsetRef.current - direccion * anchoTarjeta)
    applyTransform()
    marcarInteraccion()
  }

  function alternarPausaManual() {
    setManuallyPaused((prev) => {
      flagsRef.current.manual = !prev
      return !prev
    })
  }

  function onPointerDown(e) {
    flagsRef.current.drag = true
    dragStartXRef.current = e.clientX
    dragStartOffsetRef.current = offsetRef.current
    dragDistanceRef.current = 0
    // OJO: capturar el puntero aquí mismo (en pointerdown) parece lo
    // natural, pero Chromium retarga también el "click" resultante hacia
    // el elemento que tiene la captura — un simple click sin arrastre
    // dejaría de abrir la tarjeta bajo el cursor y abriría "la pista" en
    // su lugar. Por eso la captura se pide más abajo, en el primer
    // pointermove real, cuando ya sabemos que es un arrastre de verdad.
  }

  function onPointerMove(e) {
    if (!flagsRef.current.drag) return
    if (dragDistanceRef.current === 0) {
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* pointerId ya no válido: ignorar */ }
    }
    const dx = e.clientX - dragStartXRef.current
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(dx))
    offsetRef.current = normalize(dragStartOffsetRef.current + dx)
    applyTransform()
  }

  function terminarArrastre() {
    if (!flagsRef.current.drag) return
    flagsRef.current.drag = false
    if (dragDistanceRef.current > DRAG_CLICK_THRESHOLD) {
      suppressClickRef.current = true
      marcarInteraccion()
    }
  }

  // Tras un arrastre real (no un simple click), el evento "click" del
  // botón bajo el puntero se dispara igualmente al soltar — se anula en
  // fase de captura, antes de que llegue al onClick de la tarjeta, para
  // no abrir el modal del proyecto sin querer.
  function onClickCapture(e) {
    if (suppressClickRef.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClickRef.current = false
    }
  }

  function onFocus() {
    flagsRef.current.focus = true
  }

  function onBlur(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      flagsRef.current.focus = false
    }
  }

  const listaDuplicada = [...projects, ...projects]

  return (
    <div
      className="carrusel_proyectos"
      role="region"
      aria-label={t.projects.title}
      onMouseEnter={() => { flagsRef.current.hover = true }}
      onMouseLeave={() => { flagsRef.current.hover = false }}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className="carrusel_proyectos_viewport" ref={viewportRef}>
        <div
          className="carrusel_proyectos_track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={terminarArrastre}
          onPointerCancel={terminarArrastre}
          onClickCapture={onClickCapture}
        >
          {listaDuplicada.map((project, i) => (
            <ProjectCard
              key={`${project.id}-${i}`}
              project={project}
              onOpen={onOpenProject}
              duplicado={i >= projects.length}
            />
          ))}
        </div>
      </div>

      <div className="carrusel_proyectos_controles">
        <button type="button" className="carrusel_proyectos_boton" onClick={() => desplazarUnaTarjeta(-1)} aria-label={t.projects.prev}>
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          className="carrusel_proyectos_boton"
          onClick={alternarPausaManual}
          aria-label={manuallyPaused ? t.projects.resume : t.projects.pause}
          aria-pressed={manuallyPaused}
        >
          {manuallyPaused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button type="button" className="carrusel_proyectos_boton" onClick={() => desplazarUnaTarjeta(1)} aria-label={t.projects.next}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  )
}
