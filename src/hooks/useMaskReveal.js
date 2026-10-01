import { useEffect } from 'react'

// Revela el primer hijo de ref (envuelto overflow:hidden) subiendo desde
// translateY(105%) la primera vez que entra en el viewport. Para los
// títulos "enmascarados" de Papel (Proyectos/Hackathons/Skills).
export function useMaskReveal(ref) {
  useEffect(() => {
    const el = ref.current
    const inner = el?.firstElementChild
    if (!el || !inner) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      inner.style.transform = 'none'
      return
    }

    inner.style.transition = 'none'
    inner.style.transform = 'translateY(105%)'

    const io = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      io.disconnect()
      void el.offsetHeight
      inner.style.transition = 'transform 1.1s cubic-bezier(.2,.9,.1,1)'
      inner.style.transform = 'none'
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
