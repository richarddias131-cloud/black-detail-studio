import { m } from 'framer-motion'
import { EASE } from '../../lib/motion'
import { whatsappUrl } from '../../lib/whatsapp'
import Icon from '../ui/Icon'

// Botão flutuante fixo — visível em todas as seções.
export default function WhatsAppFloat() {
  return (
    <m.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agende agora pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 1.6 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="group fixed bottom-5 right-5 z-50 flex items-center sm:bottom-8 sm:right-8"
    >
      <span className="pointer-events-none mr-3 hidden translate-x-2 rounded-full border border-bone/10 bg-ink/85 px-4 py-2 text-micro font-semibold uppercase tracking-[0.2em] text-bone opacity-0 backdrop-blur-md transition-all duration-300 ease-silk group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Agende agora
      </span>
      <span className="glow-pulse shine relative grid h-16 w-16 place-items-center rounded-full bg-accent text-bone shadow-glow">
        <Icon name="whatsapp" size={30} stroke={1.4} />
      </span>
    </m.a>
  )
}
