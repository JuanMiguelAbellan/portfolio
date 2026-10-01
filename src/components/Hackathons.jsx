import { useTheme } from '../theme/ThemeContext'
import HackathonsLatente from '../themes/latente/HackathonsLatente'
import HackathonsPapel from '../themes/papel/HackathonsPapel'

export default function Hackathons() {
  const { theme } = useTheme()
  if (theme === 'papel') return <HackathonsPapel />
  return <HackathonsLatente />
}
