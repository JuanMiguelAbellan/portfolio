import { useTheme } from '../theme/ThemeContext'
import ContactLatente from '../themes/latente/ContactLatente'
import ContactPapel from '../themes/papel/ContactPapel'
import ContactAscii from '../themes/ascii/ContactAscii'

export default function Contact() {
  const { theme } = useTheme()
  if (theme === 'papel') return <ContactPapel />
  if (theme === 'ascii') return <ContactAscii />
  return <ContactLatente />
}
