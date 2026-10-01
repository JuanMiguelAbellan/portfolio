import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useMaskReveal } from '../../hooks/useMaskReveal'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { skillGroups } from '../../data/skills'
import './papel-shared.css'
import './SkillsPapel.css'

function Grupo({ g, lang }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`sp_grupo reveal ${visible ? 'reveal--visible' : ''}`}>
      <h3 className="sp_cat">{g.category[lang]}</h3>
      <p className="sp_items">{g.items.join(', ')}</p>
    </div>
  )
}

export default function SkillsPapel() {
  const { t, lang } = useLanguage()
  const tituloRef = useRef(null)
  useMaskReveal(tituloRef)

  return (
    <section id="skills" data-tono="ink" className="sp_seccion">
      <h2 ref={tituloRef}><span className="pp_titulo_mascara"><span>{t.skills.title}</span></span></h2>
      <div className="sp_lista">
        {skillGroups.map((g) => <Grupo key={g.category.en} g={g} lang={lang} />)}
      </div>
    </section>
  )
}
