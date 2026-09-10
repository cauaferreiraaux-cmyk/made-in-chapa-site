# O que falta preencher

Tudo abaixo mora em **[`conteudo/site.ts`](./conteudo/site.ts)** — um arquivo só,
sem tocar em componente. Campo `null` não é desenhado na tela: nada de "a definir"
indo ao ar.

## 1. Preços — prioridade máxima

Os preços que estão no site são **inventados** e, desde 10/09/2026, **a tela não
avisa mais isso** — o aviso amarelo foi retirado a pedido do cliente. Quem abrir o
site vai ler esses valores como se fossem os reais.

Os preços impressos no cardápio da mesa não tinham resolução para leitura na foto
(tentei correção de perspectiva e ampliação; continuou ilegível).

Ao receber a tabela real:

1. troque os números em `cardapio`;
2. mude `PRECOS_SAO_EXEMPLO` para `false`.

**Enquanto isso não acontecer, este é o item que mais pesa se o site for divulgado.**

## 2. Nomes e descrições — conferir

Vieram da leitura da foto do cardápio da mesa. Legíveis com confiança razoável, mas
**não confirmados pelos donos**:

- Clássicos: X-Burger, X-Salada, X-Bacon, X-Egg, X-Frango, X-Calabresa, X-Churrasco, X-Tudo
- Especiais: os nomes saíram parciais na foto (há mais itens do que os três listados)
- Combos e porções: os itens no site são plausíveis, **não lidos** — confirmar antes de publicar

Descrição só existe para X-Frango, X-Calabresa, X-Churrasco e X-Tudo; as demais estão
`null` e simplesmente não aparecem.

## 3. Endereço do salão

`endereco` está `null`. Sem ele, a seção "Onde estamos" mostra um texto pedindo contato
pelo WhatsApp e o cartão "No salão" fica sem o botão "como chegar".

## 4. Horários de funcionamento

`horarios` está `null`. Preenchendo, **o selo "aberto agora / fechado agora" liga sozinho**
no topo — inclusive com faixa que passa da meia-noite (`abre: "18:00"`, `fecha: "01:00"`).

## 5. Menores

- `contato.ifoodUrl` — a casa vende pelo iFood (o sistema financeiro tem esse canal), mas o
  link não foi passado. Com ele, dá para acrescentar um quarto caminho em "Como pedir".
- `empresa.razaoSocial` e `empresa.cnpj` — rodapé.
- `URL_SITE` em [`lib/links.ts`](./lib/links.ts) — domínio definitivo, só afeta o link de
  compartilhamento.
- Foto de cada item do cardápio: hoje as fotos vivem numa galeria sem amarrar foto a item,
  porque a correspondência exata não foi confirmada.
