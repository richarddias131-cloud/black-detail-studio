import Icon from './Icon'

// Botões com shine sweep no hover.
// variant: 'primary' (vermelho, glow pulsante) | 'ghost' (contorno) | 'dark'
const VARIANTS = {
  primary:
    'glow-pulse bg-accent text-bone hover:bg-accent-soft hover:shadow-glow active:bg-accent-deep',
  ghost:
    'border border-bone/20 bg-bone/[0.03] text-bone backdrop-blur-sm hover:border-bone/45 hover:bg-bone/[0.07]',
  dark: 'border border-bone/10 bg-graphite text-bone hover:border-accent/60 hover:shadow-glow-sm',
}

export default function Button({ href, variant = 'primary', icon, iconRight, size = 'md', className = '', children, ...rest }) {
  const sizes = size === 'lg' ? 'h-14 px-6 text-[0.95rem] sm:px-8' : size === 'sm' ? 'h-11 px-5 text-small' : 'h-[3.25rem] px-5 text-small sm:px-7'
  const external = href?.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`shine group inline-flex select-none items-center justify-center gap-3 whitespace-nowrap rounded-full font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em] transition-[background-color,border-color,box-shadow,transform] duration-300 ease-silk hover:-translate-y-0.5 ${sizes} ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={20} stroke={1.5} />}
      <span className="relative">{children}</span>
      {iconRight && <Icon name={iconRight} size={18} stroke={1.5} className="transition-transform duration-300 ease-silk group-hover:translate-x-1" />}
    </a>
  )
}
