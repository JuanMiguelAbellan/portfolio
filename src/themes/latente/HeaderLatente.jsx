import { useLanguage } from '../../i18n/LanguageContext'
import './HeaderLatente.css'

export default function HeaderLatente() {
  const { t, lang, toggleLang } = useLanguage()

  return (
    <nav className="hl_nav mono">
      <a href="#top" className="hl_nav_logo">JM.</a>
      <div className="hl_nav_enlaces">
        <a href="#sobre-mi">{t.nav.about}</a>
        <a href="#proyectos">{t.nav.projects}</a>
        <a href="#hackathons">{t.nav.hackathons}</a>
        <a href="#skills">{t.nav.skills}</a>
        <a href="#contacto">{t.nav.contact}</a>
      </div>
      <button type="button" className="hl_nav_idioma" onClick={toggleLang} aria-label="Cambiar idioma / Switch language">
        {lang === 'es' ? 'ES / en' : 'es / EN'}
      </button>
    </nav>
  )
}
