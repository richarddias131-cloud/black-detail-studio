import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { brand } from '../config/brand'
import { EASE } from '../lib/motion'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

const AUTOPLAY_MS = 7000

const slide = {
  enter: (dir) => ({ opacity: 0, x: dir * 60, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
  exit: (dir) => ({ opacity: 0, x: dir * -60, filter: 'blur(6px)', transition: { duration: 0.45, ease: EASE } }),
}

export default function Testimonials() {
  const items = brand.testimonials
  const [[index, dir], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const startX = useRef(null)

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + items.length) % items.length, step > 0 ? 1 : -1]),
    [items.length],
  )

  useEffect(() => {
    if (paused || reduce) return
    const t = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, paused, reduce, go])

  const t = items[index]

  return (
    <section id="depoimentos" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col justify-between gap-10">
          <SectionHeading eyebrow="Depoimentos" title={['Palavra de', 'quem confia']} accentLast />

          <Reveal delay={0.2} className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Depoimento anterior"
              className="shine grid h-14 w-14 place-items-center rounded-full border border-bone/15 text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Icon name="arrowLeft" size={20} stroke={1.4} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Próximo depoimento"
              className="shine grid h-14 w-14 place-items-center rounded-full border border-bone/15 text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <Icon name="arrowRight" size={20} stroke={1.4} />
            </button>
            <span className="ml-4 font-display text-[1.25rem] tracking-[0.1em] text-smoke">
              <span className="text-bone">{String(index + 1).padStart(2, '0')}</span> / {String(items.length).padStart(2, '0')}
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div
            className="edge relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-graphite/80 via-ink-900 to-ink p-8 sm:p-12 lg:p-14"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            onPointerDown={(e) => (startX.current = e.clientX)}
            onPointerUp={(e) => {
              if (startX.current === null) return
              const dx = e.clientX - startX.current
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
              startX.current = null
            }}
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
          >
            <Icon name="quote" size={56} stroke={1} className="text-accent/80" />

            <div className="relative mt-6 min-h-[17rem] sm:min-h-[14rem]" aria-live={paused ? 'polite' : 'off'}>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <m.figure key={index} custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
                  <blockquote className="text-[1.2rem] font-medium leading-[1.65] text-bone/90 sm:text-[1.4rem]">“{t.text}”</blockquote>
                  <figcaption className="mt-9 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 font-display text-[1.2rem] text-accent">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-semibold text-bone">{t.name}</span>
                      <span className="block text-micro uppercase tracking-[0.18em] text-smoke">{t.car}</span>
                    </span>
                    <span className="ml-auto flex gap-0.5 text-accent" role="img" aria-label="5 estrelas">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon key={i} name="star" size={15} filled stroke={0} />
                      ))}
                    </span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>

            {/* Indicadores com barra de progresso do autoplay */}
            <div className="mt-10 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Ver depoimento ${i + 1}`}
                  aria-current={i === index}
                  className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-bone/10"
                >
                  {i === index && (
                    <m.span
                      key={`${index}-${paused}`}
                      className="absolute inset-0 origin-left bg-accent"
                      initial={{ scaleX: paused || reduce ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused || reduce ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 bg-bone/30" />}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
