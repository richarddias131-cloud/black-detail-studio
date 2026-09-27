# Black Detail Studio — bio site de portfólio

Landing page single-page para estética automotiva premium (marca fictícia).
Stack: React + Vite + Tailwind 3 + Framer Motion.

**Site no ar:** https://richarddias131-cloud.github.io/black-detail-studio/
(publicado automaticamente pelo GitHub Actions a cada push na `main` — ver `.github/workflows/deploy.yml`)

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera /dist para publicar (Vercel, Netlify, Hostinger...)
```

## Adaptar para um prospect (≈ 30 min)

| O quê | Onde |
|---|---|
| Nome, WhatsApp, endereço, horário, textos, serviços, pacotes, depoimentos, números | `src/config/brand.js` |
| Cores da marca | `src/index.css` → `:root` (`--c-accent` etc.) |
| Logo em arquivo | coloque em `public/` e defina `brand.logo` |
| Fotos | `brand.js` → troque `u('id-unsplash')` por `'/fotos/arquivo.jpg'` |
| Foto do Hero | `brand.hero.image` **e** o `<link rel="preload">` no `index.html` |
| Título/descrição do Google | `index.html` |
| Fontes | `src/main.jsx` (imports `@fontsource`) + `tailwind.config.js` |
| Remover uma seção | tire a linha em `src/App.jsx` e o item em `components/layout/ScrollChrome.jsx` |

Procure por `TROCAR` no código para achar todos os pontos de customização.

**Antes e depois:** enquanto não houver fotos reais, `simulateBefore: true` gera o "antes"
aplicando um filtro de pintura opaca na mesma foto. Para um cliente real, use pares de fotos
reais (mesmo enquadramento) em `before`/`after` e desligue a simulação.

## Performance (Lighthouse, build de produção)

- Mobile: Performance 90–94 · Acessibilidade 100 · Boas práticas 96 · SEO 100
- Desktop: Performance 99

Pontos que mantêm isso: fontes locais, preload da foto do Hero, `LazyMotion` (Framer Motion
enxuto), imagens responsivas com `srcset` + lazy loading, animações só em `transform`/`opacity`
e respeito a `prefers-reduced-motion`.
