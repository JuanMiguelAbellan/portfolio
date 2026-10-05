import { LanguageProvider } from './i18n/LanguageContext'
import Header from './themes/latente/HeaderLatente'
import Hero from './themes/latente/HeroLatente'
import About from './themes/latente/AboutLatente'
import Projects from './themes/latente/ProjectsLatente'
import Hackathons from './themes/latente/HackathonsLatente'
import Skills from './themes/latente/SkillsLatente'
import Contact from './themes/latente/ContactLatente'

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Hero />
      <About />
      <Projects />
      <Hackathons />
      <Skills />
      <Contact />
    </LanguageProvider>
  )
}

export default App
