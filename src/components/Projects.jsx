import { useTheme } from '../theme/ThemeContext'
import ProjectsLatente from '../themes/latente/ProjectsLatente'
import ProjectsPapel from '../themes/papel/ProjectsPapel'

export default function Projects() {
  const { theme } = useTheme()
  if (theme === 'papel') return <ProjectsPapel />
  return <ProjectsLatente />
}
