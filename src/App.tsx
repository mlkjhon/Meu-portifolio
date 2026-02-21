import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Technologies />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </>
  )
}

export default App
