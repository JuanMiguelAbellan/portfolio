import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useWordStagger } from '../../hooks/useWordStagger'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './AboutLatente.css'

export default function AboutLatente() {
  const { t } = useLanguage()
  const parrafoRef = useRef(null)
  const [segundoRef, segundoVisible] = useScrollReveal()
  const palabras = t.about.body[0].split(' ')

  useWordStagger(parrafoRef)

  return (
    <section id="sobre-mi" className="al_seccion">
      <div className="al_grid">
        <div className="al_etiqueta mono">{t.about.title}</div>
        <div className="al_columna">
          <p ref={parrafoRef} className="al_parrafo">
            {palabras.map((w, i) => (
              <span key={i} className="al_mascara"><span data-w="">{w}&nbsp;</span></span>
            ))}
          </p>
          <p ref={segundoRef} className={`al_segundo reveal ${segundoVisible ? 'reveal--visible' : ''}`}>
            {t.about.body[1]}
          </p>
        </div>
      </div>
    </section>
  )
}
