import { animate, m, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import Img from './Img'

// Filtro que simula pintura "antes": opaca, sem brilho, com micro-riscos circulares (hologramas).
// Usado só enquanto o cliente não tem fotos reais de antes/depois.
const DULL = { filter: 'grayscale(.35) saturate(.55) brightness(.6) contrast(.8) blur(.35px)' }

function SimulatedWear() {
  return (
    <>
      <div
        className="absolute inset-0 mix-blend-screen opacity-40"
        style={{
          background:
            'repeating-radial-gradient(circle at 38% 42%, rgb(255 255 255 / .07) 0 1px, transparent 1px 7px), repeating-radial-gradient(circle at 72% 58%, rgb(255 255 255 / .05) 0 1px, transparent 1px 9px)',
        }}
      />
      <div className="absolute inset-0 bg-[#5a4a3a]/25 mix-blend-multiply" />
    </>
  )
}

export default function CompareSlider({ pair }) {
  const ref = useRef(null)
  const pos = useMotionValue(50)
  const [value, setValue] = useState(50)
  const [dragging, setDragging] = useState(false)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()

  useMotionValueEvent(pos, 'change', (v) => setValue(Math.round(v)))
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`)
  const left = useTransform(pos, (v) => `${v}%`)

  // Dica visual ao aparecer: a divisória "respira" para mostrar que é arrastável
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(pos, [50, 22, 76, 50], { duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.3 })
    return () => c.stop()
  }, [inView, reduce, pos])

  const setFromClientX = (x) => {
    const r = ref.current.getBoundingClientRect()
    pos.set(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 3
    if (e.key === 'ArrowLeft') pos.set(Math.max(0, pos.get() - step))
    else if (e.key === 'ArrowRight') pos.set(Math.min(100, pos.get() + step))
    else if (e.key === 'Home') pos.set(0)
    else if (e.key === 'End') pos.set(100)
    else return
    e.preventDefault()
  }

  const before = pair.before ?? pair.after

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden rounded-[1.75rem] bg-graphite sm:aspect-[16/9]"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
        setFromClientX(e.clientX)
      }}
      onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      {/* DEPOIS (base) */}
      <Img src={pair.after} alt={`${pair.car} depois do tratamento`} sizes="(min-width: 1280px) 1200px, 100vw" className="absolute inset-0 h-full w-full object-cover" />

      {/* ANTES (recortado pela posição do slider) */}
      <m.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Img
          src={before}
          alt={`${pair.car} antes do tratamento`}
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="absolute inset-0 h-full w-full object-cover"
          style={pair.simulateBefore ? DULL : undefined}
        />
        {pair.simulateBefore && <SimulatedWear />}
      </m.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />

      {/* Rótulos */}
      <span className="pointer-events-none absolute left-5 top-5 rounded-full border border-bone/15 bg-ink/60 px-4 py-2 text-micro font-semibold uppercase tracking-[0.22em] text-bone/80 backdrop-blur-md">
        Antes
      </span>
      <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-accent px-4 py-2 text-micro font-semibold uppercase tracking-[0.22em] text-bone">
        Depois
      </span>

      {/* Divisória + alça */}
      <m.div className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-bone/80 shadow-[0_0_18px_rgb(var(--c-accent)/.9)]" style={{ left }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparar antes e depois"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}% antes`}
          onKeyDown={onKeyDown}
          className={`pointer-events-auto absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-bone/30 bg-ink/70 text-bone backdrop-blur-md transition-transform duration-300 ease-silk ${dragging ? 'scale-110 border-accent' : ''}`}
        >
          <Icon name="drag" size={22} stroke={1.5} />
        </div>
      </m.div>
    </div>
  )
}
