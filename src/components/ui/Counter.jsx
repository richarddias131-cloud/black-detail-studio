import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Número que conta de 0 até `value` quando entra na tela.
// Escreve direto no DOM (sem re-render por frame) para não pesar.
export default function Counter({ value, decimals = 0, prefix = '', suffix = '', duration = 2.2, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const format = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

  useEffect(() => {
    if (!inView || !ref.current) return
    if (reduce) {
      ref.current.textContent = format(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value])

  return (
    <span className={className} role="img" aria-label={`${prefix}${format(value)}${suffix}`}>
      <span aria-hidden="true">{prefix}</span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(0)}
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  )
}
