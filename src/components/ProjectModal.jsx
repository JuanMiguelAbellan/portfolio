import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon, ExternalLinkIcon, CloseIcon } from './Icons'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const { lang, t } = useLanguage()
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  // Bloquea el scroll del fondo mientras el modal está abierto, y lo
  // restaura al cerrar (incluido un desmontaje inesperado).
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  // Foco al abrir (en el botón de cerrar) y devuelto a la tarjeta que
  // abrió el modal al cerrarlo — sin esto, un usuario de teclado pierde
  // su posición en la página cada vez que abre/cierra un proyecto.
  useEffect(() => {
    closeButtonRef.current?.focus()
    const nodoOrigen = triggerRef?.current
    return () => {
      nodoOrigen?.focus()
    }
  }, [triggerRef])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!project) return null

  const titulo = lang === 'en' && project.titleEn ? project.titleEn : project.title

  return (
    <div className="modal_fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div
        className="modal_proyecto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal_proyecto_titulo"
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal_proyecto_cerrar"
          onClick={onClose}
          ref={closeButtonRef}
          aria-label={t.projects.close}
        >
          <CloseIcon />
        </button>

        {project.preview && (
          <div className="modal_proyecto_imagen">
            <img src={project.preview} alt="" />
          </div>
        )}

        <div className="modal_proyecto_contenido">
          {project.featured && <p className="modal_proyecto_etiqueta mono">{t.projects.featuredLabel}</p>}
          <h3 id="modal_proyecto_titulo" className="modal_proyecto_titulo">{titulo}</h3>
          <p className="modal_proyecto_desc">{project.description[lang]}</p>

          {project.highlights && (
            <ul className="modal_proyecto_highlights">
              {project.highlights[lang].map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          )}

          <div className="modal_proyecto_tech">
            {project.tech.map((tech) => <span key={tech} className="chip">{tech}</span>)}
          </div>

          <div className="modal_proyecto_links">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="boton boton_primario">
                {t.projects.demo} <ExternalLinkIcon />
              </a>
            )}
            <a href={project.links.github} target="_blank" rel="noreferrer" className="boton boton_secundario">
              <GitHubIcon /> {t.projects.code}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
