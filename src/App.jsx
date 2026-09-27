import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import CustomCursor from './components/layout/CustomCursor'
import ScrollChrome from './components/layout/ScrollChrome'
import WhatsAppFloat from './components/layout/WhatsAppFloat'
import About from './sections/About'
import BeforeAfter from './sections/BeforeAfter'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Location from './sections/Location'
import Packages from './sections/Packages'
import Services from './sections/Services'
import Stats from './sections/Stats'
import Testimonials from './sections/Testimonials'
import WhyUs from './sections/WhyUs'

// Ordem das seções. Para remover uma seção num cliente, basta tirar a linha
// (e o item correspondente em components/layout/ScrollChrome.jsx).
export default function App() {
  return (
    // LazyMotion + domAnimation: carrega só o necessário do Framer Motion (bundle menor)
    // reducedMotion="user": respeita a preferência de acessibilidade do sistema
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollChrome />
        <main>
          <Hero />
          <About />
          <Services />
          <BeforeAfter />
          <WhyUs />
          <Testimonials />
          <Stats />
          <Packages />
          <FinalCta />
          <Location />
        </main>
        <Footer />
        <WhatsAppFloat />
        <CustomCursor />
        <div className="grain" aria-hidden="true" />
      </MotionConfig>
    </LazyMotion>
  )
}
