import { m } from 'framer-motion'
import { useId } from 'react'
import { brand } from '../config/brand'
import { fadeUp } from '../lib/motion'
import Icon from '../components/ui/Icon'
import { RevealGroup } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

// Selo circular com texto girando ao redor — estilo "carimbo de qualidade".
function Seal({ icon, title }) {
  const id = useId().replace(/:/g, '')
  const ring = `${title} • ${brand.name} ${brand.nameSuffix} • `.toUpperCase()
  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center">
      <svg viewBox="0 0 160 160" className="animate-spin-slow absolute inset-0 h-full w-full text-bone/45 transition-colors duration-500 group-hover:text-bone/80" aria-hidden="true">
        <defs>
          <path id={id} d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <text className="fill-current font-sans text-[10.5px] font-semibold tracking-[0.28em]">
          <textPath href={`#${id}`} textLength="385" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-[26px] rounded-full border border-bone/10 bg-gradient-to-b from-graphite to-ink-900 transition-[border-color,box-shadow] duration-500 group-hover:border-accent/50 group-hover:shadow-glow-sm" />
      <Icon name={icon} size={38} stroke={1.1} className="relative text-accent" />
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="diferenciais" className="tex-brushed relative border-y border-bone/[0.06] py-24 sm:py-32">
      <div className="shell">
        <SectionHeading align="center" eyebrow="Por que nos escolher" title={['Compromisso em', 'cada detalhe']} accentLast />

        <RevealGroup step={0.1} className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {brand.whyUs.map((item) => (
            <m.div key={item.title} variants={fadeUp} className="group text-center">
              <Seal icon={item.icon} title={item.title} />
              <h3 className="mt-7 font-display text-[1.6rem] uppercase leading-none tracking-[0.02em] text-bone">{item.title}</h3>
              <p className="mx-auto mt-3 max-w-[16rem] text-small text-mist">{item.text}</p>
            </m.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
