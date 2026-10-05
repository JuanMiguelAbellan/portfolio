import { useEffect } from 'react'
import { EMBEDDING_WORDS } from '../theme/tokens'

const INK = '239,235,227'
const ACCENT = '240,168,58'
const MUTED = '162,157,148'
const K = 7
const CLUSTERS = 7

function generarPuntos(w, h) {
  const n = Math.max(70, Math.min(230, Math.round((w * h) / 8000)))

  // Centros en una rejilla 3xN con jitter, no al azar puro: si no,
  // por pura probabilidad salían dos clusters pegados (puntos
  // amontonados, etiquetas ilegibles) y zonas enteras vacías.
  const COLS = 3
  const FILAS = Math.ceil(CLUSTERS / COLS)
  const centros = Array.from({ length: CLUSTERS }, (_, i) => {
    const cx = (i % COLS) + 0.5
    const cy = Math.floor(i / COLS) + 0.5
    return [
      w * (0.08 + (cx / COLS) * 0.84 + (Math.random() - 0.5) * (0.22 / COLS)),
      h * (0.08 + (cy / FILAS) * 0.6 + (Math.random() - 0.5) * (0.22 / FILAS)),
    ]
  })

  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
  const pts = Array.from({ length: n }, (_, i) => {
    const cl = Math.random() < 0.8 ? centros[i % CLUSTERS] : [Math.random() * w, Math.random() * h]
    return {
      ox: cl[0] + gauss() * w * 0.15,
      oy: cl[1] + gauss() * h * 0.2,
      ph: Math.random() * 6.28,
      word: EMBEDDING_WORDS[i % EMBEDDING_WORDS.length],
      glow: 0,
    }
  })

  // Separación mínima entre puntos: sin esto, dos puntos del mismo
  // cluster podían caer a pocos píxeles y sus etiquetas se superponían
  // en cuanto ambos brillaban a la vez. Unas pocas pasadas bastan.
  const MIN_D = Math.max(22, Math.min(w, h) * 0.035)
  for (let pasada = 0; pasada < 4; pasada++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].ox - pts[i].ox, dy = pts[j].oy - pts[i].oy
        const d = Math.hypot(dx, dy) || 0.001
        if (d < MIN_D) {
          const empuje = (MIN_D - d) / 2
          const nx = dx / d, ny = dy / d
          pts[i].ox -= nx * empuje; pts[i].oy -= ny * empuje
          pts[j].ox += nx * empuje; pts[j].oy += ny * empuje
        }
      }
    }
  }

  return pts
}

// Campo de embeddings del hero de Latente: puntos agrupados en clusters
// que flotan despacio; el cursor es la consulta y los K vecinos más
// cercanos se iluminan y se unen a él. Sin ratón (o en táctil), la
// consulta recorre una curva de Lissajous. El rAF se para de verdad
// (no solo se salta el dibujo) fuera de pantalla o con la pestaña
// oculta, y pinta un único frame estático con prefers-reduced-motion.
export function useEmbeddingField(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const ctx = canvas.getContext('2d')
    const s = { w: 0, h: 0, pts: [], qx: 0, qy: 0, mx: -9999, my: -9999, mouseIn: false, raf: null, visible: true }

    function setup() {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth, h = canvas.clientHeight
      if (!w || !h) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s.w = w; s.h = h
      s.pts = generarPuntos(w, h)
      s.qx = w * 0.6; s.qy = h * 0.4
      dibujarFrame(performance.now())
    }

    function dibujarFrame(t) {
      const { w, h, pts } = s
      if (!w || !h) return
      const r = canvas.getBoundingClientRect()
      const inside = s.mouseIn && s.my > r.top && s.my < r.bottom
      const tx = inside ? s.mx - r.left : w * (0.5 + 0.32 * Math.sin(t * 0.00023))
      const ty = inside ? s.my - r.top : h * (0.42 + 0.22 * Math.sin(t * 0.00037))
      s.qx += (tx - s.qx) * 0.09
      s.qy += (ty - s.qy) * 0.09
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x = p.ox + Math.sin(t * 0.0003 + p.ph) * 16
        p.y = p.oy + Math.cos(t * 0.00026 + p.ph * 1.3) * 16
        p.d = Math.hypot(p.x - s.qx, p.y - s.qy)
      }
      const ordenados = pts.slice().sort((a, b) => a.d - b.d)
      const top = new Set(ordenados.slice(0, K))
      for (const p of pts) p.glow += ((top.has(p) ? 1 : 0) - p.glow) * 0.12

      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${INK},0.05)`
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], q = pts[(i * 7 + 3) % pts.length]
        if (Math.hypot(p.x - q.x, p.y - q.y) < 110) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
        }
      }

      const maxD = Math.hypot(w, h) * 0.5
      ordenados.slice(0, K).forEach((p, k) => {
        ctx.strokeStyle = `rgba(${ACCENT},${(1 - k / K) * 0.85 * p.glow})`
        ctx.beginPath(); ctx.moveTo(s.qx, s.qy); ctx.lineTo(p.x, p.y); ctx.stroke()
      })

      ctx.font = '11px "JetBrains Mono", monospace'
      for (const p of pts) {
        const gl = p.glow
        ctx.fillStyle = gl > 0.05 ? `rgba(${ACCENT},${0.35 + gl * 0.65})` : `rgba(${INK},0.32)`
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 + gl * 2.4, 0, 6.283); ctx.fill()
        if (gl > 0.05) {
          ctx.fillStyle = `rgba(${INK},${gl * 0.95})`
          ctx.fillText(p.word, p.x + 9, p.y - 4)
          ctx.fillStyle = `rgba(${MUTED},${gl * 0.9})`
          ctx.fillText('sim ' + Math.max(0, 1 - p.d / maxD).toFixed(3), p.x + 9, p.y + 10)
        }
      }

      ctx.strokeStyle = `rgba(${INK},0.9)`
      ctx.beginPath(); ctx.arc(s.qx, s.qy, 9 + Math.sin(t * 0.004) * 1.5, 0, 6.283); ctx.stroke()
      ctx.beginPath()
      ;[[-16, 0, -5, 0], [5, 0, 16, 0], [0, -16, 0, -5], [0, 5, 0, 16]].forEach(seg => {
        ctx.moveTo(s.qx + seg[0], s.qy + seg[1]); ctx.lineTo(s.qx + seg[2], s.qy + seg[3])
      })
      ctx.stroke()
    }

    function loop(t) {
      dibujarFrame(t)
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
    window.addEventListener('mousemove', onMove)

    const io = new IntersectionObserver(([entrada]) => {
      s.visible = entrada.isIntersecting
      if (s.visible && !document.hidden) iniciar(); else detener()
    }, { threshold: 0 })
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) detener()
      else if (s.visible) iniciar()
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
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [canvasRef])
}
