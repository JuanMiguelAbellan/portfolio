import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useCrossGrid } from '../../hooks/useCrossGrid'
import { usePapelTono } from '../../hooks/usePapelTono'
import { useNameStagger } from '../../hooks/useNameStagger'
import { useVariableWeight } from '../../hooks/useVariableWeight'
import { usePointerFino } from '../../hooks/usePointerFino'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './HeroPapel.css'

function Letras({ texto }) {
  return texto.split('').map((c, i) => (
    <span key={i} data-ch="" style={{ display: 'inline-block', whiteSpace: 'pre' }}>{c}</span>
  ))
}

export default function HeroPapel() {
  const { t } = useLanguage()
  const canvasRef = useRef(null)
  const nombreRef = useRef(null)
  const [filaRef, visible] = useScrollReveal(0)
  const punteroFino = usePointerFino()

  useCrossGrid(canvasRef)
  usePapelTono()
  useNameStagger(nombreRef, 'papel')
  useVariableWeight(nombreRef, punteroFino)

  return (
    <>
      <canvas ref={canvasRef} className="hp_canvas" />
      <section id="top" data-tono="paper" className="hp_hero">
        <div className="hp_fila_top">
          <span>{t.hero.greeting}</span>
          <span className="hp_tagline">● {t.hero.tagline}</span>
        </div>
        <h1 className="hp_nombre" ref={nombreRef}>
          <span className="hp_nombre_linea"><Letras texto="Juan" /></span>
          <span className="hp_nombre_linea hp_nombre_linea--2"><Letras texto="Miguel" /><span className="hp_punto" /></span>
          <span className="hp_nombre_linea hp_nombre_linea--3"><Letras texto="Abellán" /></span>
        </h1>
        <div ref={filaRef} className={`hp_grid reveal ${visible ? 'reveal--visible' : ''}`}>
          <p className="hp_desc">{t.hero.description}</p>
          <div className="hp_acciones">
            <a href="#proyectos" className="hp_cta hp_cta--primaria">{t.hero.ctaProjects} ↘</a>
            <a href="#contacto" className="hp_cta hp_cta--secundaria">{t.hero.ctaContact}</a>
          </div>
        </div>
      </section>
    </>
  )
}
