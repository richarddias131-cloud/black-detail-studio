import { brand } from '../config/brand'

// Monta o link do WhatsApp com mensagem pré-preenchida.
export function whatsappUrl(message = brand.whatsapp.message) {
  return `https://wa.me/${brand.whatsapp.number}?text=${encodeURIComponent(message)}`
}
