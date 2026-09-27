// Imagem responsiva com lazy loading.
// `src` pode ser { unsplash: 'id' } (gera srcset otimizado) ou um caminho comum ('/fotos/x.jpg').
// Build "local" (VITE_LOCAL_IMAGES=1): usa cópias das fotos em img/<id>-<largura>.jpg,
// para hospedagens que bloqueiam imagens de outros domínios. Ver scripts/build-local.sh
const LOCAL = import.meta.env.VITE_LOCAL_IMAGES === '1'
const WIDTHS = LOCAL ? [768, 1440, 1920] : [480, 768, 1080, 1440, 1920]

function unsplashUrl(id, w, q = 72) {
  if (LOCAL) return `img/${id}-${w}.jpg`
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`
}

export default function Img({ src, alt, sizes = '100vw', priority = false, className = '', width = 1600, height = 1067, ...rest }) {
  const common = {
    alt,
    width,
    height,
    decoding: 'async',
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    className,
    ...rest,
  }

  if (src && typeof src === 'object' && src.unsplash) {
    const srcSet = WIDTHS.map((w) => `${unsplashUrl(src.unsplash, w)} ${w}w`).join(', ')
    return <img src={unsplashUrl(src.unsplash, 1440)} srcSet={srcSet} sizes={sizes} {...common} />
  }
  return <img src={src} {...common} />
}
