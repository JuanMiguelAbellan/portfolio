import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useAsciiField } from '../../hooks/useAsciiField'
import { hackathons } from '../../data/hackathons'
import CabeceraSeccion from './CabeceraSeccion'
import './latente-shared.css'
import './HackathonsLatente.css'

function Item({ h, lang }) {
  const [ref, visible] = useScrollReveal()
  const Tag = h.links?.github ? 'a' : 'div'
  const props = h.links?.github ? { href: h.links.github, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Tag ref={ref} className={`hkl_item hl_reveal ${visible ? 'hl_reveal--visible' : ''}`} {...props}>
      <span className="hkl_titulo">{h.title}</span>
      <div className="hkl_derecha">
        <span className="hkl_desc">{h.description[lang]}</span>
        {h.links?.github && <span className="hkl_link mono">GitHub ↗</span>}
      </div>
    </Tag>
  )
}

export default function HackathonsLatente() {
  const { t, lang } = useLanguage()
  const canvasRef = useRef(null)
  useAsciiField(canvasRef, { pageHex: '#151311', accentRgb: '240,168,58', inkRgb: '239,235,227', fontFamily: '"JetBrains Mono", monospace' })

  return (
    <section id="hackathons" className="hl_seccion hkl_seccion">
      <canvas ref={canvasRef} className="hkl_canvas" aria-hidden="true" />
      <div className="hkl_capa">
        <CabeceraSeccion titulo={t.hackathons.title} />
        <div className="hkl_lista">
          {hackathons.map((h) => <Item key={h.id} h={h} lang={lang} />)}
        </div>
      </div>
    </section>
  )
}
