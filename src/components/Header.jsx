import { useTheme } from '../theme/ThemeContext'
import HeaderLatente from '../themes/latente/HeaderLatente'
import HeaderPapel from '../themes/papel/HeaderPapel'

export default function Header() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HeaderPapel />
  return <HeaderLatente />
}
