import { useEffect } from 'react'

const VARIANTES = {
  latente: {
    oculto: { transform: 'translateY(110%)', opacity: '1' },
    transition: 'transform 1.1s cubic-bezier(.2,.9,.1,1)',
    retardo: 45,
  },
  papel: {
    oculto: { transform: 'translateY(60%) rotate(8deg)', opacity: '0' },
    transition: 'transform 1s cubic-bezier(.2,.9,.1,1.2), opacity .6s',
    retardo: 42,
  },
}

// Revela las letras de [data-ch] dentro de containerRef una a una al
// montar (el hero siempre está visible, no hace falta esperar scroll).
export function useNameStagger(containerRef, variante = 'latente') {
  useEffect(() => {
    const root = containerRef.current
    if (!root) return
    const letras = root.querySelectorAll('[data-ch]')
    if (!letras.length) return
    const v = VARIANTES[variante]

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      letras.forEach(c => { c.style.transform = 'none'; c.style.opacity = 1 })
      return
    }

    letras.forEach(c => {
      c.style.transition = 'none'
      c.style.transform = v.oculto.transform
      c.style.opacity = v.oculto.opacity
    })
    void root.offsetHeight
    const timers = Array.from(letras).map((c, i) => setTimeout(() => {
      c.style.transition = v.transition
      c.style.transform = 'none'
      c.style.opacity = '1'
    }, 150 + i * v.retardo))

    return () => timers.forEach(clearTimeout)
  }, [containerRef, variante])
}
