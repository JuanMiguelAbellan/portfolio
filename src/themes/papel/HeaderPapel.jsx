import { useLanguage } from '../../i18n/LanguageContext'
import './HeaderPapel.css'

export default function HeaderPapel() {
  const { t, lang, toggleLang } = useLanguage()

  return (
    <nav className="hp_nav">
      <a href="#top" className="hp_logo">JM.</a>
      <a href="#sobre-mi">{t.nav.about}</a>
      <a href="#proyectos">{t.nav.projects}</a>
      <a href="#hackathons">{t.nav.hackathons}</a>
      <a href="#skills">{t.nav.skills}</a>
      <a href="#contacto">{t.nav.contact}</a>
      <button type="button" className="hp_idioma" onClick={toggleLang} aria-label="Cambiar idioma / Switch language">
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
    </nav>
  )
}
