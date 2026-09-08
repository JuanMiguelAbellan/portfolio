import { useLanguage } from '../i18n/LanguageContext'
import './Header.css'

export default function Header() {
  const { t, lang, toggleLang } = useLanguage()

  return (
    <header className="cabecera">
      <div className="contenedor cabecera_interior">
        <a href="#top" className="cabecera_logo mono">JM.</a>
        <nav className="cabecera_nav">
          <a href="#sobre-mi">{t.nav.about}</a>
          <a href="#proyectos">{t.nav.projects}</a>
          <a href="#hackathons">{t.nav.hackathons}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#contacto">{t.nav.contact}</a>
        </nav>
        <button className="cabecera_idioma mono" onClick={toggleLang} aria-label="Cambiar idioma / Switch language">
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </div>
    </header>
  )
}
