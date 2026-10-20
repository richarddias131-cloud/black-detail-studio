import { m } from 'framer-motion'
import { brand } from '../config/brand'
import { fadeUp } from '../lib/motion'
import { whatsappUrl } from '../lib/whatsapp'
import Icon from '../components/ui/Icon'
import { RevealGroup } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

// Luz que segue o mouse dentro do card (só atualiza 2 variáveis CSS, sem re-render)
function trackPointer(e) {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

function ServiceCard({ service, index, className = '' }) {
  return (
    <m.article
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      onPointerMove={trackPointer}
      className={`group relative h-full ${className}`}
    >
      <a
        href={whatsappUrl(`Olá! Vi o site e quero um orçamento de ${service.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="shine edge relative flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-graphite/70 to-ink-900 p-7 transition-[border-color,box-shadow] duration-500 ease-silk hover:border-accent/40 hover:shadow-glow-card sm:p-8"
      >
        {/* Spotlight na cor de destaque que segue o cursor */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(var(--c-accent) / 0.13), transparent 60%)' }}
        />

        <div className="relative flex items-start justify-between">
          <span className="grid h-16 w-16 place-items-center rounded-2xl border border-bone/10 bg-ink/60 text-accent transition-[border-color,transform] duration-500 ease-silk group-hover:-rotate-6 group-hover:border-accent/50">
            <Icon name={service.icon} size={30} stroke={1.15} />
          </span>
          <span className="font-display text-[1.1rem] tracking-[0.1em] text-bone/20 transition-colors duration-500 group-hover:text-accent/70">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="relative mt-8 font-display text-display-sm uppercase text-bone">{service.name}</h3>
        <p className="relative mt-4 flex-1 text-small text-mist">{service.text}</p>

        <div className="relative mt-8 border-t border-bone/[0.07] pt-5">
          <span className="inline-flex h-11 items-center gap-2 rounded-full border border-accent/50 px-5 text-micro font-semibold uppercase tracking-[0.16em] text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
            <Icon name="whatsapp" size={16} stroke={1.5} />
            Pedir orçamento
          </span>
        </div>
      </a>
    </m.article>
  )
}

export default function Services() {
  return (
    <section id="servicos" className="relative bg-gradient-to-b from-ink via-ink-900 to-ink py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Serviços" title={['O que a gente', 'faz pelo seu carro']} accentLast />
          <p className="max-w-sm text-body text-mist lg:pb-3">Toque em um serviço para pedir orçamento pelo WhatsApp, já com o nome do serviço na mensagem.</p>
        </div>

        <RevealGroup step={0.08} className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {brand.services.map((s, i, all) => (
            // Último card sozinho na linha fica centralizado no desktop
            <ServiceCard key={s.name} service={s} index={i} className={i === all.length - 1 && all.length % 3 === 1 ? 'lg:col-start-2' : ''} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
