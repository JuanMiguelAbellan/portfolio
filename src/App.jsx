import { LanguageProvider } from './i18n/LanguageContext'
import { ThemeProvider } from './theme/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <Hero />
        <Stats />
        <About />
        <Projects />
        <Hackathons />
        <Skills />
        <Contact />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
