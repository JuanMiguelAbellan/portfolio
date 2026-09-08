import { useLanguage } from '../i18n/LanguageContext'
import { hackathons } from '../data/hackathons'
import { GitHubIcon } from './Icons'
import './Hackathons.css'

export default function Hackathons() {
  const { lang, t } = useLanguage()

  return (
    <section id="hackathons">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">03</p>
        <h2 className="titulo_seccion">{t.hackathons.title}</h2>
        <div className="hackathons_lista">
          {hackathons.map((h) => (
            <a key={h.id} href={h.links.github} target="_blank" rel="noreferrer" className="hackathon_item">
              <div>
                <h3 className="hackathon_titulo">{h.title}</h3>
                <p className="hackathon_desc">{h.description[lang]}</p>
              </div>
              <GitHubIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
