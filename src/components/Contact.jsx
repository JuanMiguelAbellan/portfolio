import { useTheme } from '../theme/ThemeContext'
import ContactLatente from '../themes/latente/ContactLatente'
import ContactPapel from '../themes/papel/ContactPapel'

export default function Contact() {
  const { theme } = useTheme()
  if (theme === 'papel') return <ContactPapel />
  return <ContactLatente />
}
