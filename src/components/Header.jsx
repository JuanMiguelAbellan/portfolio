import { useTheme } from '../theme/ThemeContext'
import HeaderLatente from '../themes/latente/HeaderLatente'
import HeaderPapel from '../themes/papel/HeaderPapel'
import HeaderAscii from '../themes/ascii/HeaderAscii'

export default function Header() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HeaderPapel />
  if (theme === 'ascii') return <HeaderAscii />
  return <HeaderLatente />
}
