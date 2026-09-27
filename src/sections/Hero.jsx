import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { brand } from '../config/brand'
import { EASE } from '../lib/motion'
import { whatsappUrl } from '../lib/whatsapp'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Img from '../components/ui/Img'
import Logo from '../components/ui/Logo'

export default function Hero() {
  const { hero, google } = brand
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax: fundo desce mais devagar que o scroll; conteúdo sobe e some.
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '28%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-18%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section ref={ref} id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* ── Fundo (foto ou vídeo) com parallax ─────────────────────────────── */}
      <m.div aria-hidden="true" style={{ y: bgY, scale: bgScale }} className="absolute inset-0 -z-10 will-change-transform">
        {hero.video ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata">
            <source src={hero.video} type="video/mp4" />
          </video>
        ) : (
          <Img src={hero.image} alt="" priority sizes="100vw" className="h-full w-full object-cover object-[62%_50%]" />
        )}
      </m.div>

      {/* Camadas de tratamento da imagem: escurece, dá leitura ao texto e integra com a próxima seção */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />
      <div aria-hidden="true" className="absolute -bottom-40 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[120px]" />

      {/* ── Topo: logotipo ─────────────────────────────────────────────────── */}
      <m.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="shell flex items-center justify-between pt-6 sm:pt-8"
      >
        <a href="#inicio">
          <Logo />
        </a>
        <span className="eyebrow hidden items-center gap-3 sm:flex">
          <Icon name="pin" size={16} className="text-accent" />
          {brand.city}
        </span>
      </m.header>

      {/* ── Conteúdo ───────────────────────────────────────────────────────── */}
      <m.div style={{ y: contentY, opacity: contentOpacity }} className="shell flex flex-1 flex-col justify-end pb-16 pt-24 sm:pb-20 lg:pb-24">
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="flex items-center gap-4"
        >
          <span className="rule-accent" />
          <span className="eyebrow text-bone/80">{hero.eyebrow}</span>
        </m.p>

        <h1 className="mt-6 max-w-[14ch] font-display text-display-xl uppercase text-bone sm:max-w-none">
          {hero.title.map((line, i) => (
            // Cada linha "sobe" de dentro de uma máscara — entrada tipo letreiro
            <span key={i} className="-my-[0.1em] block overflow-hidden py-[0.1em]">
              <m.span
                className={`block ${line.accent ? 'text-accent' : ''}`}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, ease: EASE, delay: 0.15 + i * 0.1 }}
              >
                {line.text}
              </m.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            {/* Sem fade de opacidade de propósito: este parágrafo costuma ser o LCP no mobile,
                e esconder com opacity atrasaria a métrica. Só desliza. */}
            <m.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
              className="text-body-lg text-mist"
            >
              {hero.subtitle}
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <Button href={whatsappUrl()} icon="whatsapp" size="lg">
                {hero.primaryCta}
              </Button>
              <Button href="#servicos" variant="ghost" size="lg" iconRight="arrowDown">
                {hero.secondaryCta}
              </Button>
            </m.div>
          </div>

          {/* Selo Google + indicador de scroll */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
            className="flex items-end justify-between gap-8 lg:flex-col lg:items-end"
          >
            <a
              href={brand.googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-bone/10 bg-ink/40 px-5 py-4 backdrop-blur-md transition-colors duration-300 hover:border-bone/25"
            >
              <span className="font-display text-[2.4rem] leading-none text-bone">{google.rating.toLocaleString('pt-BR')}</span>
              <span>
                <span className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={14} filled stroke={0} />
                  ))}
                </span>
                <span className="mt-1 block text-micro text-mist">{google.count} avaliações no Google</span>
              </span>
            </a>
            <a href="#sobre" aria-label="Rolar para a próxima seção" className="hidden flex-col items-center gap-3 text-mist lg:flex">
              <span className="eyebrow [writing-mode:vertical-rl]">Role</span>
              <span className="relative h-14 w-px overflow-hidden bg-bone/15">
                <m.span
                  className="absolute left-0 top-0 h-1/2 w-px bg-accent"
                  animate={reduce ? {} : { y: ['-100%', '200%'] }}
                  transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
                />
              </span>
            </a>
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
