import { m, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

// Navegação sem menu: barra de progresso no topo + pontos de âncora na lateral (desktop).
// TROCAR/ADICIONAR SEÇÕES: mantenha esta lista igual aos ids das <section> no App.
// Seções que não estiverem na página (ex.: sem depoimentos) não aparecem.
const SECTIONS = [
  ['inicio', 'Início'],
  ['resultados', 'Antes e depois'],
  ['servicos', 'Serviços'],
  ['sobre', 'A empresa'],
  ['diferenciais', 'Diferenciais'],
  ['depoimentos', 'Depoimentos'],
  ['numeros', 'Números'],
  ['pacotes', 'Pacotes'],
  ['agendar', 'Orçamento'],
  ['localizacao', 'Localização'],
]

export default function ScrollChrome() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  const [active, setActive] = useState('inicio')
  const [present, setPresent] = useState([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const found = SECTIONS.filter(([id]) => document.getElementById(id))
    found.forEach(([id]) => io.observe(document.getElementById(id)))
    setPresent(found)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <m.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-accent shadow-glow-sm" style={{ scaleX }} />

      <nav aria-label="Seções" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
        <ul className="flex flex-col gap-4">
          {present.map(([id, label]) => {
            const on = active === id
            return (
              <li key={id}>
                <a href={`#${id}`} aria-label={label} aria-current={on ? 'true' : undefined} className="group flex items-center justify-end gap-3 py-0.5">
                  <span className="pointer-events-none translate-x-1 text-micro font-semibold uppercase tracking-[0.2em] text-bone/80 opacity-0 transition-all duration-300 ease-silk group-hover:translate-x-0 group-hover:opacity-100">
                    {label}
                  </span>
                  <span className={`block h-px transition-all duration-500 ease-silk ${on ? 'w-8 bg-accent shadow-glow-sm' : 'w-4 bg-bone/30 group-hover:w-6 group-hover:bg-bone/70'}`} />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
