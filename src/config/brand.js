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
// ═════════════════════════════════════════════════════════════════════════════

// Helper de imagens do Unsplash — gera URL otimizada no tamanho pedido.
// TROCAR FOTOS: quando o cliente tiver fotos próprias, use caminhos locais
// (ex.: '/fotos/hero.jpg') no lugar de u('...') — o componente <Img> aceita os dois.
export const u = (id) => ({ unsplash: id })

export const brand = {
  // ── Identidade ────────────────────────────────────────────────────────────
  name: 'BLACK DETAIL', // TROCAR NOME: parte principal do logotipo
  nameSuffix: 'STUDIO', // TROCAR NOME: complemento (fica em vermelho). Use '' se não houver
  logo: null, // TROCAR LOGO: ex. '/logo.svg'. Se null, o logotipo é gerado em texto
  city: 'São Paulo · SP',
  since: 2018,

  // ── Contato ───────────────────────────────────────────────────────────────
  whatsapp: {
    number: '5511900000000', // TROCAR: DDI + DDD + número, só dígitos
    message: 'Olá! Vim pelo site e quero agendar uma avaliação do meu carro.',
  },
  instagram: 'https://instagram.com/blackdetailstudio', // TROCAR
  instagramHandle: '@blackdetailstudio', // TROCAR
  googleReviewsUrl: 'https://maps.google.com', // TROCAR: link do perfil no Google
  address: {
    line1: 'Alameda Lorena — Jardins', // TROCAR: endereço exibido no site
    line2: 'São Paulo · SP', // TROCAR
    // TROCAR: o que o Google Maps/Waze vão procurar. Use o endereço completo com número,
    // ou o nome exato da empresa no Google (ex.: 'Black Detail Studio, São Paulo').
    // Para precisão total, preencha lat/lng (clique com o botão direito no Google Maps → copie as coordenadas).
    mapQuery: 'Alameda Lorena, Jardins, São Paulo - SP',
    lat: null,
    lng: null,
    parking: 'Estacionamento no local para clientes', // opcional: '' para esconder
  },
  hours: [
    // TROCAR horário
    { days: 'Segunda a sexta', time: '08h — 18h' },
    { days: 'Sábado', time: '08h — 14h' },
    { days: 'Domingo', time: 'Fechado' },
  ],
  credit: { label: 'Site por AgilizeWeb', url: '#' }, // assinatura da agência no rodapé

  // ── 1. Hero ───────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Estética automotiva de alto padrão',
    // Cada item vira uma linha do título; { accent: true } pinta de vermelho
    title: [{ text: 'Seu carro' }, { text: 'merece mais que' }, { text: 'uma lavagem.', accent: true }],
    subtitle:
      'Vitrificação cerâmica, PPF e polimento técnico para quem trata o carro como investimento — com processo documentado, produtos importados e garantia por escrito.',
    image: u('1607860108855-64acf2078ed9'), // TROCAR FOTO do Hero (também no preload do index.html)
    imageAlt: 'Detalhista aplicando espuma em um carro esportivo preto',
    // video: '/hero.mp4', // OPCIONAL: vídeo de fundo (mp4 leve, sem áudio). Se definido, substitui a foto
    primaryCta: 'Fale no WhatsApp',
    secondaryCta: 'Ver serviços',
  },

  // ── 2. Sobre / Autoridade ─────────────────────────────────────────────────
  about: {
    eyebrow: 'O estúdio',
    title: ['Não é lava-rápido.', 'É engenharia de acabamento.'],
    text: [
      'Cada carro entra no estúdio para um diagnóstico de pintura com medidor de espessura e iluminação de inspeção. Só depois disso definimos o tratamento — nunca um pacote genérico.',
      'Trabalhamos com poucos carros por dia, em ambiente fechado e climatizado, para que cada etapa tenha o tempo de cura que o produto exige.',
    ],
    image: u('1632823469850-2f77dd9c7f93'), // TROCAR FOTO
    imageAlt: 'Profissional aplicando película de proteção PPF no farol de um Mercedes',
    badge: { value: '8', label: 'anos tratando carros de alto padrão' },
    techniques: [
      'Medição de camada de verniz em cada painel',
      'Polimento técnico em até 3 etapas',
      'Coatings cerâmicos 9H de linha profissional',
      'PPF auto-regenerativo com corte computadorizado',
    ],
  },

  // ── 3. Serviços ───────────────────────────────────────────────────────────
  // icon: ceramic | polish | ppf | wash | interior | wheel
  services: [
    {
      icon: 'ceramic',
      name: 'Vitrificação Cerâmica',
      text: 'Camada cerâmica de alta dureza que protege contra UV, chuva ácida e contaminantes — com brilho profundo por anos.',
      tag: 'Até 5 anos',
    },
    {
      icon: 'polish',
      name: 'Polimento Técnico',
      text: 'Correção de riscos, hologramas e oxidação em etapas, preservando o verniz original medido painel a painel.',
      tag: 'Correção de pintura',
    },
    {
      icon: 'ppf',
      name: 'PPF — Proteção de Pintura',
      text: 'Película transparente auto-regenerativa contra pedras, riscos e pequenas batidas. Invisível e removível.',
      tag: 'Película premium',
    },
    {
      icon: 'wash',
      name: 'Lavagem Detalhada',
      text: 'Método de dois baldes, pré-lavagem em espuma e descontaminação. Zero micro-riscos, cada detalhe à mão.',
      tag: 'Manutenção',
    },
    {
      icon: 'interior',
      name: 'Higienização Interna',
      text: 'Extração profunda de bancos e carpetes, hidratação de couro e sanitização do ar-condicionado.',
      tag: 'Couro & tecidos',
    },
    {
      icon: 'wheel',
      name: 'Estética de Rodas',
      text: 'Descontaminação de ferrugem de freio, vitrificação de rodas e pinças para limpeza fácil e brilho duradouro.',
      tag: 'Rodas & pinças',
    },
  ],

  // ── 4. Antes e Depois ─────────────────────────────────────────────────────
  // TROCAR FOTOS: use pares reais do cliente (before/after com o MESMO enquadramento).
  // Enquanto não houver, `simulateBefore: true` gera o "antes" aplicando um filtro
  // de pintura opaca/sem brilho sobre a mesma foto (apenas para demonstração).
  beforeAfter: [
    {
      label: 'Polimento + Vitrificação',
      car: 'Mercedes-AMG GT',
      after: u('1618843479313-40f8afb4b4d8'),
      before: null,
      simulateBefore: true,
    },
    {
      label: 'Correção de pintura',
      car: 'Porsche Panamera',
      after: u('1503376780353-7e6692767b70'),
      before: null,
      simulateBefore: true,
    },
    {
      label: 'Detalhamento completo',
      car: 'Chevrolet Camaro',
      after: u('1492144534655-ae79c964c9d7'),
      before: null,
      simulateBefore: true,
    },
  ],

  // ── 5. Por que nos escolher ───────────────────────────────────────────────
  // icon: warranty | imported | certified | calendar
  whyUs: [
    { icon: 'warranty', title: 'Garantia por escrito', text: 'Certificado com prazo e cobertura de cada tratamento.' },
    { icon: 'imported', title: 'Produtos importados', text: 'Linhas profissionais, as mesmas usadas nos melhores estúdios do mundo.' },
    { icon: 'certified', title: 'Equipe certificada', text: 'Aplicadores treinados e certificados pelos fabricantes.' },
    { icon: 'calendar', title: 'Atendimento agendado', text: 'Sem fila e sem pressa: seu carro tem hora marcada e dedicação total.' },
  ],

  // ── 6. Depoimentos ────────────────────────────────────────────────────────
  // TROCAR: use avaliações reais do Google do cliente (com autorização)
  testimonials: [
    {
      name: 'Rafael M.',
      car: 'BMW M4',
      text: 'Levei o carro com a pintura cheia de hologramas de lava-rápido. Voltou melhor do que saiu da concessionária. O relatório com fotos de cada etapa fez toda a diferença.',
    },
    {
      name: 'Carolina S.',
      car: 'Porsche Macan',
      text: 'Fiz PPF na frente inteira e vitrificação. Atendimento impecável do orçamento à entrega, e a garantia por escrito me deu muita segurança.',
    },
    {
      name: 'Eduardo L.',
      car: 'Audi RS5',
      text: 'Já passei por vários estúdios em São Paulo. Aqui é outro nível de cuidado: explicam tudo, cumprem prazo e o acabamento é absurdo.',
    },
    {
      name: 'Juliana P.',
      car: 'Volvo XC60',
      text: 'A higienização interna tirou manchas que eu achava impossíveis. Carro com cheiro de novo e bancos de couro hidratados. Recomendo demais.',
    },
  ],

  // ── 7. Prova social ───────────────────────────────────────────────────────
  // TROCAR números. decimals: casas decimais; suffix/prefix aparecem ao lado
  stats: [
    { value: 500, prefix: '+', label: 'veículos atendidos' },
    { value: 8, label: 'anos de mercado' },
    { value: 4.9, decimals: 1, suffix: '★', label: 'no Google' },
    { value: 97, suffix: '%', label: 'dos clientes voltam' },
  ],
  google: { rating: 4.9, count: 186 }, // TROCAR: nota e nº de avaliações reais

  // ── 8. Pacotes ────────────────────────────────────────────────────────────
  packages: [
    {
      name: 'Essencial',
      pitch: 'Para manter o carro impecável no dia a dia.',
      items: ['Lavagem detalhada', 'Descontaminação de pintura', 'Selante de proteção (6 meses)', 'Limpeza interna completa'],
    },
    {
      name: 'Premium',
      pitch: 'Correção e proteção de longo prazo.',
      featured: true, // destaque visual ("Mais escolhido")
      items: [
        'Tudo do Essencial',
        'Polimento técnico em 2 etapas',
        'Vitrificação cerâmica (3 anos)',
        'Vitrificação de rodas e vidros',
        'Hidratação de couro',
      ],
    },
    {
      name: 'Blindagem Total',
      pitch: 'Proteção máxima para quem não abre mão.',
      items: [
        'Tudo do Premium',
        'PPF na frente completa',
        'Vitrificação cerâmica (5 anos)',
        'Higienização interna profunda',
        'Revisão anual de garantia',
      ],
    },
  ],

  // ── 9. CTA final ──────────────────────────────────────────────────────────
  finalCta: {
    title: ['Agende a avaliação', 'do seu carro.'],
    text: 'Diagnóstico de pintura gratuito e orçamento personalizado em até 24h. Vagas limitadas por semana.',
    button: 'Agendar pelo WhatsApp',
    image: u('1617814076367-b759c7d7e738'), // TROCAR FOTO
  },
}
