@AGENTS.md

# Site Made in Chapa

Site institucional (vitrine) da hamburgueria. **Não é** o sistema financeiro —
esse é `../made-in-chapa-v2`, outro repositório, outro domínio, e as duas coisas
não se misturam.

## Comandos

```bash
npm run dev -- --port 3100   # a 3000 costuma estar com o dev do financeiro
npx tsc --noEmit && npx eslint . && npm run build
./deploy/publicar.sh         # build + rsync para a VPS
```

## Regras deste repo

- **Conteúdo só em `conteudo/site.ts`.** Texto, preço, foto, telefone: tudo ali,
  tipado. Componente não tem string de conteúdo chumbada.
- **Campo `null` não vira placeholder.** A seção some ou muda de texto, mas não
  aparece "a definir" na tela. O que falta está em `PENDENTE.md`.
- **Preço é dado da casa, não chute.** Os valores vieram do cardápio impresso da
  própria hamburgueria (10/09/2026). Item sem preço publicado fica com `preco: null`
  e aparece sem valor — nunca um número inventado para "preencher".
- **Nada de iFood no site.** Decisão do cliente.
- **Sem backend.** `output: "export"`. Nada de Server Action, rota de API ou
  `cookies()` — o build quebra e é para quebrar mesmo.
- **Server Component por padrão.** `"use client"` só onde há estado ou observador:
  cabeçalho, rodízio do topo, abas do cardápio, selo de horário, botão flutuante.
- **Código em português**, como no resto da casa.
- **Imagem nova entra otimizada** (webp, ~1200px de largura). Não versione PNG de
  2 MB: o site inteiro hoje pesa menos que uma dessas.
