import { useEffect, useRef, useState } from 'react'

// Anima la entrada de un elemento cuando aparece en el viewport. Se
// desactiva (visible desde el primer render) si el sistema pide menos
// movimiento, igual que el carrusel de proyectos.
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return

    const nodo = ref.current
    if (!nodo) return

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          observador.unobserve(nodo)
        }
      },
      { threshold },
    )
    observador.observe(nodo)
    return () => observador.disconnect()
  }, [threshold, prefersReducedMotion])

  return [ref, visible]
}
