import { useEffect } from 'react'

// Opacidad de cada palabra de [data-w] (dentro de containerRef) según el
// scroll: de 0.16 a 1, con una "ventana" de 4 palabras en el color de
// acento mientras se iluminan (variante 'latente' del prototipo).
export function useWordLight(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const palabras = root.querySelectorAll('[data-w]')
    if (!palabras.length) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      palabras.forEach(w => { w.style.opacity = 1 })
      return
    }

    function calcular() {
      const r = root.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.25)))
      const lit = p * (palabras.length + 4)
      palabras.forEach((w, i) => {
        const valor = lit - i
        w.style.opacity = Math.min(1, Math.max(0.16, valor))
        w.style.color = valor > 0 && valor < 4 ? 'var(--accent)' : ''
      })
    }

    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [containerRef])
}
