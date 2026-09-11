import { useLanguage } from '../i18n/LanguageContext'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import './Projects.css'

const ordenados = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

export default function Projects() {
  const { t } = useLanguage()

  return (
    <section id="proyectos">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">02</p>
        <h2 className="titulo_seccion">{t.projects.title}</h2>
        <div className="proyectos_grid">
          {ordenados.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      </div>
    </section>
  )
}
