import { useTheme } from '../theme/ThemeContext'
import ProjectsLatente from '../themes/latente/ProjectsLatente'
import ProjectsPapel from '../themes/papel/ProjectsPapel'
import ProjectsAscii from '../themes/ascii/ProjectsAscii'

export default function Projects() {
  const { theme } = useTheme()
  if (theme === 'papel') return <ProjectsPapel />
  if (theme === 'ascii') return <ProjectsAscii />
  return <ProjectsLatente />
}
