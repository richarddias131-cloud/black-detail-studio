import { brand } from '../config/brand'
import { directionsUrl } from '../lib/maps'
import { whatsappUrl } from '../lib/whatsapp'
import Icon from '../components/ui/Icon'
import Logo from '../components/ui/Logo'

function Social({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="shine grid h-12 w-12 place-items-center rounded-full border border-bone/10 text-bone/80 transition-[border-color,color,box-shadow] duration-300 hover:border-accent hover:text-accent hover:shadow-glow-sm"
    >
      <Icon name={icon} size={20} stroke={1.3} />
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="tex-carbon relative border-t border-bone/[0.06] pb-28 pt-20 sm:pb-12">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-small text-mist">Estética automotiva de alto padrão em {brand.city}. Tratamento sob agendamento.</p>
            <div className="mt-8 flex gap-3">
              <Social href={brand.instagram} icon="instagram" label="Instagram" />
              <Social href={whatsappUrl()} icon="whatsapp" label="WhatsApp" />
              <Social href={brand.googleReviewsUrl} icon="star" label="Avaliações no Google" />
            </div>
          </div>

          <div>
            <h3 className="eyebrow flex items-center gap-3">
              <Icon name="pin" size={16} className="text-accent" /> Endereço
            </h3>
            <address className="mt-5 not-italic text-small leading-relaxed text-bone/85">
              {brand.address.line1}
              <br />
              {brand.address.line2}
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.2em] text-accent hover:text-accent-soft"
            >
              Como chegar <Icon name="arrowRight" size={14} stroke={1.6} />
            </a>
          </div>

          <div>
            <h3 className="eyebrow flex items-center gap-3">
              <Icon name="clock" size={16} className="text-accent" /> Horário
            </h3>
            <dl className="mt-5 space-y-2 text-small">
              {brand.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 border-b border-bone/[0.06] pb-2">
                  <dt className="text-mist">{h.days}</dt>
                  <dd className="text-bone/85">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="eyebrow flex items-center gap-3">
              <Icon name="whatsapp" size={16} className="text-accent" /> Contato
            </h3>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-5 block text-small text-bone/85 hover:text-accent">
              WhatsApp · agendamentos
            </a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 block text-small text-bone/85 hover:text-accent">
              {brand.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/[0.06] pt-8 text-micro text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {brand.name} {brand.nameSuffix}. Todos os direitos reservados.
          </p>
          <a href={brand.credit.url} className="uppercase tracking-[0.2em] hover:text-bone">
            {brand.credit.label}
          </a>
        </div>
      </div>
    </footer>
  )
}
