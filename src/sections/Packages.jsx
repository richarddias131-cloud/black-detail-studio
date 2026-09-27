import { m } from 'framer-motion'
import { brand } from '../config/brand'
import { fadeUp } from '../lib/motion'
import { whatsappUrl } from '../lib/whatsapp'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { RevealGroup } from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'

function PackageCard({ pkg, index }) {
  const featured = pkg.featured
  return (
    <m.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className={`group relative flex h-full flex-col rounded-[1.6rem] p-6 transition-[border-color,box-shadow] duration-500 ease-silk sm:p-10 ${
        featured
          ? 'tex-brushed border border-accent/50 shadow-glow-card lg:-my-6 lg:py-14'
          : 'edge bg-gradient-to-b from-graphite/50 to-ink-900 hover:border-accent/35 hover:shadow-glow-card'
      }`}
    >
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-micro font-semibold uppercase tracking-[0.22em] text-bone shadow-glow-sm">
          Mais escolhido
        </span>
      )}

      <span className="font-display text-[1rem] tracking-[0.2em] text-smoke">{String(index + 1).padStart(2, '0')}</span>
      <h3 className={`mt-3 font-display text-display-md uppercase ${featured ? 'text-bone' : 'text-bone'}`}>{pkg.name}</h3>
      <p className="mt-3 text-small text-mist">{pkg.pitch}</p>

      <div className="my-8 h-px bg-gradient-to-r from-accent/60 via-bone/10 to-transparent" />

      <ul className="flex-1 space-y-4">
        {pkg.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-small text-bone/85">
            <Icon name="check" size={18} stroke={1.6} className="mt-0.5 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>

      <Button
        href={whatsappUrl(`Olá! Gostaria de um orçamento do pacote ${pkg.name}.`)}
        variant={featured ? 'primary' : 'dark'}
        className="mt-10 w-full"
        iconRight="arrowRight"
      >
        Solicitar orçamento
      </Button>
    </m.article>
  )
}

export default function Packages() {
  return (
    <section id="pacotes" className="relative bg-gradient-to-b from-ink via-ink-900 to-ink py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Pacotes"
          title={['Escolha o nível', 'de proteção']}
          accentLast
          intro="Os valores dependem do porte e do estado da pintura. Envie o modelo do seu carro e receba um orçamento sob medida."
        />

        <RevealGroup step={0.12} className="mt-16 grid items-stretch gap-6 lg:mt-24 lg:grid-cols-3 lg:gap-5">
          {brand.packages.map((p, i) => (
            <PackageCard key={p.name} pkg={p} index={i} />
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
