import { useEffect } from 'react'

// Revela panelRef con un circle() que crece desde abajo según el scroll
// de sectionRef entra en el viewport (Contacto, variante 'latente').
export function useCircleReveal(sectionRef, panelRef) {
  useEffect(() => {
    const seccion = sectionRef.current
    const panel = panelRef.current
    if (!seccion || !panel) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      panel.style.clipPath = 'none'
      return
    }

    panel.style.clipPath = 'circle(0% at 50% 100%)'

    function calcular() {
      const r = seccion.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.85)))
      panel.style.clipPath = p >= 1 ? 'none' : `circle(${(1 - Math.pow(1 - p, 3)) * 150}% at 50% 100%)`
    }

    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [sectionRef, panelRef])
}
