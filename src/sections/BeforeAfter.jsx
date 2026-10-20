import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { brand } from '../config/brand'
import { EASE } from '../lib/motion'
import CompareSlider from '../components/ui/CompareSlider'
import Img from '../components/ui/Img'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const TAG = 'pointer-events-none absolute left-4 top-4 rounded-full px-4 py-2 text-micro font-semibold uppercase tracking-[0.22em] sm:left-5 sm:top-5'
const TAG_BEFORE = `${TAG} border border-bone/15 bg-ink/60 text-bone/80 backdrop-blur-md`
const TAG_AFTER = `${TAG} bg-accent text-on-accent`

// Antes e depois em fotos separadas (ângulos diferentes): lado a lado, sem divisória.
function SideBySide({ pair }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {[
        [pair.before, pair.beforeLabel ?? 'Antes', TAG_BEFORE],
        [pair.after, pair.afterLabel ?? 'Depois', TAG_AFTER],
      ].map(([src, label, tag]) => (
        <figure key={label} className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-graphite sm:rounded-[1.75rem] lg:aspect-[5/6]">
          <Img src={src} alt={`${pair.label}, ${pair.car}: ${label.toLowerCase()}`} sizes="(min-width: 1280px) 600px, 50vw" width={936} height={1128} className="absolute inset-0 h-full w-full object-cover" />
          <figcaption className={tag}>{label}</figcaption>
        </figure>
      ))}
    </div>
  )
}

// Uma foto que já mostra o antes e o depois (ex.: metade polida, metade não).
function Single({ pair }) {
  return (
    <figure className="relative overflow-hidden rounded-[1.75rem] bg-graphite">
      <Img src={pair.single} alt={`${pair.label}: ${pair.caption}`} sizes="(min-width: 1280px) 1200px, 100vw" width={936} height={882} className="aspect-[4/5] w-full object-cover sm:aspect-[16/9]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
      <figcaption className="absolute inset-x-5 bottom-5 text-small font-semibold text-bone sm:inset-x-8 sm:bottom-7 sm:text-body-lg">{pair.caption}</figcaption>
    </figure>
  )
}

function PairView({ pair }) {
  if (pair.single) return <Single pair={pair} />
  if (pair.sideBySide) return <SideBySide pair={pair} />
  return <CompareSlider pair={pair} />
}

export default function BeforeAfter() {
  const pairs = brand.beforeAfter
  const [active, setActive] = useState(0)
  const hasSlider = pairs.some((p) => !p.single && !p.sideBySide)

  return (
    <section id="resultados" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden="true" className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]" />

      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Antes e depois" title={['O resultado', 'fala por si']} accentLast />
          <p className="max-w-sm text-body text-mist lg:pb-3">
            Trabalhos reais da {brand.name}. Escolha abaixo qual serviço ver.
            {hasSlider && ' Nas fotos com divisória, arraste para comparar.'}
          </p>
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
                <PairView pair={pairs[active]} />
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
                key={p.label}
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
