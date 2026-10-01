import { useEffect } from 'react'

// Revela las letras de [data-ch] dentro de containerRef una a una,
// translateY(110%) -> 0, con 45ms de retardo entre letras (variante
// 'latente' del prototipo).
export function useNameStagger(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const letras = root.querySelectorAll('[data-ch]')
    if (!letras.length) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      letras.forEach(c => { c.style.transform = 'none'; c.style.opacity = 1 })
      return
    }

    letras.forEach(c => { c.style.transition = 'none'; c.style.transform = 'translateY(110%)'; c.style.opacity = 1 })
    void root.offsetHeight
    const timers = Array.from(letras).map((c, i) => setTimeout(() => {
      c.style.transition = 'transform 1.1s cubic-bezier(.2,.9,.1,1)'
      c.style.transform = 'none'
    }, 150 + i * 45))

    return () => timers.forEach(clearTimeout)
  }, [containerRef])
}
