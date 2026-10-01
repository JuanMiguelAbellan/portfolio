import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useWordStagger } from '../../hooks/useWordStagger'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './AboutPapel.css'

export default function AboutPapel() {
  const { t } = useLanguage()
  const parrafoRef = useRef(null)
  const [segundoRef, segundoVisible] = useScrollReveal()
  const palabras = t.about.body[0].split(' ')

  useWordStagger(parrafoRef)

  return (
    <section id="sobre-mi" data-tono="paper" className="ap_seccion">
      <div className="ap_grid">
        <div className="ap_etiqueta">01 — {t.about.title}</div>
        <div className="ap_columna">
          <p ref={parrafoRef} className="ap_parrafo">
            {palabras.map((w, i) => (
              <span key={i} className="ap_mascara"><span data-w="">{w}&nbsp;</span></span>
            ))}
          </p>
          <p ref={segundoRef} className={`ap_segundo reveal ${segundoVisible ? 'reveal--visible' : ''}`}>
            {t.about.body[1]}
          </p>
        </div>
      </div>
    </section>
  )
}
