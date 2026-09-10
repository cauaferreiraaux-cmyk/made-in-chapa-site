#!/usr/bin/env bash
# Publica o site estático na VPS.
#
# Roda daqui, não da VPS: builda local e manda a pasta out/ por rsync. Não
# reinicia serviço nenhum — o nginx serve arquivo do disco.
#
#   VPS_HOST=... VPS_USER=root ./deploy/publicar.sh
set -euo pipefail

VPS_HOST="${VPS_HOST:-74.50.69.234}"
VPS_USER="${VPS_USER:-root}"
DESTINO="${DESTINO:-/var/www/madeinchapa-site}"

raiz="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$raiz"

echo "==> Verificando antes de publicar"
npx tsc --noEmit
npx eslint .

echo "==> Build"
rm -rf out
npm run build

if [ ! -f out/index.html ]; then
  echo "ERRO: out/index.html não existe — o build não gerou o site." >&2
  exit 1
fi

echo "==> Enviando para ${VPS_USER}@${VPS_HOST}:${DESTINO}"
# --delete remove do servidor o que saiu do build; o -i lista o que mudou.
rsync -rlvzi --delete --chmod=D755,F644 out/ "${VPS_USER}@${VPS_HOST}:${DESTINO}/"

echo "==> Publicado. Abra o site e USE o fluxo que você mudou."
