import { m, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Cursor leve: ponto vermelho + anel que cresce sobre elementos clicáveis.
// Só ativa com mouse (pointer: fine) e sem "reduzir movimento". Para desligar: remova <CustomCursor /> do App.
const INTERACTIVE = 'a, button, [role="slider"], [role="tab"]'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    const ok = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!ok) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => setHover(!!e.target.closest?.(INTERACTIVE))
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-[70] transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <m.div
        className="absolute left-0 top-0 rounded-full border border-bone/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hover ? 56 : 32, height: hover ? 56 : 32, borderColor: hover ? 'rgb(225 6 0 / 0.9)' : 'rgb(242 242 242 / 0.6)' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hover ? 0 : 1 }}
      />
    </div>
  )
}
