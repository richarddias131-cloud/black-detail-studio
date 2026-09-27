import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { brand } from '../config/brand'
import { EASE } from '../lib/motion'
import CompareSlider from '../components/ui/CompareSlider'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function BeforeAfter() {
  const pairs = brand.beforeAfter
  const [active, setActive] = useState(0)

  return (
    <section id="resultados" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />

      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Antes e depois" title={['O resultado', 'fala por si']} accentLast />
          <p className="max-w-sm text-body text-mist lg:pb-3">Arraste a divisória para comparar. Mesmo carro, mesmo ângulo, antes e depois do tratamento.</p>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.995 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <CompareSlider pair={pairs[active]} />
              </m.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Seletor de trabalhos */}
        <Reveal delay={0.1} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3" role="tablist" aria-label="Trabalhos">
          {pairs.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.car}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`shine group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,background-color] duration-300 ease-silk ${
                  on ? 'border-accent/50 bg-graphite/70' : 'border-bone/[0.07] bg-ink-900 hover:border-bone/20'
                }`}
              >
                <span className={`absolute inset-x-0 top-0 h-px origin-left bg-accent transition-transform duration-500 ease-silk ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                <span className="flex items-center gap-4">
                  <span className={`font-display text-[1.4rem] leading-none ${on ? 'text-accent' : 'text-bone/25'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-small font-semibold text-bone">{p.label}</span>
                    <span className="block text-micro uppercase tracking-[0.18em] text-smoke">{p.car}</span>
                  </span>
                </span>
              </button>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
