import { useEffect } from 'react'

// Las palabras [data-w] de containerRef suben dentro de su máscara
// (translateY 110% -> 0) la primera vez que el contenedor entra en el
// viewport, con 18ms de retardo entre palabras (About de Papel).
export function useWordStagger(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const palabras = root.querySelectorAll('[data-w]')
    if (!palabras.length) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      palabras.forEach(w => { w.style.transform = 'none' })
      return
    }

    palabras.forEach(w => { w.style.transition = 'none'; w.style.transform = 'translateY(110%)' })

    const io = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      io.disconnect()
      void root.offsetHeight
      palabras.forEach((w, i) => {
        w.style.transition = `transform .9s cubic-bezier(.2,.9,.1,1) ${i * 18}ms`
        w.style.transform = 'none'
      })
    }, { threshold: 0.12 })
    io.observe(root)
    return () => io.disconnect()
  }, [containerRef])
}
