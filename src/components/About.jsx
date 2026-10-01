import { useTheme } from '../theme/ThemeContext'
import AboutLatente from '../themes/latente/AboutLatente'
import AboutPapel from '../themes/papel/AboutPapel'
import AboutAscii from '../themes/ascii/AboutAscii'

export default function About() {
  const { theme } = useTheme()
  if (theme === 'papel') return <AboutPapel />
  if (theme === 'ascii') return <AboutAscii />
  return <AboutLatente />
}
