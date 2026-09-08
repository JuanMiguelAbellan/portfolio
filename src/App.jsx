import { LanguageProvider } from './i18n/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Hackathons from './components/Hackathons'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

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
      <Footer />
    </LanguageProvider>
  )
}

export default App
