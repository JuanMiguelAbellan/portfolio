import { useTheme } from '../theme/ThemeContext'
import HeroLatente from '../themes/latente/HeroLatente'
import HeroPapel from '../themes/papel/HeroPapel'
import HeroAscii from '../themes/ascii/HeroAscii'

export default function Hero() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HeroPapel />
  if (theme === 'ascii') return <HeroAscii />
  return <HeroLatente />
}
