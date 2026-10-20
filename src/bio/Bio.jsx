import { brand } from '../config/brand'
import { directionsUrl, wazeUrl } from '../lib/maps'
import { whatsappUrl } from '../lib/whatsapp'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Img from '../components/ui/Img'

// Página de links (bio) para Instagram e Google: tudo numa coluna, leve, sem animações.
// Usa os mesmos dados de src/config/brand.js — trocar lá atualiza o site e a bio.

function LinkRow({ href, icon, label, sub }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="shine edge group flex items-center gap-4 rounded-2xl bg-graphite/50 px-4 py-3.5 transition-[border-color,background-color] duration-300 ease-silk hover:border-accent/50 hover:bg-graphite/80"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-bone/10 bg-ink/60 text-accent">
        <Icon name={icon} size={22} stroke={1.4} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-bone">{label}</span>
        {sub && <span className="block truncate text-micro text-mist">{sub}</span>}
      </span>
      <Icon name="arrowRight" size={18} stroke={1.5} className="shrink-0 text-bone/40 transition-[color,transform] duration-300 ease-silk group-hover:translate-x-1 group-hover:text-accent" />
    </a>
  )
}

function Heading({ children }) {
  return (
    <h2 className="flex items-center gap-3">
      <span className="rule-accent !w-6" />
      <span className="eyebrow">{children}</span>
    </h2>
  )
}

export default function Bio() {
  const { google, address, hours } = brand
  const rating = google.rating.toLocaleString('pt-BR', { minimumFractionDigits: 1 })
  // Miniaturas do antes e depois: a foto "depois" de cada trabalho (ou a foto única)
  const gallery = brand.beforeAfter.map((p) => ({ src: p.single ?? p.after, label: p.label }))

  return (
    <div className="tex-carbon min-h-[100svh]">
      <main className="mx-auto w-full max-w-md px-5 pb-12 pt-10">
        {/* ── Perfil ─────────────────────────────────────────────────────── */}
        <header className="text-center">
          <img
            src="logo-lustroprime-circulo.webp"
            alt={`${brand.name} ${brand.nameSuffix}`}
            width={512}
            height={512}
            fetchPriority="high"
            className="mx-auto h-32 w-32 rounded-full shadow-glow"
          />
          <h1 className="mt-6 font-display text-[2rem] uppercase leading-none text-bone">
            {brand.name} <span className="block text-accent">{brand.nameSuffix}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xs text-small text-mist">{brand.hero.subtitle}</p>
          <a
            href={brand.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-3 rounded-full border border-bone/10 bg-ink/60 px-4 py-2 transition-colors duration-300 hover:border-accent/50"
          >
            <span className="font-display text-[1.3rem] leading-none text-bone">{rating}</span>
            <span className="flex gap-0.5 text-accent" role="img" aria-label={`${rating} de 5 estrelas`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" size={13} filled stroke={0} />
              ))}
            </span>
            <span className="text-micro text-mist">{google.count} avaliações no Google</span>
          </a>
        </header>

        {/* ── Ação principal ─────────────────────────────────────────────── */}
        <Button href={whatsappUrl()} icon="whatsapp" size="lg" className="mt-8 w-full !px-4 !text-[0.82rem] !tracking-[0.06em]">
          Pedir orçamento no WhatsApp
        </Button>

        {/* ── Links ──────────────────────────────────────────────────────── */}
        <nav aria-label="Links" className="mt-4 space-y-3">
          <LinkRow href="./" icon="imported" label="Conheça o site" sub="Serviços, antes e depois e localização" />
          <LinkRow href={directionsUrl} icon="navigate" label="Como chegar" sub={`${address.line1} · Santo Amaro`} />
          <LinkRow href={wazeUrl} icon="route" label="Abrir no Waze" sub="Rota direto para a loja" />
          <LinkRow href={brand.googleReviewsUrl} icon="star" label="Avaliações no Google" sub={`Nota ${rating} com ${google.count} avaliações`} />
          {brand.instagram && <LinkRow href={brand.instagram} icon="instagram" label="Instagram" sub={brand.instagramHandle} />}
        </nav>

        {/* ── Antes e depois ─────────────────────────────────────────────── */}
        <section className="mt-12">
          <Heading>Antes e depois</Heading>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {gallery.map((g) => (
              <a key={g.label} href="./#resultados" className="group relative aspect-square overflow-hidden rounded-xl bg-graphite">
                <Img src={g.src} alt={g.label} sizes="150px" width={936} height={1128} className="h-full w-full object-cover transition-transform duration-500 ease-silk group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-2 pb-1.5 pt-6 text-[0.65rem] font-semibold leading-tight text-bone">
                  {g.label}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Serviços: cada um abre o WhatsApp com o nome do serviço ──────── */}
        <section className="mt-12">
          <Heading>Serviços</Heading>
          <p className="mt-3 text-small text-mist">Toque em um serviço para pedir orçamento.</p>
          <ul className="mt-5 divide-y divide-bone/[0.07] border-y border-bone/[0.07]">
            {brand.services.map((s) => (
              <li key={s.name}>
                <a
                  href={whatsappUrl(`Olá! Vi o site e quero um orçamento de ${s.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-3.5"
                >
                  <Icon name={s.icon} size={22} stroke={1.3} className="shrink-0 text-accent" />
                  <span className="flex-1 text-small font-medium text-bone/90 transition-colors group-hover:text-bone">{s.name}</span>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent/40 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                    <Icon name="whatsapp" size={17} stroke={1.5} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Endereço e horário ─────────────────────────────────────────── */}
        <section className="edge mt-12 space-y-4 rounded-2xl bg-graphite/40 p-5">
          <div className="flex gap-3">
            <Icon name="pin" size={20} stroke={1.4} className="mt-0.5 shrink-0 text-accent" />
            <address className="not-italic text-small">
              <span className="block font-semibold text-bone">{address.line1}</span>
              <span className="block text-mist">{address.line2}</span>
            </address>
          </div>
          <div className="flex gap-3">
            <Icon name="clock" size={20} stroke={1.4} className="mt-0.5 shrink-0 text-accent" />
            <dl className="text-small">
              {hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-mist">{h.days}</dt>
                  <dd className="font-semibold text-bone">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex gap-3">
            <Icon name="whatsapp" size={20} stroke={1.4} className="mt-0.5 shrink-0 text-accent" />
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-small font-semibold text-bone hover:text-accent">
              {brand.whatsapp.display}
            </a>
          </div>
        </section>

        <footer className="mt-10 text-center text-micro text-smoke">
          <a href={brand.credit.url} target="_blank" rel="noopener noreferrer" className="uppercase tracking-[0.2em] hover:text-bone">
            {brand.credit.label}
          </a>
        </footer>
      </main>
      <div className="grain" aria-hidden="true" />
    </div>
  )
}
