import { useEffect } from 'react'

// El panel lima de "Sobre mí" (ASCII) crece desde escala 0.86 y pierde
// el border-radius según sectionRef entra en el viewport.
export function useAboutPanelScroll(sectionRef, panelRef) {
  useEffect(() => {
    const seccion = sectionRef.current
    const panel = panelRef.current
    if (!seccion || !panel) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      panel.style.transform = 'none'
      panel.style.borderRadius = '0px'
      return
    }

    function calcular() {
      const r = seccion.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.8)))
      const e = 1 - Math.pow(1 - p, 3)
      panel.style.transform = `scale(${0.86 + 0.14 * e}) translateY(${(1 - e) * 80}px)`
      panel.style.borderRadius = `${(1 - e) * 48}px`
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
