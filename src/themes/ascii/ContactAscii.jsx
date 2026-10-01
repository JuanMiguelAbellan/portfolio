import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useBigTitleScroll } from '../../hooks/useBigTitleScroll'
import { useScramble } from '../../hooks/useScramble'
import './ContactAscii.css'

const CORREO_USUARIO = 'wextren'
const CORREO_DOMINIO = 'gmail.com'

export default function ContactAscii() {
  const { t, lang } = useLanguage()
  const seccionRef = useRef(null)
  const tituloRef = useRef(null)

  useBigTitleScroll(seccionRef, tituloRef)
  useScramble(tituloRef, { modo: 'vista', duracion: 650, lang })

  function abrirEmail() {
    window.location.href = `mailto:${CORREO_USUARIO}@${CORREO_DOMINIO}`
  }

  return (
    <section id="contacto" ref={seccionRef} className="ca_seccion">
      <span className="ca_etiqueta mono">// 05 — {t.nav.contact}</span>
      <h2 ref={tituloRef} className="ca_titulo">{t.contact.title}</h2>
      <div className="ca_fila">
        <p className="ca_texto">{t.contact.body}</p>
        <div className="ca_botones">
          <button type="button" className="ca_boton ca_boton--relleno" onClick={abrirEmail}>
            {t.contact.email}
          </button>
          <a href="https://github.com/JuanMiguelAbellan" target="_blank" rel="noreferrer" className="ca_boton ca_boton--borde">
            GitHub ↗
          </a>
          <a href="https://www.linkedin.com/in/juan-miguel-abell%C3%A1n-piedrafita-b26a74425/" target="_blank" rel="noreferrer" className="ca_boton ca_boton--borde">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  )
}
