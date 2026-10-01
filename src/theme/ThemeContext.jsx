import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

function temaInicial() {
  try {
    const guardado = localStorage.getItem('tema')
    if (guardado === 'light' || guardado === 'dark') return guardado
  } catch {
    // localStorage no disponible: seguimos con la preferencia del sistema
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(temaInicial)

  useEffect(() => {
    try {
      localStorage.setItem('tema', theme)
    } catch {
      // per-viewer preference only: si falla, no pasa nada
    }
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
