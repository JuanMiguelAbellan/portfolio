import { useLanguage } from '../i18n/LanguageContext'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'
import './Contact.css'

const CORREO_USUARIO = 'wextren'
const CORREO_DOMINIO = 'gmail.com'

export default function Contact() {
  const { t } = useLanguage()

  function abrirEmail() {
    window.location.href = `mailto:${CORREO_USUARIO}@${CORREO_DOMINIO}`
  }

  return (
    <section id="contacto">
      <div className="contenedor contacto_interior">
        <p className="etiqueta_seccion mono">05</p>
        <h2 className="titulo_seccion">{t.contact.title}</h2>
        <p className="contacto_texto">{t.contact.body}</p>
        <div className="contacto_acciones">
          <button className="boton boton_primario" onClick={abrirEmail}>
            <MailIcon /> {t.contact.email}
          </button>
          <a href="https://github.com/JuanMiguelAbellan" target="_blank" rel="noreferrer" className="boton boton_secundario">
            <GitHubIcon /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/juan-miguel-abell%C3%A1n-piedrafita-b26a74425/" target="_blank" rel="noreferrer" className="boton boton_secundario">
            <LinkedInIcon /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
