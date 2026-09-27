// Curva e variantes compartilhadas — mantém o "ritmo" de animação igual no site todo.
export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const stagger = (step = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

// Quanto do elemento precisa estar visível para o reveal disparar
export const VIEWPORT = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' }
