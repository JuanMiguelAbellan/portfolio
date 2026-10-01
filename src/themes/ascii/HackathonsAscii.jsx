import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useScramble } from '../../hooks/useScramble'
import { hackathons } from '../../data/hackathons'
import './HackathonsAscii.css'

function Item({ h, lang }) {
  const [ref, visible] = useScrollReveal()
  const Tag = h.links?.github ? 'a' : 'div'
  const props = h.links?.github ? { href: h.links.github, target: '_blank', rel: 'noreferrer' } : { tabIndex: 0 }

  return (
    <Tag ref={ref} className={`hka_item reveal ${visible ? 'reveal--visible' : ''}`} {...props}>
      <span className="hka_titulo">{h.title}</span>
      <span className="hka_desc">{h.description[lang]}</span>
      {h.links?.github && <span className="hka_link mono">GitHub ↗</span>}
    </Tag>
  )
}

export default function HackathonsAscii() {
  const { t, lang } = useLanguage()
  const tituloRef = useRef(null)
  useScramble(tituloRef, { modo: 'vista', duracion: 900, lang })

  return (
    <section id="hackathons" className="hka_seccion">
      <div className="hka_cabecera">
        <h2 ref={tituloRef}>{t.hackathons.title}</h2>
        <span className="hka_count mono">// 03</span>
      </div>
      <div className="hka_lista">
        {hackathons.map((h) => <Item key={h.id} h={h} lang={lang} />)}
      </div>
    </section>
  )
}
