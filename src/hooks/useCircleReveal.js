import { useEffect } from 'react'

// Revela panelRef con un circle() que crece desde abajo según sectionRef
// entra en el viewport (Contacto, variante 'latente'). El progreso real
// persigue al objetivo con inercia (rAF + lerp) en vez de aplicarlo tal
// cual en cada evento de scroll — si no, un scroll rápido abría el
// círculo de golpe.
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

    const RETRASO = 0.35 // fracción de vh que hay que subir antes de que empiece
    const RECORRIDO = 1.3 // en vh: cuanto mayor, más lento se abre
    let actual = 0
    let raf

    function objetivo() {
      const r = seccion.getBoundingClientRect()
      const vh = window.innerHeight
      return Math.min(1, Math.max(0, (vh * (1 - RETRASO) - r.top) / (vh * RECORRIDO)))
    }

    function tick() {
      if (!document.hidden) {
        const destino = objetivo()
        actual += (destino - actual) * 0.08
        if (Math.abs(destino - actual) < 0.001) actual = destino
        panel.style.clipPath = actual >= 0.999 ? 'none' : `circle(${(1 - Math.pow(1 - actual, 3)) * 150}% at 50% 100%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [sectionRef, panelRef])
}
