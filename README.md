# Site Made in Chapa

Site institucional da hamburgueria: cardápio, fotos, salão e os caminhos para pedir
(loja online, WhatsApp e balcão). Página única, estática, sem backend.

Não confundir com o **sistema financeiro** (`../made-in-chapa-v2`), que é outro produto,
outro repositório e outro domínio.

## Rodar

```bash
npm install
npm run dev -- --port 3100
```

A porta 3100 é proposital: a 3000 costuma estar ocupada pelo dev do sistema financeiro.

Não há `.env` — o site não fala com banco nem com serviço externo. Todo o conteúdo está
em [`conteudo/site.ts`](./conteudo/site.ts).

## Verificar antes de publicar

```bash
npx tsc --noEmit
npx eslint .
npm run build
```

## Publicar na VPS

O site é estático: `npm run build` gera `out/`, que é copiado para a VPS por `rsync`.
**Não sobe processo Node** — não disputa memória com o sistema financeiro, e se o site
sair do ar o financeiro nem sente.

```bash
./deploy/publicar.sh
```

Primeira vez (nginx + certificado), ver [`deploy/README.md`](./deploy/README.md).

## Estrutura

```
conteudo/site.ts   ← TODO o texto, preço, foto e contato. Comece por aqui.
lib/links.ts       ← montagem dos links (WhatsApp, mapa)
components/        ← uma seção por arquivo
app/globals.css    ← paleta e tipografia da marca
public/img/        ← fotos (webp)
public/video/      ← vídeos do rodízio do topo (mp4, sem áudio)
public/marca/      ← logo em svg
deploy/            ← nginx e script de publicação
PENDENTE.md        ← o que ainda falta de conteúdo real
```

## Decisões

- **Estático, não servidor.** O site não tem nada dinâmico; export estático é mais barato,
  mais rápido e não acrescenta um processo para cuidar na VPS.
- **Dado que não existe não é inventado.** Campo `null` não vira placeholder na tela:
  simplesmente não é desenhado. Os preços são a exceção, consciente e assumida pelo
  cliente: são de exemplo enquanto `PRECOS_SAO_EXEMPLO` for `true`, e desde 10/09/2026
  a tela não avisa mais isso (o aviso foi retirado a pedido). Ver `PENDENTE.md`.
- **A paleta veio do material impresso da casa** (cardápio preto, logo branco), não de
  gosto pessoal. O acento amarelo é a luz da tenda do salão.
- **Sem biblioteca de UI.** São nove componentes; um design system aqui pesaria mais do
  que ajudaria.
