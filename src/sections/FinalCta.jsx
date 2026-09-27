import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { brand } from '../config/brand'
import { EASE, VIEWPORT } from '../lib/motion'
import { whatsappUrl } from '../lib/whatsapp'
import Button from '../components/ui/Button'
import Img from '../components/ui/Img'
import Reveal from '../components/ui/Reveal'

// Faixa em letreiro com os serviços (CSS puro, pausada em reduced-motion)
function Marquee() {
  const words = brand.services.map((s) => s.name.split(' —')[0])
  const row = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-bone/[0.07] bg-ink py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[clamp(1.6rem,3vw,2.6rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--c-bone)/0.35)]">
            {w}
            <span className="h-2 w-2 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FinalCta() {
  const { finalCta } = brand
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-12%', '12%'])

  return (
    <section id="agendar" className="relative">
      <Marquee />
      <div ref={ref} className="relative isolate overflow-hidden py-32 sm:py-40 lg:py-52">
        <m.div aria-hidden="true" style={{ y }} className="absolute inset-[-14%_0] -z-10">
          <Img src={finalCta.image} alt="" sizes="100vw" className="h-full w-full object-cover" />
        </m.div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/75" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink" />
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[140px]" />

        <div className="shell text-center">
          <Reveal className="flex items-center justify-center gap-4">
            <span className="rule-accent" />
            <span className="eyebrow text-bone/80">Vagas limitadas por semana</span>
            <span className="rule-accent" />
          </Reveal>

          {/* Gatilho no <h2>: as linhas começam escondidas pela máscara, então não "entram na tela" sozinhas */}
          <m.h2
            className="mt-8 font-display text-display-xl uppercase text-bone"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {finalCta.title.map((line, i) => (
              <span key={i} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                <m.span
                  className={`block ${i === finalCta.title.length - 1 ? 'text-accent' : ''}`}
                  variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 1.1, ease: EASE, delay: i * 0.12 } } }}
                >
                  {line}
                </m.span>
              </span>
            ))}
          </m.h2>

          <Reveal as="p" delay={0.25} className="mx-auto mt-8 max-w-xl text-body-lg text-mist">
            {finalCta.text}
          </Reveal>

          <Reveal delay={0.35} className="mt-12 flex justify-center">
            <Button href={whatsappUrl()} icon="whatsapp" size="lg">
              {finalCta.button}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
