import { useTheme } from '../theme/ThemeContext'
import AboutLatente from '../themes/latente/AboutLatente'
import AboutPapel from '../themes/papel/AboutPapel'

export default function About() {
  const { theme } = useTheme()
  if (theme === 'papel') return <AboutPapel />
  return <AboutLatente />
}
