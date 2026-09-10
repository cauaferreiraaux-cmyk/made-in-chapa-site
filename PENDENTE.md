# O que falta preencher

Tudo abaixo mora em **[`conteudo/site.ts`](./conteudo/site.ts)** — um arquivo só,
sem tocar em componente. Campo `null` não é desenhado na tela: nada de "a definir"
indo ao ar.

## 1. Horários de funcionamento — única pendência que aparece na tela

`horarios` está `null`. Enquanto isso, o cartão "Horário" manda o visitante para o
Instagram da casa.

Preenchendo, **o selo "aberto agora / fechado agora" liga sozinho** no topo do site,
inclusive com faixa que passa da meia-noite (`abre: "18:00"`, `fecha: "01:00"`).

## 2. Conferir o cardápio com os donos

Preços e descrições vieram do **canal de pedidos da própria casa**, consultado em
10/09/2026 — não são invenção nem leitura de foto. Ainda assim vale a conferida:

- a loja estava marcada como offline no momento da consulta, então algum valor pode
  estar desatualizado;
- **Batata frita, Onion rings e Nuggets** não têm preço publicado na listagem e por
  isso aparecem sem preço no site;
- havia um "Especial Combo Kids" com dois valores diferentes em categorias
  diferentes (R$ 30,00 e R$ 36,99). Ficou o de R$ 30,00, que é o da categoria de
  combo infantil;
- promoções sazonais (era Dia dos Pais) ficaram de fora de propósito — promoção com
  data vence e fica mentindo no site.

## 3. Menores

- `empresa.razaoSocial` e `empresa.cnpj` — rodapé.
- `URL_SITE` em [`lib/links.ts`](./lib/links.ts) — domínio definitivo, só afeta o link
  de compartilhamento.
- Foto por item do cardápio: hoje as fotos vivem numa galeria sem amarrar foto a item,
  porque a correspondência exata não foi confirmada.

## Já resolvido

- **Preços e descrições reais** — vieram do canal de pedidos da casa (10/09/2026).
- **Endereço** — Av. Ulysses Borges de Siqueira, 89, Braz Cubas, Mogi das Cruzes/SP,
  CEP 08740-540. O botão "como chegar" leva ao mapa.
- **iFood** — decidido não entrar no site.
