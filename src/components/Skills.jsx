import { useTheme } from '../theme/ThemeContext'
import SkillsLatente from '../themes/latente/SkillsLatente'
import SkillsPapel from '../themes/papel/SkillsPapel'
import SkillsAscii from '../themes/ascii/SkillsAscii'

export default function Skills() {
  const { theme } = useTheme()
  if (theme === 'papel') return <SkillsPapel />
  if (theme === 'ascii') return <SkillsAscii />
  return <SkillsLatente />
}
