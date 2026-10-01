import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useAboutPanelScroll } from '../../hooks/useAboutPanelScroll'
import { useScramble } from '../../hooks/useScramble'
import { useDecodeText } from '../../hooks/useDecodeText'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './AboutAscii.css'

export default function AboutAscii() {
  const { t, lang } = useLanguage()
  const seccionRef = useRef(null)
  const panelRef = useRef(null)
  const h2Ref = useRef(null)
  const textoRef = useRef(null)
  const [segundoRef, segundoVisible] = useScrollReveal()

  useAboutPanelScroll(seccionRef, panelRef)
  useScramble(h2Ref, { modo: 'vista', duracion: 900, lang })
  useDecodeText(textoRef, t.about.body[0])

  return (
    <section id="sobre-mi" ref={seccionRef} className="aa_seccion">
      <div ref={panelRef} className="aa_panel">
        <div className="aa_grid">
          <div className="aa_col1">
            <span className="aa_marca mono">// 01</span>
            <h2 ref={h2Ref} className="aa_h2">{t.about.title}</h2>
          </div>
          <div className="aa_col2">
            <p ref={textoRef} className="aa_decodificado" />
            <p ref={segundoRef} className={`aa_segundo reveal ${segundoVisible ? 'reveal--visible' : ''}`}>
              {t.about.body[1]}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
