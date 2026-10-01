import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import './About.css'

export default function About() {
  const { t } = useLanguage()
  const [ref, visible] = useReveal()

  return (
    <section id="sobre-mi">
      <div className={`contenedor reveal ${visible ? 'reveal--visible' : ''}`} ref={ref}>
        <p className="etiqueta_seccion mono">01</p>
        <h2 className="titulo_seccion">{t.about.title}</h2>
        <div className="about_texto">
          {t.about.body.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
