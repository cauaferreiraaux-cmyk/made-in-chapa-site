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
  /** `null` enquanto rua e número não forem confirmados. */
  logradouro: string | null;
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
    "Hambúrguer artesanal feito na chapa, na hora. Delivery e salão em Mogi das Cruzes.",
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
  /** PENDENTE — e-mail de contato, se houver. */
  email: null as string | null,
} as const;

/**
 * Endereço do salão, confirmado pelo cadastro do estabelecimento — o telefone
 * que vem junto dele é o mesmo impresso no cardápio da mesa.
 */
export const endereco: Endereco | null = {
  logradouro: "Av. Ulysses Borges de Siqueira, 89",
  bairro: "Braz Cubas",
  cidade: "Mogi das Cruzes",
  uf: "SP",
  cep: "08740-540",
  mapaUrl: null,
};

/**
 * Horários da casa. Todas as faixas viram a meia-noite (fecham depois das 00h),
 * e é isso que o selo "aberto agora" precisa tratar: fechar às 01:30 significa
 * que na madrugada de sexta ainda vale a faixa de quinta.
 */
export const horarios: FaixaHorario[] | null = [
  { rotulo: "Segunda a quinta", dias: [1, 2, 3, 4], abre: "18:30", fecha: "01:30" },
  { rotulo: "Sexta e sábado", dias: [5, 6], abre: "19:00", fecha: "02:00" },
  { rotulo: "Domingo", dias: [0], abre: "18:00", fecha: "01:00" },
];

/** PENDENTE — CNPJ e razão social, para o rodapé. */
export const empresa = {
  razaoSocial: null as string | null,
  cnpj: null as string | null,
} as const;

// ─────────────────────────────────────────────────────────── cardápio

/**
 * Cardápio da casa, lido do cardápio impresso que os donos usam (foto de
 * 10/09/2026). Nomes, descrições e preços são os deles.
 *
 * Duas exceções, ambas de itens que NÃO aparecem no impresso:
 * - porções e bebidas vêm do canal de pedidos online da própria loja;
 * - batata frita, onion rings e nuggets não têm valor publicado em lugar
 *   nenhum, e os preços deles foram definidos pelo cliente.
 */
export const cardapio: CategoriaCardapio[] = [
  {
    id: "classicos",
    nome: "Burgers clássicos",
    chamada: "Pão tradicional e hambúrguer artesanal de 160g.",
    itens: [
      {
        nome: "X-Burger",
        descricao:
          "Pão tradicional, hambúrguer artesanal 160g, queijo muçarela e a irresistível maionese da casa.",
        preco: 22,
      },
      {
        nome: "X-Salada",
        descricao:
          "Pão tradicional, maionese, hambúrguer artesanal 160g, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 26,
      },
      {
        nome: "X-Bacon",
        descricao:
          "Pão tradicional, maionese, hambúrguer artesanal 160g, queijo muçarela, bacon e salada fresca (cebola roxa, tomate e alface).",
        preco: 32,
        destaque: true,
      },
      {
        nome: "X-Frango",
        descricao:
          "Pão tradicional, maionese artesanal, filé de frango, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 26,
      },
      {
        nome: "X-Calabresa",
        descricao:
          "Pão tradicional, maionese artesanal, linguiça calabresa, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 26,
      },
      {
        nome: "X-Churrasco",
        descricao:
          "Pão tradicional, maionese artesanal, contrafilé, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 38,
      },
      {
        nome: "X-Tudo",
        descricao:
          "Pão tradicional, maionese artesanal, filé de frango, linguiça calabresa, ovo frito, bacon, queijo muçarela e salada fresca (cebola roxa, tomate e alface).",
        preco: 55,
        destaque: true,
      },
    ],
  },
  {
    id: "gourmet",
    nome: "Burgers gourmet",
    chamada: "Pão de brioche, maionese verde da casa e carne de 160g.",
    itens: [
      {
        nome: "Especial Catupiry",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, catupiry e cebola roxa.",
        preco: 32,
      },
      {
        nome: "Especial Double Cheddar",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, queijo cheddar, molho cheddar e cebola roxa.",
        preco: 32,
      },
      {
        nome: "Especial Bacon Barbecue",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, queijo cheddar, molho barbecue, bacon e cebola roxa.",
        preco: 36,
        destaque: true,
      },
      {
        nome: "Especial Onion Barbecue",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, queijo cheddar, onion rings, molho barbecue e cebola roxa.",
        preco: 34,
      },
      {
        nome: "Especial Egg",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, queijo cheddar, ovo frito e cebola roxa.",
        preco: 34,
      },
      {
        nome: "Especial Salada",
        descricao:
          "Pão de brioche, maionese verde, hambúrguer artesanal 160g, queijo cheddar e salada fresca (cebola roxa, tomate e alface).",
        preco: 33,
      },
    ],
  },
  {
    id: "hotdogs",
    nome: "Hot dogs",
    chamada: null,
    itens: [
      {
        nome: "Hot dog simples",
        descricao:
          "Pão médio, 1 salsicha, maionese artesanal, tomate, ketchup, mostarda, alface e batata palha.",
        preco: 17,
      },
      {
        nome: "Hot dog médio",
        descricao:
          "Pão médio, 1 salsicha, maionese artesanal, purê de batata, bacon, tomate, ketchup, mostarda, alface e batata palha.",
        preco: 22,
      },
      {
        nome: "Dogão",
        descricao:
          "Pão grande, 2 salsichas, maionese artesanal, purê de batata, bacon, tomate, ketchup, mostarda, alface e batata palha.",
        preco: 27,
        destaque: true,
      },
    ],
  },
  {
    id: "combos",
    nome: "Combos",
    chamada: "Para dividir na mesa.",
    itens: [
      {
        nome: "Combo Casal",
        descricao:
          "1 X-Bacon + 1 X-Salada, feitos no pão de brioche 300g com hambúrguer artesanal de 110g + batata com cheddar e bacon + onion rings + 1 bebida 1L.",
        preco: 75,
      },
      {
        nome: "Combo Trio",
        descricao:
          "1 X-Bacon + 1 X-Salada + 1 X-Burger, feitos no pão de brioche 300g com hambúrguer artesanal de 110g + batata com cheddar e bacon + onion rings + 1 bebida 2L.",
        preco: 85,
        destaque: true,
      },
      {
        nome: "Combo Família",
        descricao:
          "1 X-Bacon + 1 X-Salada + 1 X-Burger + 1 X-Egg, feitos no pão de brioche 300g com hambúrguer artesanal de 110g + batata com cheddar e bacon + onion rings + 1 bebida 2L.",
        preco: 95,
      },
      {
        nome: "Especial Combo Kids",
        descricao:
          "Pão de brioche 300g, hambúrguer artesanal 110g, maionese verde + 1 batata frita 150g + 1 lata 350ml.",
        preco: 35,
      },
      {
        nome: "X-Bacon + batata + lata",
        descricao:
          "Pão tradicional, maionese, hambúrguer artesanal 160g, queijo muçarela, bacon e salada fresca (cebola, tomate e alface) + 1 batata 150g + 1 lata 350ml.",
        preco: 46,
      },
      {
        nome: "Dog médio + batata + lata",
        descricao: "1 hot dog médio completo + 1 batata 150g + 1 lata 350ml.",
        preco: 38,
      },
      {
        nome: "2 médios + refri 1L",
        descricao: "2 hot dogs médios completos + 1 bebida 1L.",
        preco: 50,
      },
      {
        nome: "2 dogões + refri 1L",
        descricao: "2 dogões completos + 1 bebida 1L.",
        preco: 60,
      },
    ],
  },
  {
    id: "porcoes",
    nome: "Porções",
    chamada: "Todas acompanham um molho à sua escolha.",
    itens: [
      {
        nome: "Batata com cheddar e bacon",
        descricao: null,
        preco: 30,
        destaque: true,
      },
      {
        nome: "Batata frita",
        descricao: "Batata crinkle extremamente crocante (300g).",
        preco: 17.9,
      },
      {
        nome: "Onion rings",
        descricao: "Anéis de cebola empanados (12 unidades).",
        preco: 14.9,
      },
      {
        nome: "Nuggets",
        descricao:
          "Nuggets de frango, crocantes por fora e suculentos por dentro (12 unidades).",
        preco: 12.9,
      },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    chamada: null,
    itens: [
      { nome: "Coca-Cola lata 350 ml", descricao: null, preco: 7 },
      { nome: "Coca-Cola Zero lata 350 ml", descricao: null, preco: 7 },
      { nome: "Guaraná Antarctica lata 350 ml", descricao: null, preco: 7 },
      { nome: "Fanta Uva lata 350 ml", descricao: null, preco: 7 },
      { nome: "Sprite lata 310 ml", descricao: null, preco: 7 },
      { nome: "Coca-Cola 600 ml", descricao: null, preco: 9 },
      { nome: "Coca-Cola Zero 600 ml", descricao: null, preco: 8 },
      { nome: "Coca-Cola 2 litros", descricao: null, preco: 16 },
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
    src: "/video/chapa.mp4",
    poster: "/img/chapa-poster.webp",
    alt: "Lanche sendo montado na chapa: queijo derretendo sobre a carne, bacon e salada ao lado",
    segundos: 8,
  },
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
    tipo: "video",
    src: "/video/duplo.mp4",
    poster: "/img/duplo-poster.webp",
    alt: "Hambúrguer duplo com bacon servido no prato, na cozinha da casa",
    segundos: 7,
  },
  {
    tipo: "foto",
    src: "/img/porcao-fritas-cheddar.webp",
    alt: "Porção de batata frita coberta com cheddar e bacon, com molho ao lado",
    segundos: 4,
  },
];
