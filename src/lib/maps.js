import { brand } from '../config/brand'

// Destino usado por mapa e rotas: coordenadas quando houver, senão o texto de busca.
const { lat, lng, mapQuery } = brand.address
const hasCoords = lat != null && lng != null
const destination = hasCoords ? `${lat},${lng}` : mapQuery

// Mapa embutido do Google (não precisa de chave de API)
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(destination)}&z=16&hl=pt-BR&output=embed`

// Abre o Google Maps já traçando a rota a partir da localização de quem clicou.
// No celular, abre direto no app do Google Maps.
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`

// Abre o Waze já em modo navegação
export const wazeUrl = hasCoords
  ? `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`
  : `https://waze.com/ul?q=${encodeURIComponent(mapQuery)}&navigate=yes`
