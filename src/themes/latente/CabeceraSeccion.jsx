import { useScrollReveal } from '../../hooks/useScrollReveal'
import './latente-shared.css'

export default function CabeceraSeccion({ numero, titulo, extra }) {
  const [tituloRef, tituloVisible] = useScrollReveal(0.12)
  const [lineaRef, lineaVisible] = useScrollReveal(0.12)

  return (
    <div className="hl_cabecera">
      <span className="hl_cabecera_num mono">{numero}</span>
      <h2 ref={tituloRef} className={`hl_reveal ${tituloVisible ? 'hl_reveal--visible' : ''}`}>{titulo}</h2>
      <div ref={lineaRef} className={`hl_cabecera_linea hl_linea ${lineaVisible ? 'hl_linea--visible' : ''}`} />
      {extra && <span className="hl_cabecera_extra mono">{extra}</span>}
    </div>
  )
}
