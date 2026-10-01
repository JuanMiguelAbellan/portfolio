import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useMaskReveal } from '../../hooks/useMaskReveal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { hackathons } from '../../data/hackathons'
import './papel-shared.css'
import './HackathonsPapel.css'

function Item({ h, lang }) {
  const [ref, visible] = useScrollReveal()
  const Tag = h.links?.github ? 'a' : 'div'
  const props = h.links?.github ? { href: h.links.github, target: '_blank', rel: 'noreferrer' } : { tabIndex: 0 }

  return (
    <Tag ref={ref} className={`hkp_item reveal ${visible ? 'reveal--visible' : ''}`} {...props}>
      <span className="hkp_cab">
        <span className="hkp_num">03</span>
        <span className="hkp_titulo">{h.title}</span>
      </span>
      <span className="hkp_desc">
        {h.description[lang]}{' '}
        {h.links?.github && <span className="hkp_link">GitHub ↗</span>}
      </span>
    </Tag>
  )
}

export default function HackathonsPapel() {
  const { t, lang } = useLanguage()
  const tituloRef = useRef(null)
  useMaskReveal(tituloRef)

  return (
    <section id="hackathons" data-tono="ink" className="hkp_seccion">
      <h2 ref={tituloRef}><span className="pp_titulo_mascara"><span>{t.hackathons.title}</span></span></h2>
      <div className="hkp_lista">
        {hackathons.map((h) => <Item key={h.id} h={h} lang={lang} />)}
      </div>
    </section>
  )
}
