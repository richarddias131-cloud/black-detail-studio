import { brand } from '../../config/brand'

// Logotipo. Se brand.logo estiver definido, usa a imagem; senão monta o logotipo em texto.
export default function Logo({ className = '', size = 'md' }) {
  if (brand.logo) {
    return <img src={brand.logo} alt={`${brand.name} ${brand.nameSuffix}`.trim()} className={`h-9 w-auto ${className}`} />
  }
  const text = size === 'lg' ? 'text-[2rem]' : 'text-[1.4rem]'
  return (
    <span className={`inline-flex items-center gap-3 font-display uppercase leading-none tracking-[0.06em] ${text} ${className}`}>
      {/* Monograma: losango com traço — remete a lâmina/reflexo */}
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true" className="shrink-0">
        <rect x="4.5" y="4.5" width="17" height="17" transform="rotate(45 13 13)" fill="none" stroke="rgb(var(--c-bone))" strokeWidth="1.2" />
        <path d="M8 15.5 15.5 8" stroke="rgb(var(--c-accent))" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10.5 18 18 10.5" stroke="rgb(var(--c-bone) / .5)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="text-bone">
        {brand.name}
        {brand.nameSuffix && <span className="ml-[0.3em] text-accent">{brand.nameSuffix}</span>}
      </span>
    </span>
  )
}
