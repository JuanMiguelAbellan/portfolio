import { useLanguage } from '../../i18n/LanguageContext'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { skillGroups } from '../../data/skills'
import CabeceraSeccion from './CabeceraSeccion'
import './latente-shared.css'
import './SkillsLatente.css'

function Grupo({ g, lang }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`skl_grupo hl_reveal ${visible ? 'hl_reveal--visible' : ''}`}>
      <h3 className="skl_cat mono">{g.category[lang]}</h3>
      <div className="skl_chips">
        {g.items.map((it) => <span key={it} className="skl_chip mono">{it}</span>)}
      </div>
    </div>
  )
}

export default function SkillsLatente() {
  const { t, lang } = useLanguage()

  return (
    <section id="skills" className="hl_seccion skl_seccion">
      <CabeceraSeccion titulo={t.skills.title} />
      <div className="skl_grid">
        {skillGroups.map((g) => <Grupo key={g.category.en} g={g} lang={lang} />)}
      </div>
    </section>
  )
}
