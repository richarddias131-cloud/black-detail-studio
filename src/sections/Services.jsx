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

function ServiceCard({ service, index }) {
  return (
    <m.article
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      onPointerMove={trackPointer}
      className="group relative h-full"
    >
      <a
        href={whatsappUrl(`Olá! Tenho interesse em ${service.name}. Pode me passar mais informações?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="shine edge relative flex h-full flex-col overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-graphite/70 to-ink-900 p-7 transition-[border-color,box-shadow] duration-500 ease-silk hover:border-accent/40 hover:shadow-glow-card sm:p-8"
      >
        {/* Spotlight vermelho que segue o cursor */}
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

        <h3 className="relative mt-10 font-display text-display-sm uppercase text-bone">{service.name}</h3>
        <p className="relative mt-4 flex-1 text-small text-mist">{service.text}</p>

        <div className="relative mt-8 flex items-center justify-between border-t border-bone/[0.07] pt-5">
          <span className="text-micro font-semibold uppercase tracking-[0.2em] text-smoke">{service.tag}</span>
          <span className="flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.2em] text-bone/60 transition-colors duration-300 group-hover:text-accent">
            Orçar
            <Icon name="arrowRight" size={16} stroke={1.5} className="transition-transform duration-500 ease-silk group-hover:translate-x-1" />
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
          <SectionHeading eyebrow="Serviços" title={['Tratamentos', 'de alto padrão']} accentLast />
          <p className="max-w-sm text-body text-mist lg:pb-3">
            Cada serviço começa com diagnóstico de pintura e termina com relatório de entrega. Toque em um card para pedir orçamento.
          </p>
        </div>

        <RevealGroup step={0.08} className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {brand.services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
