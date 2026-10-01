import { useEffect } from 'react'

// El titular enorme de Contacto (ASCII) se desplaza y abre tracking
// según sectionRef entra en el viewport.
export function useBigTitleScroll(sectionRef, titleRef) {
  useEffect(() => {
    const seccion = sectionRef.current
    const titulo = titleRef.current
    if (!seccion || !titulo) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      titulo.style.transform = 'none'
      titulo.style.letterSpacing = 'normal'
      return
    }

    function calcular() {
      const r = seccion.getBoundingClientRect()
      const vh = window.innerHeight
      const p = Math.min(1, Math.max(0, (vh - r.top) / vh))
      titulo.style.transform = `translateX(${(1 - p) * -30}%)`
      titulo.style.letterSpacing = `${(1 - p) * 0.3}em`
    }

    calcular()
    window.addEventListener('scroll', calcular, { passive: true })
    window.addEventListener('resize', calcular)
    return () => {
      window.removeEventListener('scroll', calcular)
      window.removeEventListener('resize', calcular)
    }
  }, [sectionRef, titleRef])
}
