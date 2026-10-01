import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useEmbeddingField } from '../../hooks/useEmbeddingField'
import { useNameStagger } from '../../hooks/useNameStagger'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './HeroLatente.css'

function Letras({ texto }) {
  return texto.split('').map((c, i) => (
    <span key={i} data-ch="" style={{ display: 'inline-block', whiteSpace: 'pre' }}>{c}</span>
  ))
}

export default function HeroLatente() {
  const { t } = useLanguage()
  const canvasRef = useRef(null)
  const nombreRef = useRef(null)
  const [filaRef, visible] = useScrollReveal(0)

  useEmbeddingField(canvasRef)
  useNameStagger(nombreRef)

  return (
    <section id="top" className="hl_hero">
      <canvas ref={canvasRef} className="hl_canvas" />
      <div className="hl_contenido">
        <p className="hl_saludo mono">
          {t.hero.greeting} <span className="hl_saludo_nota mono">— query = cursor · top_k = 7</span>
        </p>
        <h1 className="hl_nombre" ref={nombreRef}>
          <span className="hl_nombre_linea"><Letras texto="Juan Miguel" /></span>
          <span className="hl_nombre_linea hl_nombre_linea--accent"><Letras texto="Abellán" /></span>
        </h1>
        <div ref={filaRef} className={`hl_fila reveal ${visible ? 'reveal--visible' : ''}`}>
          <div className="hl_texto">
            <p className="hl_tagline">{t.hero.tagline}</p>
            <p className="hl_desc">{t.hero.description}</p>
          </div>
          <div className="hl_acciones">
            <a href="#proyectos" className="hl_cta hl_cta--primario mono">{t.hero.ctaProjects} ↓</a>
            <a href="#contacto" className="hl_cta hl_cta--secundario mono">{t.hero.ctaContact}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
