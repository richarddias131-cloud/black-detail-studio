import { m } from 'framer-motion'
import { EASE, VIEWPORT, fadeUp, stagger } from '../../lib/motion'

// Scroll reveal: fade + translateY quando entra na viewport.
export default function Reveal({ as = 'div', delay = 0, y = 28, className = '', children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Grupo com filhos escalonados — use <RevealItem> dentro.
export function RevealGroup({ as = 'div', step = 0.09, delay = 0, className = '', children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={stagger(step, delay)} initial="hidden" whileInView="show" viewport={VIEWPORT} {...rest}>
      {children}
    </Tag>
  )
}

export function RevealItem({ as = 'div', className = '', children, ...rest }) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={fadeUp} {...rest}>
      {children}
    </Tag>
  )
}
