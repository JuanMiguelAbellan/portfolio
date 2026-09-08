import { useLanguage } from '../i18n/LanguageContext'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Projects.css'

export default function Projects() {
  const { t } = useLanguage()
  const destacados = projects.filter((p) => p.featured)
  const otros = projects.filter((p) => !p.featured)

  return (
    <section id="proyectos">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">02</p>
        <h2 className="titulo_seccion">{t.projects.title}</h2>
        <div className="proyectos_lista">
          {destacados.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
        {otros.length > 0 && (
          <div className="proyectos_grid">
            {otros.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
