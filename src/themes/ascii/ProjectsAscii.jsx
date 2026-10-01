import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useScramble } from '../../hooks/useScramble'
import { usePointerFino } from '../../hooks/usePointerFino'
import { projects } from '../../data/projects'
import { proyectosOrdenados, derivarProyecto } from '../shared/projectView'
import ProjectModal from '../shared/ProjectModal'
import './ProjectsAscii.css'

function Tarjeta({ p, onOpen, punteroFino, lang }) {
  const [ref, visible] = useScrollReveal()
  const tituloRef = useRef(null)
  const imgRef = useRef(null)
  const brilloRef = useRef(null)

  useScramble(tituloRef, { modo: 'hover', duracion: 500, lang })

  function tilt(e) {
    if (!punteroFino) return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`
    if (imgRef.current) { imgRef.current.style.filter = 'none'; imgRef.current.style.opacity = '1'; imgRef.current.style.mixBlendMode = 'normal'; imgRef.current.style.transform = 'scale(1.06)' }
    if (brilloRef.current) {
      brilloRef.current.style.opacity = '1'
      brilloRef.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(205,235,79,0.4), transparent 45%)`
    }
  }

  function untilt(e) {
    e.currentTarget.style.transform = ''
    if (imgRef.current) { imgRef.current.style.filter = ''; imgRef.current.style.opacity = ''; imgRef.current.style.mixBlendMode = ''; imgRef.current.style.transform = '' }
    if (brilloRef.current) brilloRef.current.style.opacity = '0'
  }

  return (
    <article
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={p.aria}
      onClick={(e) => onOpen(p, e.currentTarget)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p, e.currentTarget) } }}
      onMouseMove={tilt}
      onMouseLeave={untilt}
      className={`pa_tarjeta reveal ${visible ? 'reveal--visible' : ''}`}
    >
      <div className="pa_imagen">
        <img ref={imgRef} src={p.img} alt="" loading="lazy" />
        <div ref={brilloRef} className="pa_brillo" />
        <div className="pa_insignias">
          <span className="pa_num mono">{p.num}</span>
          {p.featured && <span className="pa_destacado mono">{p.featuredLabel}</span>}
        </div>
      </div>
      <div className="pa_contenido">
        <h3 ref={tituloRef} className="pa_titulo">{p.title}</h3>
        <p className="pa_resumen">{p.summary}</p>
        <div className="pa_fila_tech mono">
          <span className="pa_tech">{p.techStr} {p.techMore}</span>
          <span className="pa_flecha">→</span>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsAscii() {
  const { t, lang } = useLanguage()
  const [proyectoActivo, setProyectoActivo] = useState(null)
  const triggerRef = useRef(null)
  const tituloRef = useRef(null)
  const punteroFino = usePointerFino()

  useScramble(tituloRef, { modo: 'vista', duracion: 650, lang })

  const ordenados = proyectosOrdenados(projects)
  const derivados = ordenados.map((p, i) => derivarProyecto(p, i, lang, t))

  function abrir(p, nodo) {
    triggerRef.current = nodo
    setProyectoActivo(p)
  }

  return (
    <section id="proyectos" className="pa_seccion">
      <div className="pa_cabecera">
        <h2 ref={tituloRef}>{t.projects.title}</h2>
        <span className="pa_count mono">// 02 ({String(derivados.length).padStart(2, '0')})</span>
      </div>
      <div className="pa_grid">
        {derivados.map((p) => (
          <Tarjeta key={p.id} p={p} onOpen={abrir} punteroFino={punteroFino} lang={lang} />
        ))}
      </div>
      {proyectoActivo && (
        <ProjectModal project={proyectoActivo} onClose={() => setProyectoActivo(null)} triggerRef={triggerRef} />
      )}
    </section>
  )
}
