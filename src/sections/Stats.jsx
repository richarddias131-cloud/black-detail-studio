import { m } from 'framer-motion'
import { brand, u } from '../config/brand'
import { fadeUp } from '../lib/motion'
import Counter from '../components/ui/Counter'
import Icon from '../components/ui/Icon'
import Img from '../components/ui/Img'
import Reveal, { RevealGroup } from '../components/ui/Reveal'

// TROCAR FOTO de fundo desta faixa (fica bem escurecida)
const BG = u('1606577924006-27d39b132ae2')

export default function Stats() {
  const { stats, google } = brand
  return (
    <section id="numeros" className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Img src={BG} alt="" sizes="100vw" className="h-full w-full object-cover opacity-25 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="shell">
        <RevealGroup step={0.1} className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.75rem] border border-bone/[0.07] bg-bone/[0.07] lg:grid-cols-4">
          {stats.map((s) => (
            <m.div key={s.label} variants={fadeUp} className="bg-ink/90 px-5 py-10 text-center backdrop-blur-sm sm:px-8 sm:py-14">
              <Counter
                value={s.value}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                className="block font-display text-[clamp(2.8rem,6vw,5rem)] leading-none text-bone [&>span:first-child]:text-accent [&>span:last-child]:text-accent"
              />
              <span className="mt-4 block text-micro font-semibold uppercase tracking-[0.22em] text-mist">{s.label}</span>
            </m.div>
          ))}
        </RevealGroup>

        {/* Avaliação do Google */}
        <Reveal delay={0.15} className="mt-8 flex flex-col items-center justify-between gap-6 rounded-[1.4rem] border border-bone/[0.07] bg-graphite/40 px-6 py-6 backdrop-blur-sm sm:flex-row sm:px-10">
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-bone text-[1.6rem] font-bold text-ink" aria-hidden="true">
              G
            </span>
            <div>
              <div className="flex items-center gap-3">
                <span className="font-display text-[2rem] leading-none text-bone">{google.rating.toLocaleString('pt-BR')}</span>
                <span className="flex gap-0.5 text-accent" role="img" aria-label={`${google.rating} de 5 estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={16} filled stroke={0} />
                  ))}
                </span>
              </div>
              <p className="mt-1 text-small text-mist">Média de {google.count} avaliações verificadas no Google</p>
            </div>
          </div>
          <a
            href={brand.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shine group inline-flex items-center gap-3 rounded-full border border-bone/15 px-6 py-3 text-micro font-semibold uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-accent"
          >
            Ver avaliações
            <Icon name="arrowRight" size={16} stroke={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
