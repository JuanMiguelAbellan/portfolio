import { useEffect } from 'react'

// Cada tarjeta [data-card] de listRef se encoge y oscurece según la
// siguiente se le echa encima al hacer scroll (Proyectos de Papel).
export function useStickyStack(listRef) {
  useEffect(() => {
    const root = listRef.current
    if (!root) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    function calcular() {
      const cards = root.querySelectorAll('[data-card]')
      cards.forEach((c, i) => {
        const inner = c.firstElementChild
        const next = cards[i + 1]
        if (!inner) return
        if (!next) { inner.style.transform = ''; inner.style.filter = ''; return }
        const p = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - c.getBoundingClientRect().top) / c.offsetHeight))
        inner.style.transform = `scale(${1 - p * 0.08})`
        inner.style.filter = `brightness(${1 - p * 0.25})`
      })
    }

    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [listRef])
}
