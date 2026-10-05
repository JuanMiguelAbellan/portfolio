import { useEffect } from 'react'

const RAMP = ' .,:;-=+*x#%@'
const LENTE_R = 0.28 // proporción del lado menor

// Campo ASCII generado por ruido con una lente bajo el cursor; al hacer
// clic se lanzan ondas. Sin ratón (o en táctil), la lente recorre un
// punto automático. Colores del tema ASCII por defecto; otros temas
// pasan los suyos.
export function useAsciiField(canvasRef, { pageHex = '#1a2152', accentRgb = '205,235,79', inkRgb = '238,240,247', fontFamily = '"Space Mono", monospace' } = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const s = { w: 0, h: 0, cw: 11, chh: 17, cols: 0, rows: 0, mx: -9999, my: -9999, mouseIn: false, lx: null, ly: null, ripples: [], raf: null }

    function setup() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s.w = w; s.h = h
      s.cw = w < 700 ? 9 : 11
      s.chh = s.cw * 1.55
      s.cols = Math.ceil(w / s.cw)
      s.rows = Math.ceil(h / s.chh)
      dibujar(performance.now())
    }

    function dibujar(t) {
      const { w: aw, h: ah, cw, chh, cols, rows } = s
      if (!aw || !ah) return
      const r = canvas.getBoundingClientRect()
      const inside = s.mouseIn && s.my > r.top && s.my < r.bottom
      const tx = inside ? s.mx - r.left : aw * (0.62 + 0.2 * Math.sin(t * 0.0004))
      const ty = inside ? s.my - r.top : ah * (0.35 + 0.15 * Math.cos(t * 0.0005))
      s.lx = (s.lx ?? tx) + (tx - (s.lx ?? tx)) * 0.18
      s.ly = (s.ly ?? ty) + (ty - (s.ly ?? ty)) * 0.18
      s.ripples = s.ripples.filter(rp => t - rp.t < 2200)

      ctx.fillStyle = pageHex
      ctx.fillRect(0, 0, aw, ah)
      ctx.font = `${Math.round(cw * 1.35)}px ${fontFamily}`
      ctx.textBaseline = 'top'

      const T = t * 0.0006
      const R = Math.min(aw, ah) * LENTE_R
      for (let j = 0; j < rows; j++) {
        const y = j * chh
        for (let i = 0; i < cols; i++) {
          const x = i * cw, u = x / aw, v = y / ah
          let n = Math.sin(u * 7 + T) * Math.cos(v * 5 - T * 1.3) + Math.sin((u + v) * 9 + T * 0.7) * 0.5 + Math.sin(Math.hypot(u - 0.5, v - 0.5) * 14 - T * 2) * 0.35
          n = (n + 1.85) / 3.7
          const lens = Math.max(0, 1 - Math.hypot(x - s.lx, y - s.ly) / R)
          let rip = 0
          for (const rp of s.ripples) {
            const edad = (t - rp.t) / 1000
            rip += Math.max(0, 1 - Math.abs(Math.hypot(x - rp.x, y - rp.y) - edad * 520) / 40) * (1 - edad / 2.2)
          }
          const val = Math.min(1, n * 0.55 * (1 - lens * 0.3) + lens * lens * 0.75 + rip * 0.8)
          const k = Math.floor(val * (RAMP.length - 1))
          if (k <= 0) continue
          ctx.fillStyle = (lens > 0.35 || rip > 0.25) ? `rgba(${accentRgb},${0.5 + val * 0.5})` : `rgba(${inkRgb},${0.1 + val * 0.45})`
          ctx.fillText(RAMP[k], x, y)
        }
      }
    }

    function loop(t) {
      dibujar(t)
      s.raf = requestAnimationFrame(loop)
    }

    function iniciar() {
      if (reducido || s.raf !== null) return
      s.raf = requestAnimationFrame(loop)
    }
    function detener() {
      if (s.raf === null) return
      cancelAnimationFrame(s.raf)
      s.raf = null
    }

    const onMove = e => { s.mx = e.clientX; s.my = e.clientY; s.mouseIn = true }
    const onClick = e => {
      const r = canvas.getBoundingClientRect()
      s.ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() })
    }
    window.addEventListener('mousemove', onMove)
    canvas.addEventListener('click', onClick)

    const io = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting && !document.hidden) iniciar(); else detener()
    }, { threshold: 0 })
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) detener()
      else iniciar()
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => setup())
    ro.observe(canvas)

    setup()
    if (!reducido) iniciar()

    return () => {
      detener()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('click', onClick)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [canvasRef])
}
