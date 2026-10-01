import { useEffect, useRef } from 'react'
import { SCRAMBLE_GLYPHS } from '../theme/tokens'

// Construye texto carácter a carácter con una cola de glifos sueltos
// por delante (párrafo "Sobre mí" de ASCII). 1500ms la primera vez que
// entra en el viewport, 600ms en las siguientes (cambio de idioma).
export function useDecodeText(ref, texto) {
  const reveladoRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = texto
      return
    }

    function decodificar(dur) {
      const inicio = performance.now()
      el._run = inicio
      function paso(ahora) {
        if (el._run !== inicio) return
        const p = Math.min(1, (ahora - inicio) / dur)
        const n = texto.length, cut = Math.floor(p * n)
        let cola = ''
        for (let i = cut; i < Math.min(n, cut + 14); i++) {
          cola += texto[i] === ' ' ? ' ' : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0]
        }
        el.textContent = p < 1 ? texto.slice(0, cut) + cola : texto
        if (p < 1) requestAnimationFrame(paso)
      }
      requestAnimationFrame(paso)
    }

    if (reveladoRef.current) {
      decodificar(600)
      return
    }
    const io = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      io.disconnect()
      reveladoRef.current = true
      decodificar(1500)
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, texto])
}
