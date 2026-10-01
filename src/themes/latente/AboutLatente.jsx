import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useWordLight } from '../../hooks/useWordLight'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import CabeceraSeccion from './CabeceraSeccion'
import './latente-shared.css'
import './AboutLatente.css'

export default function AboutLatente() {
  const { t } = useLanguage()
  const parrafoRef = useRef(null)
  const [segundoRef, segundoVisible] = useScrollReveal()
  const palabras = t.about.body[0].split(' ')

  useWordLight(parrafoRef)

  return (
    <section id="sobre-mi" className="hl_seccion">
      <CabeceraSeccion numero="01" titulo={t.about.title} />
      <p ref={parrafoRef} className="al_parrafo">
        {palabras.map((w, i) => <span key={i} data-w="">{w} </span>)}
      </p>
      <p ref={segundoRef} className={`al_segundo hl_reveal ${segundoVisible ? 'hl_reveal--visible' : ''}`}>
        {t.about.body[1]}
      </p>
    </section>
  )
}
