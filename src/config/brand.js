// ═════════════════════════════════════════════════════════════════════════════
//  ARQUIVO DE CUSTOMIZAÇÃO POR CLIENTE
//  Quase tudo que muda de um prospect para outro está aqui: nome, contatos,
//  textos, fotos, serviços, pacotes, depoimentos e números.
//
//  Outros pontos de troca (fora deste arquivo):
//   • Cores ............ src/index.css (:root → --c-*)
//   • Fontes ........... tailwind.config.js (fontFamily) + <link> no index.html
//   • Logo em arquivo .. coloque em /public e aponte em brand.logo abaixo
//   • <title>/SEO ...... index.html (e o preload da foto do Hero)
//
//  REGRA: nada de dado inventado. O que o cliente ainda não confirmou fica com
//  o marcador [A CONFIRMAR] visível no site (procure por "A CONFIRMAR").
// ═════════════════════════════════════════════════════════════════════════════

// Helper de imagens do Unsplash — gera URL otimizada no tamanho pedido.
// Não usar foto de banco de imagens como se fosse trabalho do cliente:
// para fotos próprias, use caminhos locais (ex.: 'fotos/hero.webp') — o <Img> aceita os dois.
export const u = (id) => ({ unsplash: id })

// Fotos do cliente (recortadas do catálogo do WhatsApp) — ficam em public/fotos
const foto = (name) => `fotos/${name}.webp`

export const brand = {
  // ── Identidade ────────────────────────────────────────────────────────────
  name: 'Lustroprime',
  nameSuffix: 'Estética Automotiva',
  logo: 'logo-lustroprime.webp', // recortado do print do logo — [A CONFIRMAR] pedir o arquivo original em alta
  logoSize: [360, 122],
  city: 'Santo Amaro · São Paulo',
  since: null, // ano de fundação: [A CONFIRMAR] (null esconde a marca d'água)

  // ── Contato ───────────────────────────────────────────────────────────────
  whatsapp: {
    number: '5511978479285',
    display: '(11) 97847-9285',
    message: 'Olá! Vi o site e quero um orçamento.',
  },
  instagram: null, // [A CONFIRMAR] ex.: 'https://instagram.com/...'
  instagramHandle: null,
  // [A CONFIRMAR] link direto do perfil no Google; por enquanto, busca pelo nome no Maps
  googleReviewsUrl: 'https://www.google.com/maps/search/?api=1&query=Lustroprime%20Est%C3%A9tica%20Automotiva%20Santo%20Amaro',
  address: {
    line1: 'R. Carlos Gomes, 678',
    line2: 'Santo Amaro · São Paulo/SP',
    mapQuery: 'R. Carlos Gomes, 678 - Santo Amaro, São Paulo - SP',
    lat: null,
    lng: null,
    parking: '', // [A CONFIRMAR] tem estacionamento para clientes?
  },
  hours: [{ days: 'Todos os dias [A CONFIRMAR os dias]', time: '9h — 19h' }],
  credit: { label: 'Site feito pela CRESBI', url: 'https://cresbi.com.br' },

  // ── 1. Hero ───────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Estética automotiva em Santo Amaro',
    // Cada item vira uma linha do título; { accent: true } pinta com a cor de destaque
    title: [{ text: 'Seu carro com' }, { text: 'cara de novo,' }, { text: 'em Santo Amaro', accent: true }],
    subtitle: 'Lavagem, polimento, vitrificação e higienização com cuidado de detalhe.',
    image: foto('tiggo-after'), // TROCAR junto com o preload do index.html
    imageAlt: 'Chery Tiggo 7 Pro azul-escuro com a pintura brilhando depois do polimento',
    primaryCta: 'Pedir orçamento no WhatsApp',
    secondaryCta: 'Ver serviços',
  },

  // ── 2. Sobre ──────────────────────────────────────────────────────────────
  about: {
    eyebrow: 'A Lustroprime',
    title: ['Cuidado de detalhe', 'em Santo Amaro'],
    text: [
      'A Lustroprime Estética Automotiva fica na R. Carlos Gomes, 678, em Santo Amaro, e cuida do seu carro por fora e por dentro.',
      '[A CONFIRMAR] Um parágrafo curto sobre a empresa: desde quando atende, quem está à frente e como é o atendimento.',
    ],
    image: foto('descontaminacao'),
    imageAlt: 'Carro prata com a pintura limpa e brilhando depois da descontaminação',
    badge: { value: '5,0', label: 'de nota no Google, com 60 avaliações' },
    techniques: [
      'Lavagem, polimento, vitrificação e enceramento',
      'Higienização interna e hidratação de banco de couro',
      'Polimento de farol e de peça repintada',
      'Insulfilm e recuperação de carro de enchente',
    ],
  },

  // ── 3. Serviços ───────────────────────────────────────────────────────────
  // Ordem e nomes do catálogo do WhatsApp do cliente.
  // icon: wash | ceramic | polish | headlight | spray | interior | engine | flood | tint | wax | wheel
  services: [
    { icon: 'wash', name: 'Lavagem completa', text: 'Por fora e por dentro, com atenção a cada canto do carro.' },
    { icon: 'ceramic', name: 'Polimento e vitrificação', text: 'Devolve o brilho da pintura e deixa uma camada que ajuda a proteger.' },
    { icon: 'polish', name: 'Polimento de peça repintada', text: 'Deixa a peça que foi pintada de novo com o mesmo brilho do resto do carro.' },
    { icon: 'headlight', name: 'Polimento de farol', text: 'Tira o aspecto amarelado e opaco do farol.' },
    { icon: 'spray', name: 'Higienização interna', text: 'Limpeza profunda de bancos, carpetes e de todo o interior.' },
    { icon: 'interior', name: 'Limpeza e hidratação de banco de couro', text: 'Limpa e hidrata o couro para ele ficar macio e bonito.' },
    { icon: 'engine', name: 'Lavagem de motor', text: 'Tira a sujeira e a gordura acumuladas no motor.' },
    { icon: 'flood', name: 'Recuperação de carro de enchente', text: 'Desmontamos, limpamos e secamos o interior do carro que pegou água.' },
    { icon: 'tint', name: 'Insulfilm', text: 'Película nos vidros para mais conforto e privacidade.' },
    { icon: 'wax', name: 'Enceramento', text: 'Brilho e proteção rápida para a pintura.' },
  ],

  // ── 4. Antes e Depois ─────────────────────────────────────────────────────
  // Fotos reais do cliente. Três formatos:
  //  • before + after com o MESMO enquadramento → divisória arrastável
  //  • before + after com sideBySide: true → as duas fotos lado a lado (ângulos diferentes)
  //  • single → uma foto que já mostra o antes e o depois na mesma imagem
  beforeAfter: [
    {
      label: 'Polimento e vitrificação',
      car: 'Chery Tiggo 7 Pro',
      before: foto('tiggo-before'),
      after: foto('tiggo-after'),
      sideBySide: true,
    },
    {
      label: 'Recuperação de enchente',
      car: 'Interior desmontado e limpo',
      before: foto('flood-before'),
      after: foto('flood-during'),
      afterLabel: 'Em andamento',
      sideBySide: true,
    },
    {
      label: 'Polimento de peça repintada',
      car: 'Mesmo capô, duas metades',
      single: foto('repintada'),
      caption: 'Uma metade polida e a outra ainda não: olha a diferença.',
    },
  ],

  // ── 5. Por que nos escolher ───────────────────────────────────────────────
  // Só fatos confirmados. icon: qualquer nome de components/ui/Icon.jsx
  whyUs: [
    { icon: 'star', title: 'Nota 5,0 no Google', text: 'Média de 60 avaliações de clientes no Google.' },
    { icon: 'calendar', title: 'Aberto todos os dias', text: 'Das 9h às 19h. [A CONFIRMAR os dias]' },
    { icon: 'whatsapp', title: 'Orçamento no WhatsApp', text: 'Mande o modelo do carro e o serviço que você quer.' },
    { icon: 'pin', title: 'Em Santo Amaro', text: 'R. Carlos Gomes, 678, São Paulo/SP.' },
  ],

  // ── 6. Depoimentos ────────────────────────────────────────────────────────
  // [A CONFIRMAR] só avaliações reais do Google, com autorização. Lista vazia esconde a seção.
  testimonials: [],

  // ── 7. Prova social ───────────────────────────────────────────────────────
  // decimals: casas decimais; suffix/prefix aparecem ao lado
  stats: [
    { value: 5, decimals: 1, suffix: '★', label: 'nota no Google' },
    { value: 60, label: 'avaliações no Google' },
    { value: 10, label: 'serviços' },
  ],
  statsImage: foto('tiggo-after'), // fundo da faixa (fica bem escurecido)
  google: { rating: 5, count: 60 },

  // ── 8. Pacotes ────────────────────────────────────────────────────────────
  // [A CONFIRMAR] o catálogo do cliente não tem pacotes. Lista vazia esconde a seção.
  packages: [],

  // ── 9. CTA final ──────────────────────────────────────────────────────────
  finalCta: {
    eyebrow: 'Orçamento pelo WhatsApp',
    title: ['Peça seu', 'orçamento.'],
    text: 'Mande o modelo do seu carro e o serviço que você quer pelo WhatsApp (11) 97847-9285.',
    button: 'Pedir orçamento no WhatsApp',
    image: foto('repintada'),
  },
}
