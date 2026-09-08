import { useLanguage } from '../i18n/LanguageContext'
import { skillGroups } from '../data/skills'
import './Skills.css'

export default function Skills() {
  const { lang, t } = useLanguage()

  return (
    <section id="skills">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">04</p>
        <h2 className="titulo_seccion">{t.skills.title}</h2>
        <div className="skills_grid">
          {skillGroups.map((grupo) => (
            <div key={grupo.category.en} className="skills_grupo">
              <h3 className="skills_categoria mono">{grupo.category[lang]}</h3>
              <div className="skills_chips">
                {grupo.items.map((item) => <span key={item} className="chip">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
