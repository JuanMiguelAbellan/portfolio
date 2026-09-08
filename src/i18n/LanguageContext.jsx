import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

function idiomaInicial() {
  try {
    const guardado = localStorage.getItem('idioma')
    if (guardado === 'es' || guardado === 'en') return guardado
  } catch {
    // localStorage no disponible: seguimos con el idioma del navegador
  }
  return navigator.language?.startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(idiomaInicial)

  useEffect(() => {
    try {
      localStorage.setItem('idioma', lang)
    } catch {
      // per-viewer preference only: si falla, no pasa nada
    }
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang]
  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'))

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
