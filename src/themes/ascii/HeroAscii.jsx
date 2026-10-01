import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAsciiField } from '../../hooks/useAsciiField'
import { useScramble } from '../../hooks/useScramble'
import './HeroAscii.css'

export default function HeroAscii() {
  const { t, lang } = useLanguage()
  const canvasRef = useRef(null)
  const tituloRef = useRef(null)

  useAsciiField(canvasRef)
  useScramble(tituloRef, { modo: 'montaje', duracion: 900, lang })

  return (
    <section id="top" className="ha_hero">
      <canvas ref={canvasRef} className="ha_canvas" aria-hidden="true" />
      <div className="ha_contenido">
        <div className="ha_tags mono">
          <span className="ha_tag">{t.hero.greeting}</span>
          <span className="ha_tag ha_tag--accent">{t.hero.tagline}</span>
        </div>
        <h1 className="ha_titulo" ref={tituloRef}>
          <span>Juan Miguel</span>
          <span>Abellán</span>
        </h1>
        <div className="ha_fila">
          <p className="ha_desc">{t.hero.description}</p>
          <div className="ha_acciones">
            <a href="#proyectos" className="ha_cta ha_cta--primaria">{t.hero.ctaProjects} ↓</a>
            <a href="#contacto" className="ha_cta ha_cta--secundaria">{t.hero.ctaContact}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
