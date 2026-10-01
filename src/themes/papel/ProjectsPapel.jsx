import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useMaskReveal } from '../../hooks/useMaskReveal'
import { useStickyStack } from '../../hooks/useStickyStack'
import { usePointerFino } from '../../hooks/usePointerFino'
import { projects } from '../../data/projects'
import { proyectosOrdenados, derivarProyecto } from '../shared/projectView'
import ProjectModal from '../shared/ProjectModal'
import './papel-shared.css'
import './ProjectsPapel.css'

function Tarjeta({ p, i, onOpen, punteroFino }) {
  const imgRef = useRef(null)

  function tilt(e) {
    if (!punteroFino || !imgRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    imgRef.current.style.transform = `scale(1.16) translate(${-x * 4}%, ${-y * 4}%)`
    imgRef.current.style.filter = 'none'
  }

  function untilt() {
    if (!imgRef.current) return
    imgRef.current.style.transform = ''
    imgRef.current.style.filter = ''
  }

  return (
    <div className="pp_envoltorio" data-card="" style={{ top: `${80 + i * 14}px` }}>
      <article
        role="button"
        tabIndex={0}
        aria-label={p.aria}
        onClick={(e) => onOpen(p, e.currentTarget)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(p, e.currentTarget) } }}
        className="pp_tarjeta"
      >
        <div className="pp_izquierda">
          <div className="pp_fila_top">
            <span className="pp_num">{p.num}</span>
            {p.featured && <span className="pp_etiqueta">{p.featuredLabel}</span>}
          </div>
          <div className="pp_medio">
            <h3 className="pp_titulo">{p.title}</h3>
            <p className="pp_resumen">{p.summary}</p>
          </div>
          <div className="pp_fila_bottom">
            <div className="pp_tech">
              {p.techTop.map((tg) => <span key={tg} className="pp_chip">{tg}</span>)}
              {p.techMore && <span className="pp_chip pp_chip--mas">{p.techMore}</span>}
            </div>
            <span className="pp_flecha">→</span>
          </div>
        </div>
        <div className="pp_imagen" onMouseMove={tilt} onMouseLeave={untilt}>
          <img ref={imgRef} src={p.img} alt="" loading="lazy" />
        </div>
      </article>
    </div>
  )
}

export default function ProjectsPapel() {
  const { t, lang } = useLanguage()
  const [proyectoActivo, setProyectoActivo] = useState(null)
  const triggerRef = useRef(null)
  const listaRef = useRef(null)
  const tituloRef = useRef(null)
  const punteroFino = usePointerFino()

  useMaskReveal(tituloRef)
  useStickyStack(listaRef)

  const ordenados = proyectosOrdenados(projects)
  const derivados = ordenados.map((p, i) => derivarProyecto(p, i, lang, t))

  function abrir(p, nodo) {
    triggerRef.current = nodo
    setProyectoActivo(p)
  }

  return (
    <section id="proyectos" data-tono="paper" className="pp_seccion">
      <div className="pp_cabecera">
        <h2 ref={tituloRef}><span className="pp_titulo_mascara"><span>{t.projects.title}</span></span></h2>
        <span className="pp_count">02 · ({String(derivados.length).padStart(2, '0')})</span>
      </div>
      <div className="pp_lista" ref={listaRef}>
        {derivados.map((p, i) => (
          <Tarjeta key={p.id} p={p} i={i} onOpen={abrir} punteroFino={punteroFino} />
        ))}
      </div>
      {proyectoActivo && (
        <ProjectModal project={proyectoActivo} onClose={() => setProyectoActivo(null)} triggerRef={triggerRef} />
      )}
    </section>
  )
}
