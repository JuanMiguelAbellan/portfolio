import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { GitHubIcon, ExternalLinkIcon, CloseIcon } from '../../components/Icons'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose, triggerRef }) {
  const { lang, t } = useLanguage()
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  useEffect(() => {
    closeButtonRef.current?.focus()
    const nodoOrigen = triggerRef?.current
    return () => { nodoOrigen?.focus() }
  }, [triggerRef])

  useEffect(() => {
    function onKeyDown(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  if (!project) return null
  const titulo = lang === 'en' && project.titleEn ? project.titleEn : project.title

  return (
    <div className="mdl_fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="mdl_panel" role="dialog" aria-modal="true" aria-labelledby="mdl_titulo">
        <button type="button" className="mdl_cerrar" onClick={onClose} ref={closeButtonRef} aria-label={t.projects.close}>
          <CloseIcon />
        </button>
        {project.preview && (
          <div className="mdl_imagen"><img src={project.preview} alt="" /></div>
        )}
        <div className="mdl_contenido">
          {project.featured && <span className="mdl_etiqueta mono">{t.projects.featuredLabel}</span>}
          <h3 id="mdl_titulo" className="mdl_titulo">{titulo}</h3>
          <p className="mdl_desc">{project.description[lang]}</p>
          {project.highlights && (
            <ul className="mdl_highlights">
              {project.highlights[lang].map((h, i) => (
                <li key={i}><span className="mono">→</span><span>{h}</span></li>
              ))}
            </ul>
          )}
          <div className="mdl_tech">
            {project.tech.map((tech) => <span key={tech} className="mdl_chip mono">{tech}</span>)}
          </div>
          <div className="mdl_links">
            {project.links.demo && (
              <a href={project.links.demo} target="_blank" rel="noreferrer" className="mdl_boton mdl_boton--primario mono">
                {t.projects.demo} <ExternalLinkIcon />
              </a>
            )}
            {project.links.github ? (
              <a href={project.links.github} target="_blank" rel="noreferrer" className="mdl_boton mdl_boton--secundario mono">
                <GitHubIcon /> {t.projects.code}
              </a>
            ) : project.repoPending ? (
              <span className="mdl_boton mdl_boton--pendiente mono" aria-disabled="true">
                {t.projects.comingSoon}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
