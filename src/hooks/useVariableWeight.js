import { useEffect } from 'react'

// El peso (wght/wdth) de cada letra [data-ch] de nameRef depende de su
// distancia al cursor (nombre del hero de Papel). Solo tiene sentido
// con puntero fino; el llamador decide si la monta.
export function useVariableWeight(nameRef, activo = true) {
  useEffect(() => {
    const el = nameRef.current
    if (!el || !activo) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const chars = Array.from(el.querySelectorAll('[data-ch]')).map(nodo => ({ el: nodo, w: 300 }))
    let mx = -9999, my = -9999, raf

    function onMove(e) { mx = e.clientX; my = e.clientY }

    function tick() {
      for (const c of chars) {
        const b = c.el.getBoundingClientRect()
        const d = Math.hypot(b.left + b.width / 2 - mx, b.top + b.height / 2 - my)
        c.w += (250 + 550 * Math.max(0, 1 - d / 420) - c.w) * 0.12
        c.el.style.fontVariationSettings = `'wght' ${c.w.toFixed(0)}, 'wdth' ${(100 - (c.w - 250) / 550 * 22).toFixed(1)}, 'opsz' 96`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [nameRef, activo])
}
