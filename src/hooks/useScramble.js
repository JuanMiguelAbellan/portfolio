import { useEffect, useRef } from 'react'
import { SCRAMBLE_GLYPHS } from '../theme/tokens'

// Descifra el texto de un elemento mutando nodeValue de sus nodos de
// texto (nunca reemplaza nodos de React). modo: 'montaje' (al montar),
// 'vista' (la primera vez que entra en el viewport) o 'hover' (cada
// vez que el ratón entra). Si se pasa lang, un cambio de idioma vuelve
// a descifrar el texto ya revelado (React solo habrá actualizado el
// nodeValue, no recreado el nodo).
export function useScramble(ref, { modo = 'vista', duracion = 900, lang } = {}) {
  const reveladoRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    function descifrar(dur) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
      const nodos = []
      while (walker.nextNode()) nodos.push(walker.currentNode)
      nodos.forEach(nd => {
        if (!(el._ejecutando && nd._final != null && nd.nodeValue === nd._mostrado)) nd._final = nd.nodeValue
      })
      const inicio = performance.now()
      el._run = inicio
      el._ejecutando = true
      function paso(ahora) {
        if (el._run !== inicio) return
        const p = Math.min(1, (ahora - inicio) / dur)
        nodos.forEach(nd => {
          if (nd._mostrado != null && nd.nodeValue !== nd._mostrado && nd.nodeValue !== nd._final) nd._final = nd.nodeValue
          const tg = nd._final || ''
          const n = tg.length
          let out = ''
          for (let i = 0; i < n; i++) out += (tg[i] === ' ' || i / n < p) ? tg[i] : SCRAMBLE_GLYPHS[(Math.random() * SCRAMBLE_GLYPHS.length) | 0]
          nd.nodeValue = p < 1 ? out : tg
          nd._mostrado = nd.nodeValue
        })
        if (p < 1) requestAnimationFrame(paso)
        else el._ejecutando = false
      }
      requestAnimationFrame(paso)
    }

    if (modo === 'montaje') {
      descifrar(duracion)
      return
    }

    if (modo === 'hover') {
      const onEnter = () => descifrar(duracion)
      el.addEventListener('mouseenter', onEnter)
      return () => el.removeEventListener('mouseenter', onEnter)
    }

    // modo === 'vista'
    if (reveladoRef.current) {
      descifrar(Math.min(duracion, 900))
      return
    }
    const io = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return
      io.disconnect()
      reveladoRef.current = true
      descifrar(duracion)
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, modo, duracion, lang])
}
