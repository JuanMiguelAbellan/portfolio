import { useEffect } from 'react'
import { PAPEL_SECCIONES } from '../theme/tokens'
import { papelState } from '../themes/papel/papelState'

const ACCENT = '224,72,42'
const R = 220

// Retícula de cruces (fondo fijo de Papel). Las cercanas al cursor
// giran, crecen y se tiñen de bermellón; el resto sigue el color de
// tono de la sección actual (papelState.tono). Parallax ligero con el
// scroll.
export function useCrossGrid(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const s = { w: 0, h: 0, gs: 44, mx: -9999, my: -9999, sx: null, sy: null, raf: null }

    function setup() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s.w = w; s.h = h
      s.gs = w < 700 ? 36 : 44
      dibujar()
    }

    function dibujar() {
      const { w, h, gs } = s
      if (!w || !h) return
      s.sx = (s.sx ?? s.mx) + (s.mx - (s.sx ?? s.mx)) * 0.15
      s.sy = (s.sy ?? s.my) + (s.my - (s.sy ?? s.my)) * 0.15
      const col = PAPEL_SECCIONES[papelState.tono]?.rgb || PAPEL_SECCIONES.paper.rgb
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = 1.2
      const off = (window.scrollY * 0.3) % gs
      for (let x = gs / 2; x < w + gs; x += gs) {
        for (let y = gs / 2 - off; y < h + gs; y += gs) {
          const dx = x - s.sx, dy = y - s.sy
          const f = Math.max(0, 1 - Math.hypot(dx, dy) / R)
          const e = f * f * (3 - 2 * f)
          const size = 3 + e * 7
          const ang = Math.atan2(dy, dx) + e * 1.2
          const px = x - dx * e * 0.18, py = y - dy * e * 0.18
          ctx.strokeStyle = e > 0.02 ? `rgba(${ACCENT},${0.25 + e * 0.75})` : `rgba(${col.join(',')},0.13)`
          const ca = Math.cos(ang) * size, sa = Math.sin(ang) * size
          ctx.beginPath()
          ctx.moveTo(px - ca, py - sa); ctx.lineTo(px + ca, py + sa)
          ctx.moveTo(px + sa, py - ca); ctx.lineTo(px - sa, py + ca)
          ctx.stroke()
        }
      }
    }

    function loop() {
      dibujar()
      s.raf = requestAnimationFrame(loop)
    }

    const onMove = e => { s.mx = e.clientX; s.my = e.clientY }
    const onScroll = () => { if (reducido) dibujar() }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(s.raf); s.raf = null }
      else if (!reducido && s.raf === null) s.raf = requestAnimationFrame(loop)
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => setup())
    ro.observe(canvas)

    setup()
    if (!reducido) s.raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(s.raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [canvasRef])
}
