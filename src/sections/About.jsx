import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { brand } from '../config/brand'
import { EASE, VIEWPORT } from '../lib/motion'
import Icon from '../components/ui/Icon'
import Img from '../components/ui/Img'
import Reveal, { RevealGroup, RevealItem } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

export default function About() {
  const { about } = brand
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section id="sobre" className="tex-carbon relative py-24 sm:py-32 lg:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        {/* ── Foto com revelação em cortina + parallax interno ─────────────── */}
        {/* O gatilho fica no contêiner externo: um elemento 100% recortado por clip-path
            não é detectado como "visível" pelo navegador e a animação nunca dispararia. */}
        <m.div ref={ref} className="relative" initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <m.div
            variants={{
              hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
              show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE } },
            }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] sm:aspect-[5/6]"
          >
            <m.div style={{ y: imgY }} className="absolute inset-[-10%_0]">
              <Img
                src={about.image}
                alt={about.imageAlt}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="h-full w-full object-cover"
              />
            </m.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </m.div>

          {/* Selo flutuante de autoridade */}
          <Reveal
            delay={0.4}
            className="tex-brushed edge absolute -bottom-8 right-4 flex max-w-[15rem] items-center gap-4 rounded-2xl p-5 shadow-lift sm:-right-6 lg:-right-10"
          >
            <span className="font-display text-[3.6rem] leading-none text-accent">{about.badge.value}</span>
            <span className="text-small font-medium leading-snug text-bone/85">{about.badge.label}</span>
          </Reveal>

          {/* Marca d'água do ano de fundação */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-4 -top-10 select-none font-display text-[5.5rem] leading-none text-bone/[0.04] sm:-left-8 sm:text-[8rem]"
          >
            {brand.since}
          </span>
        </m.div>

        {/* ── Texto ────────────────────────────────────────────────────────── */}
        <div>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} accentLast size="md" />
          <div className="mt-8 space-y-5">
            {about.text.map((p, i) => (
              <Reveal as="p" key={i} delay={0.1 + i * 0.08} className="text-body-lg text-mist">
                {p}
              </Reveal>
            ))}
          </div>

          <RevealGroup as="ul" delay={0.2} className="mt-10 divide-y divide-bone/[0.07] border-y border-bone/[0.07]">
            {about.techniques.map((t) => (
              <RevealItem as="li" key={t} className="flex items-center gap-4 py-4 text-bone/90">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-accent/40 text-accent">
                  <Icon name="check" size={16} stroke={1.6} />
                </span>
                <span className="text-body">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
