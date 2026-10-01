import { useTheme } from '../theme/ThemeContext'
import HeroLatente from '../themes/latente/HeroLatente'
import HeroPapel from '../themes/papel/HeroPapel'

export default function Hero() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HeroPapel />
  return <HeroLatente />
}
