import { useEffect, useState } from 'react'

// true si hay un puntero fino con hover real (ratón). En táctil, los
// efectos atados al cursor (preview flotante, tilt, grosor variable)
// se desactivan y cada tema cae en su recorrido automático.
export function usePointerFino() {
  const [fino, setFino] = useState(
    () => window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? true,
  )

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = () => setFino(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return fino
}
