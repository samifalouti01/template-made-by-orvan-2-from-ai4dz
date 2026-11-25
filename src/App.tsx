import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import Showcase from './components/Showcase'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-void">
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
