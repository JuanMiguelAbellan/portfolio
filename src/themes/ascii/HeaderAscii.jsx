import { useLanguage } from '../../i18n/LanguageContext'
import './HeaderAscii.css'

export default function HeaderAscii() {
  const { t, lang, toggleLang } = useLanguage()

  return (
    <nav className="ha_nav mono">
      <a href="#top" className="ha_logo">[JM.]</a>
      <div className="ha_enlaces">
        <a href="#sobre-mi">{t.nav.about}</a>
        <a href="#proyectos">{t.nav.projects}</a>
        <a href="#hackathons">{t.nav.hackathons}</a>
        <a href="#skills">{t.nav.skills}</a>
        <a href="#contacto">{t.nav.contact}</a>
        <button type="button" className="ha_idioma" onClick={toggleLang} aria-label="Cambiar idioma / Switch language">
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  )
}
