import { useLanguage } from '../i18n/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="footer">
      <p className="mono">{t.footer.built} · {new Date().getFullYear()}</p>
    </footer>
  )
}
