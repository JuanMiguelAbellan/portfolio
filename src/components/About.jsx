import { useLanguage } from '../i18n/LanguageContext'
import './About.css'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="sobre-mi">
      <div className="contenedor">
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
