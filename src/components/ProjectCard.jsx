import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon, ExternalLinkIcon } from './Icons'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const { lang, t } = useLanguage()
  const titulo = lang === 'en' && project.titleEn ? project.titleEn : project.title

  return (
    <article className={`tarjeta_proyecto ${project.featured ? 'tarjeta_proyecto--destacado' : ''}`}>
      {project.featured && <p className="tarjeta_proyecto_etiqueta mono">{t.projects.featuredLabel}</p>}
      <h3 className="tarjeta_proyecto_titulo">{titulo}</h3>
      <p className="tarjeta_proyecto_desc">{project.description[lang]}</p>

      {project.highlights && (
        <ul className="tarjeta_proyecto_highlights">
          {project.highlights[lang].map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}

      <div className="tarjeta_proyecto_tech">
        {project.tech.map((tech) => <span key={tech} className="chip">{tech}</span>)}
      </div>

      <div className="tarjeta_proyecto_links">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className="boton boton_primario">
            {t.projects.demo} <ExternalLinkIcon />
          </a>
        )}
        <a href={project.links.github} target="_blank" rel="noreferrer" className="boton boton_secundario">
          <GitHubIcon /> {t.projects.code}
        </a>
      </div>
    </article>
  )
}
