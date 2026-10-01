import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import './ContactPapel.css'

const CORREO_USUARIO = 'wextren'
const CORREO_DOMINIO = 'gmail.com'

export default function ContactPapel() {
  const { t } = useLanguage()
  const marqueeRef = useRef(null)
  const estado = useRef({ vel: 0, lastY: window.scrollY, mqX: 0 })

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    function onScroll() {
      const y = window.scrollY
      estado.current.vel += (y - estado.current.lastY) * 0.4
      estado.current.lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf
    function tick() {
      const s = estado.current
      s.vel *= 0.92
      const m = marqueeRef.current
      if (m && !document.hidden) {
        const primero = m.querySelector('[data-mq]')
        const w = primero ? primero.offsetWidth : 1000
        s.mqX -= 1.2 + Math.abs(s.vel) * 0.25
        if (s.mqX < -w) s.mqX += w
        const skew = Math.max(-12, Math.min(12, -s.vel * 0.3))
        m.style.transform = `translate3d(${s.mqX}px,0,0) skewX(${skew}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  function abrirEmail() {
    window.location.href = `mailto:${CORREO_USUARIO}@${CORREO_DOMINIO}`
  }

  return (
    <section id="contacto" data-tono="red" className="ctp_seccion">
      <div className="ctp_marquee" ref={marqueeRef}>
        <span data-mq="" className="ctp_marquee_grupo">
          <span>{t.contact.title}</span><span className="ctp_asterisco">*</span>
          <span>{t.contact.title}</span><span className="ctp_asterisco">*</span>
        </span>
        <span className="ctp_marquee_grupo">
          <span>{t.contact.title}</span><span className="ctp_asterisco">*</span>
          <span>{t.contact.title}</span><span className="ctp_asterisco">*</span>
        </span>
      </div>
      <div className="ctp_cuerpo">
        <p className="ctp_texto">{t.contact.body}</p>
        <div className="ctp_acciones">
          <button type="button" className="ctp_email_grande" onClick={abrirEmail}>
            {t.contact.email}
          </button>
          <div className="ctp_botones">
            <button type="button" className="ctp_boton ctp_boton--relleno" onClick={abrirEmail}>
              {t.contact.email}
            </button>
            <a href="https://github.com/JuanMiguelAbellan" target="_blank" rel="noreferrer" className="ctp_boton ctp_boton--borde">
              GitHub ↗
            </a>
            <a href="https://www.linkedin.com/in/juan-miguel-abell%C3%A1n-piedrafita-b26a74425/" target="_blank" rel="noreferrer" className="ctp_boton ctp_boton--borde">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
      <footer className="ctp_footer">{t.footer.built} · {new Date().getFullYear()}</footer>
    </section>
  )
}
