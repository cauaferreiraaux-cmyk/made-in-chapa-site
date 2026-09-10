/**
 * Fonte única de conteúdo do site.
 *
 * Regra que vale para este arquivo inteiro: **campo sem dado confirmado é `null`**,
 * e a interface simplesmente não desenha o que está `null`. Nada de preço, endereço
 * ou horário de mentira aparecendo com cara de real — ver §7 do CLAUDE.md.
 *
 * O que ainda falta e de onde cada coisa veio está em PENDENTE.md.
 */

// ─────────────────────────────────────────────────────────── tipos

export type ItemCardapio = {
  nome: string;
  /** Confirmada na leitura do cardápio impresso. `null` = ainda não lida. */
  descricao: string | null;
  /** Em reais. `null` = não confirmado; o item aparece sem preço. */
  preco: number | null;
  destaque?: boolean;
};

export type CategoriaCardapio = {
  id: string;
  nome: string;
  chamada: string | null;
  itens: ItemCardapio[];
};

/** Uma faixa de funcionamento. `dias` em índice de `Date.getDay()` (0 = domingo). */
export type FaixaHorario = {
  rotulo: string;
  dias: number[];
  abre: string; // "18:30"
  fecha: string; // "23:30" — passando da meia-noite, use "01:00"
};

export type Endereco = {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string | null;
  /** Link do Google Maps, para o botão "como chegar". */
  mapaUrl: string | null;
};

// ─────────────────────────────────────────────────────────── marca e contato

export const marca = {
  nome: "Made in Chapa",
  categoria: "Hamburgueria",
  /** Uma frase. Aparece no <title> e no compartilhamento. */
  resumo:
    "Hambúrguer artesanal feito na chapa, na hora. Delivery, iFood e salão.",
} as const;

export const contato = {
  /** Confirmado no cardápio impresso da casa. */
  telefone: "(11) 95773-9624",
  /** Mesmo número em formato internacional, para o link do WhatsApp. */
  whatsapp: "5511957739624",
  /** Confirmado no cardápio impresso da casa. */
  instagram: "madeinchapa_",
  /** Loja online própria — é o "Compre aqui" do site. */
  lojaOnlineUrl: "https://madeinchapa.connectprojetosesistemas.com.br",
  /** PENDENTE — link da loja no iFood. */
  ifoodUrl: null as string | null,
  /** PENDENTE — e-mail de contato, se houver. */
  email: null as string | null,
} as const;

/** PENDENTE — endereço do salão. */
export const endereco: Endereco | null = null;

/** PENDENTE — horários de funcionamento. Preenchendo aqui, o selo "aberto agora" liga sozinho. */
export const horarios: FaixaHorario[] | null = null;

/** PENDENTE — CNPJ e razão social, para o rodapé. */
export const empresa = {
  razaoSocial: null as string | null,
  cnpj: null as string | null,
} as const;

// ─────────────────────────────────────────────────────────── cardápio

/**
 * ⚠️ PREÇOS DE EXEMPLO.
 *
 * Enquanto esta flag for `true`, o cardápio mostra um aviso de que os valores
 * são ilustrativos. Ao receber a tabela real dos donos: troque os números,
 * vire a flag para `false` e o aviso some sozinho.
 */
export const PRECOS_SAO_EXEMPLO = true;

/**
 * Nomes e descrições foram LIDOS da foto do cardápio da mesa
 * (`~/fotos-made-in-chapa`) — precisam de conferência com os donos.
 * Os preços impressos não tinham resolução para leitura: os que estão aqui são
 * EXEMPLO, para dar volume à tela enquanto a tabela real não chega.
 */
export const cardapio: CategoriaCardapio[] = [
  {
    id: "classicos",
    nome: "Burgers clássicos",
    chamada: "Pão tradicional, maionese artesanal e salada fresca da casa.",
    itens: [
      { nome: "X-Burger", descricao: null, preco: 16.9 },
      { nome: "X-Salada", descricao: null, preco: 19.9 },
      { nome: "X-Bacon", descricao: null, preco: 22.9, destaque: true },
      { nome: "X-Egg", descricao: null, preco: 20.9 },
      {
        nome: "X-Frango",
        descricao:
          "Pão tradicional, maionese artesanal, filé de frango, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 21.9,
      },
      {
        nome: "X-Calabresa",
        descricao:
          "Pão tradicional, maionese artesanal, linguiça calabresa, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 21.9,
      },
      {
        nome: "X-Churrasco",
        descricao:
          "Pão tradicional, maionese artesanal, contrafilé, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 26.9,
      },
      {
        nome: "X-Tudo",
        descricao:
          "Pão tradicional, maionese artesanal, filé de frango, linguiça calabresa, ovo frito, bacon, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 32.9,
        destaque: true,
      },
    ],
  },
  {
    id: "especiais",
    nome: "Especiais",
    chamada: "Os reforçados da casa, com carne mais alta.",
    itens: [
      { nome: "Especial Salada", descricao: null, preco: 27.9 },
      { nome: "Especial Egg", descricao: null, preco: 28.9 },
      { nome: "Especial Bacon", descricao: null, preco: 30.9, destaque: true },
    ],
  },
  {
    id: "combos",
    nome: "Combos",
    chamada: "Para dividir na mesa.",
    itens: [
      { nome: "Combo individual", descricao: "Burger, porção de batata e bebida.", preco: 33.9 },
      { nome: "Combo infantil", descricao: null, preco: 20.9 },
      { nome: "Combo para dois", descricao: "Dois burgers e uma porção para dividir.", preco: 66.9 },
    ],
  },
  {
    id: "porcoes",
    nome: "Porções",
    chamada: null,
    itens: [
      { nome: "Batata com cheddar e bacon", descricao: null, preco: 28.9, destaque: true },
      { nome: "Anéis de cebola", descricao: null, preco: 23.9 },
      { nome: "Batata frita", descricao: null, preco: 18.9 },
    ],
  },
];

// ─────────────────────────────────────────────────────────── como pedir

export const canais = [
  {
    id: "loja",
    numero: "01",
    titulo: "Loja online",
    texto:
      "Monta o pedido do seu jeito, escolhe o pagamento e acompanha a entrega.",
    acao: "Compre aqui",
  },
  {
    id: "whatsapp",
    numero: "02",
    titulo: "WhatsApp",
    texto:
      "Prefere falar com gente? Chama no número da casa e a gente monta junto.",
    acao: "Pedir no WhatsApp",
  },
  {
    id: "salao",
    numero: "03",
    titulo: "No salão",
    texto: "Mesa posta, lanche saindo da chapa na sua frente. Chega e senta.",
    acao: "Como chegar",
  },
] as const;

// ─────────────────────────────────────────────────────────── seções de texto

export const sobre = {
  titulo: "A chapa é o método",
  paragrafos: [
    "Carne prensada na chapa quente, pão tradicional tostado na manteiga e a maionese que a gente faz aqui dentro. Nada de esquentar o que já estava pronto: o seu lanche começa a existir quando o pedido entra.",
    "O salão é grande, coberto e sem frescura — mesa de madeira, luz baixa e espaço para a mesa inteira sentar junto.",
  ],
} as const;

// ─────────────────────────────────────────────────────────── fotos

export type Foto = {
  src: string;
  /** Descreve o que se vê, para leitor de tela. */
  alt: string;
  /** Legenda visível. `null` = a foto fala sozinha. */
  legenda: string | null;
  largura: number;
  altura: number;
};

/**
 * Fotos reais da casa (setembro/2026). As legendas descrevem o que aparece na
 * imagem — de propósito não amarram a foto a um item do cardápio, porque a
 * correspondência exata não foi confirmada com os donos.
 */
export const galeria: Foto[] = [
  {
    src: "/img/burger-salada.webp",
    alt: "Hambúrguer com alface, tomate, cebola roxa e queijo derretido, segurado na mão",
    legenda: null,
    largura: 1200,
    altura: 1600,
  },
  {
    src: "/img/burger-onion.webp",
    alt: "Hambúrguer coberto por anéis de cebola empanados e cheddar",
    legenda: null,
    largura: 1200,
    altura: 1600,
  },
  {
    src: "/img/burger-bacon.webp",
    alt: "Hambúrguer com fatias de bacon crocante e queijo derretido",
    legenda: null,
    largura: 960,
    altura: 1280,
  },
  {
    src: "/img/burger-ovo.webp",
    alt: "Hambúrguer com ovo, queijo e cebola roxa",
    legenda: null,
    largura: 1200,
    altura: 1600,
  },
  {
    src: "/img/combo-quarteto.webp",
    alt: "Bandeja com quatro hambúrgueres, batata com cheddar e bacon e anéis de cebola",
    legenda: "Para dividir na mesa",
    largura: 1200,
    altura: 1600,
  },
  {
    src: "/img/porcao-fritas-cheddar.webp",
    alt: "Porção de batata frita coberta com cheddar e bacon, com molho ao lado",
    legenda: "Batata com cheddar e bacon",
    largura: 1100,
    altura: 1467,
  },
  {
    src: "/img/porcao-onion-rings.webp",
    alt: "Porção de anéis de cebola empanados servidos em cesto, com molho",
    legenda: "Anéis de cebola",
    largura: 1100,
    altura: 1467,
  },
  {
    src: "/img/combo-trio.webp",
    alt: "Bandeja com três hambúrgueres, batata com cheddar e anéis de cebola",
    legenda: null,
    largura: 1200,
    altura: 1600,
  },
];

/** Fotos do salão. */
export const fotosSalao: Foto[] = [
  {
    src: "/img/salao-amplo.webp",
    alt: "Salão coberto por tenda, com mesas e cadeiras de madeira escura",
    legenda: null,
    largura: 720,
    altura: 1280,
  },
  {
    src: "/img/salao-mesas.webp",
    alt: "Mesas do salão vistas de perto, com o cardápio impresso no tampo",
    legenda: null,
    largura: 720,
    altura: 1280,
  },
  {
    src: "/img/salao-tenda.webp",
    alt: "Vista do interior da tenda com luzes penduradas acesas",
    legenda: null,
    largura: 720,
    altura: 1280,
  },
];

/** Uma peça do rotativo do topo: vídeo em laço ou foto. */
export type MidiaHero =
  | { tipo: "video"; src: string; poster: string; alt: string; segundos: number }
  | { tipo: "foto"; src: string; alt: string; segundos: number };

/**
 * Rodízio do topo. Alterna vídeo e foto para o topo nunca ficar parado —
 * a duração de cada peça vem daqui, e vídeo pede mais tempo que foto.
 */
export const midiasHero: MidiaHero[] = [
  {
    tipo: "video",
    src: "/video/burger.mp4",
    poster: "/img/burger-video-poster.webp",
    alt: "Hambúrguer com alface, tomate e cebola roxa servido no prato, no salão da casa",
    segundos: 8,
  },
  {
    tipo: "foto",
    src: "/img/burger-onion.webp",
    alt: "Hambúrguer coberto por anéis de cebola empanados e cheddar",
    segundos: 4,
  },
  {
    tipo: "foto",
    src: "/img/combo-quarteto.webp",
    alt: "Bandeja com quatro hambúrgueres, batata com cheddar e bacon e anéis de cebola",
    segundos: 4,
  },
  {
    tipo: "video",
    src: "/video/salao.mp4",
    poster: "/img/salao-video-poster.webp",
    alt: "Panorâmica do salão coberto, com mesas de madeira escura e luzes acesas",
    segundos: 7,
  },
  {
    tipo: "foto",
    src: "/img/burger-bacon.webp",
    alt: "Hambúrguer com fatias de bacon crocante e queijo derretido",
    segundos: 4,
  },
  {
    tipo: "foto",
    src: "/img/porcao-fritas-cheddar.webp",
    alt: "Porção de batata frita coberta com cheddar e bacon, com molho ao lado",
    segundos: 4,
  },
];
