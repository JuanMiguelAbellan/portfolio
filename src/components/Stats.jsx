import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useReveal } from '../hooks/useReveal'
import { stats } from '../data/stats'
import './Stats.css'

function useConteo(valorFinal, activo) {
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (!activo) return

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValor(valorFinal)
      return
    }

    const duracion = 1100
    const inicio = performance.now()
    let frame

    function tick(ahora) {
      const progreso = Math.min((ahora - inicio) / duracion, 1)
      const easeOutQuad = 1 - (1 - progreso) * (1 - progreso)
      setValor(Math.round(valorFinal * easeOutQuad))
      if (progreso < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [activo, valorFinal])

  return valor
}

function StatItem({ stat, lang, activo }) {
  const valor = useConteo(stat.valor, activo)
  return (
    <div className="stat_item">
      <p className="stat_numero mono">{stat.prefijo || ''}{valor}{stat.sufijo}</p>
      <p className="stat_etiqueta">{stat.label[lang]}</p>
    </div>
  )
}

export default function Stats() {
  const { lang } = useLanguage()
  const [ref, visible] = useReveal(0.4)

  return (
    <section className="stats" ref={ref}>
      <div className={`contenedor stats_grid reveal ${visible ? 'reveal--visible' : ''}`}>
        {stats.map((stat) => (
          <StatItem key={stat.id} stat={stat} lang={lang} activo={visible} />
        ))}
      </div>
    </section>
  )
}
