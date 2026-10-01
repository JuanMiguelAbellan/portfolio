import { useEffect } from 'react'
import { PAPEL_SECCIONES } from '../theme/tokens'
import { papelState } from '../themes/papel/papelState'

// El fondo de página de Papel cambia por sección (data-tono="paper" |
// "ink" | "red"): se detecta cuál cubre el centro del viewport y se
// aplica directamente sobre <body>, por encima de la variable CSS
// --page. papelState.tono queda disponible para el canvas de retícula.
export function usePapelTono() {
  useEffect(() => {
    function calcular() {
      const vh = window.innerHeight
      let actual = 'paper'
      document.querySelectorAll('[data-tono]').forEach((s) => {
        const r = s.getBoundingClientRect()
        if (r.top < vh * 0.5 && r.bottom > vh * 0.5) actual = s.getAttribute('data-tono')
      })
      if (actual !== papelState.tono) {
        papelState.tono = actual
        document.body.style.background = PAPEL_SECCIONES[actual].bg
        document.body.style.color = PAPEL_SECCIONES[actual].ink
      }
    }

    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
      document.body.style.background = ''
      document.body.style.color = ''
      papelState.tono = 'paper'
    }
  }, [])
}
