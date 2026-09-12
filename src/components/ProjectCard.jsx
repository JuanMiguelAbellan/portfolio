import { useLanguage } from '../i18n/LanguageContext'
import { ChevronRightIcon } from './Icons'
import './ProjectCard.css'

const TECH_VISIBLES = 3

export default function ProjectCard({ project, onOpen, duplicado = false }) {
  const { lang, t } = useLanguage()
  const titulo = lang === 'en' && project.titleEn ? project.titleEn : project.title
  const techVisible = project.tech.slice(0, TECH_VISIBLES)
  const techRestantes = project.tech.length - techVisible.length

  return (
    <button
      type="button"
      className={`tarjeta_proyecto ${project.featured ? 'tarjeta_proyecto--destacado' : ''}`}
      onClick={(e) => onOpen(project, e.currentTarget)}
      aria-label={`${t.projects.openDetails} ${titulo}`}
      // La segunda copia de cada proyecto (necesaria para que el bucle del
      // carrusel sea indetectable, ver ProjectsSlider) es puramente visual:
      // sin esto, tabular por teclado o un lector de pantalla encontraría
      // cada proyecto dos veces.
      aria-hidden={duplicado || undefined}
      tabIndex={duplicado ? -1 : undefined}
    >
      <div className="tarjeta_proyecto_imagen">
        {project.preview && <img src={project.preview} alt="" loading="lazy" />}
        {project.featured && <span className="tarjeta_proyecto_etiqueta mono">{t.projects.featuredLabel}</span>}
      </div>

      <div className="tarjeta_proyecto_contenido">
        <h3 className="tarjeta_proyecto_titulo">{titulo}</h3>
        <p className="tarjeta_proyecto_resumen">{project.summary[lang]}</p>

        <div className="tarjeta_proyecto_tech">
          {techVisible.map((tech) => <span key={tech} className="chip">{tech}</span>)}
          {techRestantes > 0 && <span className="chip chip_mas">+{techRestantes}</span>}
        </div>
      </div>

      <ChevronRightIcon className="tarjeta_proyecto_flecha" aria-hidden="true" />
    </button>
  )
}
