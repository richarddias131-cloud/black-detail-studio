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
import { brand } from './config/brand'

// Ordem das seções. Para remover uma seção num cliente, basta tirar a linha
// (a navegação lateral em ScrollChrome ignora seções que não estão na página).
// Depoimentos e Pacotes somem sozinhos quando a lista em brand.js está vazia.
export default function App() {
  return (
    // LazyMotion + domAnimation: carrega só o necessário do Framer Motion (bundle menor)
    // reducedMotion="user": respeita a preferência de acessibilidade do sistema
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollChrome />
        <main>
          <Hero />
          <BeforeAfter />
          <Services />
          <About />
          <WhyUs />
          {brand.testimonials.length > 0 && <Testimonials />}
          <Stats />
          {brand.packages.length > 0 && <Packages />}
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
