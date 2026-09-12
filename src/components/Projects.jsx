import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { projects } from '../data/projects'
import ProjectsSlider from './ProjectsSlider'
import ProjectModal from './ProjectModal'
import './Projects.css'

const ordenados = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

export default function Projects() {
  const { t } = useLanguage()
  const [proyectoActivo, setProyectoActivo] = useState(null)
  const triggerRef = useRef(null)

  function abrirProyecto(project, nodoOrigen) {
    triggerRef.current = nodoOrigen
    setProyectoActivo(project)
  }

  function cerrarProyecto() {
    setProyectoActivo(null)
  }

  return (
    <section id="proyectos">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">02</p>
        <h2 className="titulo_seccion">{t.projects.title}</h2>
      </div>

      <ProjectsSlider projects={ordenados} onOpenProject={abrirProyecto} paused={!!proyectoActivo} />

      {proyectoActivo && (
        <ProjectModal project={proyectoActivo} onClose={cerrarProyecto} triggerRef={triggerRef} />
      )}
    </section>
  )
}
