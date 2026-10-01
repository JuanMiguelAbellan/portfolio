import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <Hero />
        <About />
        <Projects />
        <Hackathons />
        <Skills />
        <Contact />
        <ThemeSwitcher />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
