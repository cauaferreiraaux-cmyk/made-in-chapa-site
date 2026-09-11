# O que falta preencher

Tudo abaixo mora em **[`conteudo/site.ts`](./conteudo/site.ts)** — um arquivo só,
sem tocar em componente. Campo `null` não é desenhado na tela: nada de "a definir"
indo ao ar.

## 1. Conferir dois pontos do cardápio

Nomes, descrições e preços vieram do **cardápio impresso da própria casa** (foto
de 10/09/2026), então o grosso está certo. Sobram duas pontas:

- **porções e bebidas não aparecem no cardápio impresso.** Os valores no site
  vêm do canal de pedidos online da loja; batata frita (R$ 17,90), onion rings
  (R$ 14,90) e nuggets (R$ 12,90) não têm valor publicado em lugar nenhum e
  foram definidos pelo cliente;
- **o X-Egg saiu.** Ele existia no canal online, mas não está no cardápio
  impresso novo — só é citado como item do Combo Família. Ficou de fora dos
  clássicos; se ainda for vendido, é só voltar com ele.

## 2. Menores

- `empresa.razaoSocial` e `empresa.cnpj` — rodapé.
- `URL_SITE` em [`lib/links.ts`](./lib/links.ts) — domínio definitivo, só afeta o link
  de compartilhamento.
- Foto por item do cardápio: hoje as fotos vivem numa galeria sem amarrar foto a item,
  porque a correspondência exata não foi confirmada.

## Já resolvido

- **Cardápio real** — nomes, descrições e preços do cardápio impresso da casa
  (10/09/2026). São 36 itens em seis categorias, e nenhum item fica sem preço.
- **Endereço** — Av. Ulysses Borges de Siqueira, 89, Braz Cubas, Mogi das Cruzes/SP,
  CEP 08740-540. O botão "como chegar" leva ao mapa.
- **Horários** — seg a qui 18:30–01:30, sex e sáb 19:00–02:00, dom 18:00–01:00.
  O selo "aberto agora" está ligado; `npm run testa:horarios` cobre as viradas
  de meia-noite.
- **iFood** — decidido não entrar no site.
