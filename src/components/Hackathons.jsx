import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { hackathons } from '../data/hackathons'
import { GitHubIcon } from './Icons'
import './Hackathons.css'

function HackathonItem({ h, lang, t, retraso }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`hackathon_item reveal ${visible ? 'reveal--visible' : ''}`}
      style={{ transitionDelay: visible ? `${retraso}ms` : '0ms' }}
    >
      <div className="hackathon_cabecera">
        <h3 className="hackathon_titulo">{h.title}</h3>
        {h.event && <span className="hackathon_evento mono">{h.event[lang]}</span>}
      </div>

      <p className="hackathon_desc">{h.description[lang]}</p>

      {h.highlights && (
        <ul className="hackathon_highlights">
          {h.highlights[lang].map((hl, i) => <li key={i}>{hl}</li>)}
        </ul>
      )}

      <div className="hackathon_tech">
        {h.tech.map((tech) => <span key={tech} className="chip">{tech}</span>)}
      </div>

      {h.links?.github && (
        <a href={h.links.github} target="_blank" rel="noreferrer" className="boton boton_secundario">
          <GitHubIcon /> {t.projects.code}
        </a>
      )}
    </article>
  )
}

export default function Hackathons() {
  const { lang, t } = useLanguage()

  return (
    <section id="hackathons">
      <div className="contenedor">
        <p className="etiqueta_seccion mono">03</p>
        <h2 className="titulo_seccion">{t.hackathons.title}</h2>
        <div className="hackathons_lista">
          {hackathons.map((h, i) => (
            <HackathonItem key={h.id} h={h} lang={lang} t={t} retraso={Math.min(i, 4) * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}
