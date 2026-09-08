import { useLanguage } from '../i18n/LanguageContext'
import './Hero.css'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="hero">
      <div className="contenedor hero_interior">
        <p className="hero_saludo mono">{t.hero.greeting}</p>
        <h1 className="hero_nombre">{t.hero.name}</h1>
        <p className="hero_tagline">{t.hero.tagline}</p>
        <p className="hero_descripcion">{t.hero.description}</p>
        <div className="hero_acciones">
          <a href="#proyectos" className="boton boton_primario">{t.hero.ctaProjects}</a>
          <a href="#contacto" className="boton boton_secundario">{t.hero.ctaContact}</a>
        </div>
      </div>
    </section>
  )
}
