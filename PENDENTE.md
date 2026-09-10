# O que falta preencher

Tudo abaixo mora em **[`conteudo/site.ts`](./conteudo/site.ts)** — um arquivo só,
sem tocar em componente. Campo `null` não é desenhado na tela: nada de "a definir"
indo ao ar.

## 1. Confirmar os preços com os donos — prioridade

**Os preços no site não são os que a casa pratica.** Os nomes e as descrições sim,
vieram do canal de pedidos da própria loja (10/09/2026). Os valores foram alterados
a pedido: comida com R$ 6,00 de desconto e centavos em 90, bebidas com R$ 3,00 de
desconto. Exemplo: o X-Burguer da casa é R$ 20,00 e no site aparece R$ 14,90.

Nada na tela indica isso ao visitante, então enquanto o site não for divulgado tudo
bem — na hora de publicar, é o item que pesa.

Batata frita (R$ 17,90), onion rings (R$ 14,90) e nuggets (R$ 12,90) não têm
valor publicado pela loja: os preços do site foram definidos pelo cliente.

Sobre o cardápio em si, ainda vale conferir:

- a loja estava marcada como offline no momento da consulta, então algum valor pode
  estar desatualizado;
- havia um "Especial Combo Kids" com dois valores diferentes em categorias
  diferentes (R$ 30,00 e R$ 36,99). Ficou o de R$ 30,00, que é o da categoria de
  combo infantil;
- promoções sazonais (era Dia dos Pais) ficaram de fora de propósito — promoção com
  data vence e fica mentindo no site.

## 2. Menores

- `empresa.razaoSocial` e `empresa.cnpj` — rodapé.
- `URL_SITE` em [`lib/links.ts`](./lib/links.ts) — domínio definitivo, só afeta o link
  de compartilhamento.
- Foto por item do cardápio: hoje as fotos vivem numa galeria sem amarrar foto a item,
  porque a correspondência exata não foi confirmada.

## Já resolvido

- **Nomes e descrições reais** — vieram do canal de pedidos da casa (10/09/2026).
- **Endereço** — Av. Ulysses Borges de Siqueira, 89, Braz Cubas, Mogi das Cruzes/SP,
  CEP 08740-540. O botão "como chegar" leva ao mapa.
- **Horários** — seg a qui 18:30–01:30, sex e sáb 19:00–02:00, dom 18:00–01:00.
  O selo "aberto agora" está ligado; `npm run testa:horarios` cobre as viradas
  de meia-noite.
- **iFood** — decidido não entrar no site.
