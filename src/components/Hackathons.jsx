import { useTheme } from '../theme/ThemeContext'
import HackathonsLatente from '../themes/latente/HackathonsLatente'
import HackathonsPapel from '../themes/papel/HackathonsPapel'
import HackathonsAscii from '../themes/ascii/HackathonsAscii'

export default function Hackathons() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HackathonsPapel />
  if (theme === 'ascii') return <HackathonsAscii />
  return <HackathonsLatente />
}
