import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { usePointerFino } from '../../hooks/usePointerFino'
import { projects } from '../../data/projects'
import { proyectosOrdenados, derivarProyecto } from '../shared/projectView'
import ProjectModal from '../shared/ProjectModal'
import CabeceraSeccion from './CabeceraSeccion'
import './latente-shared.css'
import './ProjectsLatente.css'

function VistaPreviaFlotante({ activoRef }) {
  const elRef = useRef(null)
  const imgElRef = useRef(null)
  const capRef = useRef(null)
  const pos = useRef({ px: 0, py: 0 })
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    let raf
    function onMove(e) { mouse.current.x = e.clientX; mouse.current.y = e.clientY }
    function tick() {
      const dx = mouse.current.x - pos.current.px
      pos.current.px += dx * 0.11
      pos.current.py += (mouse.current.y - pos.current.py) * 0.11
      if (elRef.current) {
        const rot = Math.max(-9, Math.min(9, dx * 0.04))
        elRef.current.style.transform = `translate3d(${pos.current.px + 28}px, ${pos.current.py - 120}px, 0) rotate(${rot}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  useEffect(() => {
    activoRef.current = {
      show(p) {
        elRef.current?.classList.add('prl_preview--visible')
        if (imgElRef.current && imgElRef.current.getAttribute('src') !== p.img) imgElRef.current.setAttribute('src', p.img)
        if (capRef.current) capRef.current.textContent = p.techTop.join(' / ')
      },
      hide() { elRef.current?.classList.remove('prl_preview--visible') },
    }
  }, [activoRef])

  return (
    <div ref={elRef} className="prl_preview" aria-hidden="true">
      <div className="prl_preview_imagen"><img ref={imgElRef} alt="" /></div>
      <div ref={capRef} className="prl_preview_cap mono" />
    </div>
  )
}

function Fila({ p, onOpen, activoRef }) {
  const [ref, visible] = useScrollReveal()

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={p.aria}
      onClick={(e) => onOpen(p, e.currentTarget)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p, e.currentTarget) } }}
      onMouseEnter={() => activoRef.current?.show(p)}
      className={`prl_fila hl_reveal ${visible ? 'hl_reveal--visible' : ''}`}
    >
      <span className="prl_num mono">{p.num}</span>
      <span className="prl_medio">
        {p.featured && <span className="prl_etiqueta mono">{p.featuredLabel}</span>}
        <span className="prl_titulo">{p.title}</span>
      </span>
      <span className="prl_resumen">
        {p.summary}
        <span className="prl_tech mono">{p.techStr} {p.techMore}</span>
      </span>
      <span className="prl_flecha mono">→</span>
    </div>
  )
}

export default function ProjectsLatente() {
  const { t, lang } = useLanguage()
  const [proyectoActivo, setProyectoActivo] = useState(null)
  const triggerRef = useRef(null)
  const activoRef = useRef(null)
  const punteroFino = usePointerFino()

  const ordenados = proyectosOrdenados(projects)
  const derivados = ordenados.map((p, i) => derivarProyecto(p, i, lang, t))

  function abrir(p, nodo) {
    triggerRef.current = nodo
    setProyectoActivo(p)
  }

  function cerrar() {
    setProyectoActivo(null)
  }

  return (
    <section id="proyectos" className="hl_seccion">
      <CabeceraSeccion numero="02" titulo={t.projects.title} extra={`(${String(derivados.length).padStart(2, '0')})`} />
      <div className="prl_lista" onMouseLeave={() => activoRef.current?.hide()}>
        {derivados.map((p) => <Fila key={p.id} p={p} onOpen={abrir} activoRef={activoRef} />)}
      </div>
      {punteroFino && <VistaPreviaFlotante activoRef={activoRef} />}
      {proyectoActivo && (
        <ProjectModal project={proyectoActivo} onClose={cerrar} triggerRef={triggerRef} />
      )}
    </section>
  )
}
