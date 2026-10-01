import { createContext, useContext, useState, useEffect } from 'react'
import { THEME_ORDER } from './tokens'

const ThemeContext = createContext(null)

function temaInicial() {
  try {
    const guardado = localStorage.getItem('jma-theme')
    if (THEME_ORDER.includes(guardado)) return guardado
  } catch {
    // localStorage no disponible: usamos el tema por defecto
  }
  return 'latente'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(temaInicial)

  useEffect(() => {
    try {
      localStorage.setItem('jma-theme', theme)
    } catch {
      // per-viewer preference only: si falla, no pasa nada
    }
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
