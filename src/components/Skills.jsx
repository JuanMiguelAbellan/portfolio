import { useTheme } from '../theme/ThemeContext'
import SkillsLatente from '../themes/latente/SkillsLatente'
import SkillsPapel from '../themes/papel/SkillsPapel'

export default function Skills() {
  const { theme } = useTheme()
  if (theme === 'papel') return <SkillsPapel />
  return <SkillsLatente />
}
