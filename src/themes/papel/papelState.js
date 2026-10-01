// Estado compartido mínimo entre el canvas de retícula y el seguimiento
// de tono por sección: un objeto mutable en vez de Context, porque se
// lee/escribe en cada frame y no debe disparar renders de React.
export const papelState = { tono: 'paper' }
