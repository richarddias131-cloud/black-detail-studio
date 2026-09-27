/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// PALETA — os valores reais ficam em src/index.css (:root), como canais RGB.
// Para outro cliente, troque só as variáveis --c-* lá; nada aqui precisa mudar.
//
//   ink       #0A0A0A  fundo principal (preto profundo)
//   ink-900   #0F0F10  seções alternadas
//   graphite  #2A2A2E  cards / superfícies
//   steel     #3A3A3D  bordas, divisores, superfícies elevadas
//   accent    #E10600  destaque (CTAs, ícones, linhas, glow) — usar com moderação
//   bone      #F2F2F2  texto principal (nunca branco puro)
//   mist      #A6A6AB  texto secundário
//   smoke     #6E6E73  texto terciário / legendas
// ─────────────────────────────────────────────────────────────────────────────
const rgb = (v) => `rgb(var(${v}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: rgb('--c-ink'), 900: rgb('--c-ink-900') },
        graphite: rgb('--c-graphite'),
        steel: rgb('--c-steel'),
        accent: { DEFAULT: rgb('--c-accent'), deep: rgb('--c-accent-deep'), soft: rgb('--c-accent-soft') },
        bone: rgb('--c-bone'),
        mist: rgb('--c-mist'),
        smoke: rgb('--c-smoke'),
      },
      fontFamily: {
        // TROCAR FONTES: atualize também os imports @fontsource em src/main.jsx
        display: ['Anton', 'Impact', 'Arial Narrow', 'sans-serif'],
        sans: ['"Manrope Variable"', 'Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      // ESCALA TIPOGRÁFICA — fluida (clamp) para funcionar de 360px a 1920px
      // Entrelinha dos títulos deixa espaço para acentos em maiúsculas (Á, É, Ç, Ã)
      fontSize: {
        'display-xl': ['clamp(3.25rem, 10.5vw, 9.5rem)', { lineHeight: '0.98', letterSpacing: '0.005em' }],
        'display-lg': ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '1.02', letterSpacing: '0.01em' }],
        'display-md': ['clamp(2.1rem, 3.8vw, 3.4rem)', { lineHeight: '1.05', letterSpacing: '0.01em' }],
        'display-sm': ['clamp(1.6rem, 2.6vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
        eyebrow: ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.32em' }],
        'body-lg': ['clamp(1.05rem, 1.3vw, 1.2rem)', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        micro: ['0.75rem', { lineHeight: '1.5' }],
      },
      maxWidth: { shell: '78rem' },
      boxShadow: {
        'glow-sm': '0 0 24px -6px rgb(var(--c-accent) / 0.55)',
        glow: '0 0 48px -8px rgb(var(--c-accent) / 0.6)',
        'glow-card': '0 24px 60px -24px rgb(var(--c-accent) / 0.45)',
        lift: '0 30px 60px -30px rgb(0 0 0 / 0.9)',
      },
      transitionTimingFunction: {
        // curva "premium" usada em todo o site (mesma do Framer Motion em src/lib/motion.js)
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
