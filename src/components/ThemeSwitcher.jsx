import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import { TK, THEME_ORDER, THEME_LABELS } from '../theme/tokens'
import './ThemeSwitcher.css'

export default function ThemeSwitcher() {
  const { lang, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const curtainRef = useRef(null)
  const switchingRef = useRef(false)

  function cambiarTema(next, e) {
    if (next === theme || switchingRef.current) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setTheme(next)
      window.scrollTo({ top: 0 })
      return
    }

    switchingRef.current = true
    const c = curtainRef.current
    const x = e ? e.clientX : window.innerWidth / 2
    const y = e ? e.clientY : window.innerHeight

    c.style.background = TK[next].page
    c.style.transition = 'none'
    c.style.clipPath = `circle(0% at ${x}px ${y}px)`
    void c.offsetHeight // fuerza el reflow para que el cambio de clip-path anterior no se funda con este
    c.style.transition = 'clip-path .7s cubic-bezier(.7,0,.2,1)'
    c.style.clipPath = `circle(150% at ${x}px ${y}px)`

    setTimeout(() => {
      setTheme(next)
      window.scrollTo({ top: 0, behavior: 'instant' })
      requestAnimationFrame(() => {
        c.style.transition = 'clip-path .7s cubic-bezier(.7,0,.2,1)'
        c.style.clipPath = 'circle(0% at 50% 0%)'
        setTimeout(() => { switchingRef.current = false }, 700)
      })
    }, 720)
  }

  return (
    <>
      <div ref={curtainRef} className="cortina" />
      <div role="radiogroup" aria-label={t.theme.switcherLabel} className="selector_tema">
        {THEME_ORDER.map((id) => {
          const activo = theme === id
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={activo}
              onClick={(e) => cambiarTema(id, e)}
              className={`selector_tema_btn ${activo ? 'selector_tema_btn--activo' : ''}`}
            >
              <span className="selector_tema_punto" style={{ background: TK[id].accent, boxShadow: `0 0 0 1px ${TK[id].page}` }} />
              {THEME_LABELS[id][lang]}
            </button>
          )
        })}
      </div>
    </>
  )
}
