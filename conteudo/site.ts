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
 * Cardápio oficial da casa, com os preços e as descrições publicados pela
 * própria loja no seu canal de pedidos (consultado em 10/09/2026).
 *
 * Item sem preço aqui é item cujo valor a loja não publica na listagem — a tela
 * mostra o item sem preço, nunca um número inventado.
 */
export const cardapio: CategoriaCardapio[] = [
  {
    id: "tradicionais",
    nome: "Burgers tradicionais",
    chamada: "Hambúrguer artesanal de 150g e a maionese tradicional da casa.",
    itens: [
      {
        nome: "X-Burguer",
        descricao:
          "Hambúrguer artesanal de carne 150g coberto por queijo derretido e a maionese tradicional da casa.",
        preco: 20,
      },
      {
        nome: "X-Salada",
        descricao:
          "Hambúrguer artesanal de carne 150g, queijo derretido, maionese da casa e salada fresca (cebola, tomate e alface).",
        preco: 24,
      },
      {
        nome: "X-Egg",
        descricao:
          "Hambúrguer artesanal de carne 150g, queijo derretido, ovo frito estrelado, maionese da casa e salada fresca (cebola roxa, alface e tomate).",
        preco: 25,
      },
      {
        nome: "X-Bacon",
        descricao:
          "Hambúrguer artesanal de carne 150g, queijo derretido, maionese da casa, tiras de bacon e salada fresca (cebola roxa, tomate e alface).",
        preco: 26,
        destaque: true,
      },
      {
        nome: "X-Frango",
        descricao:
          "Filé de frango coberto por queijo derretido, maionese da casa e salada fresca (cebola roxa, tomate e alface).",
        preco: 24,
      },
      {
        nome: "X-Calabresa",
        descricao:
          "Fatias de linguiça calabresa cobertas por queijo derretido, maionese da casa e salada fresca (cebola roxa, tomate e alface).",
        preco: 24,
      },
      {
        nome: "X-Churrasco",
        descricao:
          "Bife de contrafilé coberto por queijo derretido, maionese da casa e salada fresca (cebola roxa, tomate e alface).",
        preco: 35,
      },
      {
        nome: "X-Tudo",
        descricao:
          "Hambúrguer artesanal 150g, presunto e queijo muçarela, filé de frango, linguiça calabresa, ovo frito, tiras de bacon, maionese da casa e salada fresca (cebola roxa, tomate e alface).",
        preco: 50,
        destaque: true,
      },
      {
        nome: "Hot Dog",
        descricao:
          "Pão médio, salsicha, maionese da casa, purê de batata, bacon, ketchup e mostarda, batata palha e salada fresca (alface e tomate).",
        preco: 22,
      },
    ],
  },
  {
    id: "gourmet",
    nome: "Burgers gourmet",
    chamada: "Carne de 180g, queijo cheddar e o molho verde da casa.",
    itens: [
      {
        nome: "Especial Double Cheddar",
        descricao:
          "Hambúrguer artesanal de 180g coberto por duas fatias de cheddar, molho verde da casa e anéis de cebola roxa.",
        preco: 30,
      },
      {
        nome: "Especial Bacon Barbecue",
        descricao:
          "Hambúrguer artesanal de 180g, cheddar, tiras de bacon, anéis de cebola roxa, molho verde da casa e molho barbecue.",
        preco: 35,
        destaque: true,
      },
      {
        nome: "Especial Onion Barbecue",
        descricao:
          "Hambúrguer artesanal de 180g, cheddar, três anéis de cebola empanados, cebola roxa, molho barbecue e maionese verde da casa.",
        preco: 31,
      },
      {
        nome: "Especial Egg",
        descricao:
          "Hambúrguer artesanal de 180g, cheddar, maionese verde da casa, ovo frito e anéis de cebola roxa.",
        preco: 33,
      },
      {
        nome: "Especial Salada",
        descricao:
          "Hambúrguer artesanal de 180g, cheddar, maionese verde da casa e salada fresca (cebola roxa, tomate e alface).",
        preco: 31,
      },
      {
        nome: "Especial Catupiry",
        descricao:
          "Hambúrguer artesanal de 180g coberto por Catupiry, maionese verde da casa e cebola roxa.",
        preco: 45.99,
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
          "1 X-Salada, 1 X-Bacon, porção de fritas com cheddar e bacon, anéis de cebola empanados e 1 refrigerante de 600 ml.",
        preco: 65,
      },
      {
        nome: "Combo Trio",
        descricao:
          "1 X-Salada, 1 X-Bacon, 1 X-Burguer, porção de fritas com cheddar e bacon, anéis de cebola empanados e 1 refrigerante de 2 litros.",
        preco: 75,
        destaque: true,
      },
      {
        nome: "Combo Família",
        descricao:
          "1 X-Salada, 1 X-Bacon, 1 X-Burguer, 1 X-Egg, porção de fritas com cheddar e bacon, anéis de cebola empanados e 1 refrigerante de 2 litros.",
        preco: 85,
      },
      {
        nome: "Combo Kids",
        descricao: "X-Burguer, batata de 150g e bebida de 200 ml.",
        preco: 30,
      },
      { nome: "2 X-Bacon + bebida 2 L", descricao: null, preco: 58 },
      { nome: "3 X-Bacon + bebida 2 L", descricao: null, preco: 92 },
      { nome: "4 X-Bacon + bebida 2 L", descricao: null, preco: 118 },
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
        preco: null,
      },
      {
        nome: "Onion rings",
        descricao: "Anéis de cebola empanados (12 unidades).",
        preco: null,
      },
      {
        nome: "Nuggets",
        descricao:
          "Nuggets de frango, crocantes por fora e suculentos por dentro (12 unidades).",
        preco: null,
      },
      {
        nome: "Porção churrasco",
        descricao:
          "Contrafilé, linguiça calabresa, frango, batata e anéis de cebola.",
        preco: 150,
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
