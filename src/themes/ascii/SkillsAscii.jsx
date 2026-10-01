import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useScramble } from '../../hooks/useScramble'
import { skillGroups } from '../../data/skills'
import './SkillsAscii.css'

function Grupo({ g, lang }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`ska_grupo reveal ${visible ? 'reveal--visible' : ''}`}>
      <h3 className="ska_cat mono">&gt; {g.category[lang]}</h3>
      <div className="ska_chips">
        {g.items.map((it) => <span key={it} className="ska_chip mono">{it}</span>)}
      </div>
    </div>
  )
}

export default function SkillsAscii() {
  const { t, lang } = useLanguage()
  const tituloRef = useRef(null)
  useScramble(tituloRef, { modo: 'vista', duracion: 900, lang })

  return (
    <section id="skills" className="ska_seccion">
      <div className="ska_cabecera">
        <h2 ref={tituloRef}>{t.skills.title}</h2>
        <span className="ska_count mono">// 04</span>
      </div>
      <div className="ska_grid">
        {skillGroups.map((g) => <Grupo key={g.category.en} g={g} lang={lang} />)}
      </div>
    </section>
  )
}
