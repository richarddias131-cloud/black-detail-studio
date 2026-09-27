import { m } from 'framer-motion'
import { brand } from '../config/brand'
import { EASE, VIEWPORT } from '../lib/motion'
import { directionsUrl, mapEmbedUrl, wazeUrl } from '../lib/maps'
import { whatsappUrl } from '../lib/whatsapp'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

// Filtro que deixa o mapa do Google no tema escuro do site (o embed gratuito não aceita estilos)
const DARK_MAP = { filter: 'grayscale(1) invert(0.92) contrast(0.9) brightness(0.95)' }

function MapPin() {
  return (
    // Centro do mapa = centro do iframe, que está deslocado 110px para cima → 55px acima do meio da moldura
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[calc(50%-55px)] -translate-x-1/2 -translate-y-full">
      {/* Pulso no chão */}
      <span className="absolute -bottom-2 left-1/2 h-4 w-10 -translate-x-1/2 rounded-[50%] bg-accent/40 blur-[2px]" />
      <span className="absolute -bottom-2 left-1/2 h-4 w-10 -translate-x-1/2 animate-ping rounded-[50%] bg-accent/40 motion-reduce:hidden" />
      <svg width="44" height="56" viewBox="0 0 44 56" className="relative drop-shadow-[0_8px_16px_rgb(var(--c-accent)/0.6)]">
        <path d="M22 55S3 34.6 3 21a19 19 0 0 1 38 0c0 13.6-19 34-19 34Z" fill="rgb(var(--c-accent))" />
        <rect x="15" y="14" width="14" height="14" transform="rotate(45 22 21)" fill="none" stroke="rgb(var(--c-bone))" strokeWidth="1.6" />
      </svg>
    </span>
  )
}

export default function Location() {
  const { address, hours } = brand
  return (
    <section id="localizacao" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ── Informações + botões de rota ───────────────────────────────── */}
        <div>
          <SectionHeading eyebrow="Localização" title={['Venha conhecer', 'o estúdio']} accentLast size="md" />

          <Reveal delay={0.1} className="mt-10 space-y-5">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/40 text-accent">
                <Icon name="pin" size={20} stroke={1.4} />
              </span>
              <address className="not-italic">
                <span className="block text-body-lg font-semibold text-bone">{address.line1}</span>
                <span className="block text-small text-mist">{address.line2}</span>
              </address>
            </div>

            {address.parking && (
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/10 text-bone/70">
                  <Icon name="parking" size={20} stroke={1.4} />
                </span>
                <span className="text-small text-bone/85">{address.parking}</span>
              </div>
            )}

            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-bone/10 text-bone/70">
                <Icon name="clock" size={20} stroke={1.4} />
              </span>
              <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-small">
                {hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-mist">{h.days}</dt>
                    <dd className="text-bone/85">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={directionsUrl} icon="navigate" size="lg">
              Traçar rota
            </Button>
            <Button href={wazeUrl} variant="ghost" size="lg" icon="route">
              Abrir no Waze
            </Button>
          </Reveal>
          <Reveal delay={0.25} as="p" className="mt-5 text-small text-smoke">
            Atendimento com hora marcada.{' '}
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold text-bone/80 underline decoration-accent underline-offset-4 hover:text-accent">
              Agende antes pelo WhatsApp
            </a>
          </Reveal>
        </div>

        {/* ── Mapa ───────────────────────────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE }}
          className="edge relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-graphite shadow-lift sm:aspect-[16/11]"
        >
          <iframe
            title={`Mapa: ${address.line1}, ${address.line2}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            // O iframe sobe 110px para fora da moldura: esconde o cartão branco do Google
            // (canto superior) e mantém os créditos obrigatórios do rodapé visíveis.
            className="absolute inset-x-0 bottom-0 -top-[110px] h-[calc(100%+110px)] w-full border-0"
            style={DARK_MAP}
          />
          {/* Moldura: vinheta + pino da marca cobrindo o pino padrão do Google */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgb(0_0_0/0.65)]" />
          <MapPin />

          {/* Cartão flutuante com atalho de rota */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shine group absolute left-4 right-4 top-4 flex items-center justify-between gap-4 rounded-2xl border border-bone/10 bg-ink/85 px-5 py-4 backdrop-blur-md transition-colors duration-300 hover:border-accent/50 sm:left-6 sm:right-auto sm:top-6"
          >
            <span>
              <span className="block text-micro font-semibold uppercase tracking-[0.2em] text-accent">{brand.name} {brand.nameSuffix}</span>
              <span className="mt-1 block text-small text-bone">{address.line1}</span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-bone transition-transform duration-300 ease-silk group-hover:rotate-12">
              <Icon name="navigate" size={18} stroke={1.6} />
            </span>
          </a>
        </m.div>
      </div>
    </section>
  )
}
