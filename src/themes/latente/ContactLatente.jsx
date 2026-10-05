import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import { useCircleReveal } from '../../hooks/useCircleReveal'
import { useCrossGrid } from '../../hooks/useCrossGrid'
import './ContactLatente.css'

const CORREO_USUARIO = 'wextren'
const CORREO_DOMINIO = 'gmail.com'
const LINEA_RGB = [58, 54, 47]
const colorReposoLatente = () => LINEA_RGB

export default function ContactLatente() {
  const { t } = useLanguage()
  const seccionRef = useRef(null)
  const panelRef = useRef(null)
  const canvasRef = useRef(null)

  useCircleReveal(seccionRef, panelRef)
  useCrossGrid(canvasRef, { accentRgb: '240,168,58', colorReposo: colorReposoLatente })

  function abrirEmail() {
    window.location.href = `mailto:${CORREO_USUARIO}@${CORREO_DOMINIO}`
  }

  return (
    <section id="contacto" ref={seccionRef} className="ctl_seccion">
      <div ref={panelRef} className="ctl_panel">
        <canvas ref={canvasRef} className="ctl_canvas" aria-hidden="true" />
        <div className="ctl_capa">
          <span className="mono">{t.nav.contact}</span>
          <div className="ctl_medio">
            <h2 className="ctl_titulo">{t.contact.title}</h2>
            <div className="ctl_fila">
              <p className="ctl_body">{t.contact.body}</p>
              <div className="ctl_acciones">
                <button type="button" className="ctl_boton ctl_boton--email mono" onClick={abrirEmail}>
                  {t.contact.email} →
                </button>
                <a href="https://github.com/JuanMiguelAbellan" target="_blank" rel="noreferrer" className="ctl_boton ctl_boton--borde mono">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/juan-miguel-abell%C3%A1n-piedrafita-b26a74425/" target="_blank" rel="noreferrer" className="ctl_boton ctl_boton--borde mono">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
