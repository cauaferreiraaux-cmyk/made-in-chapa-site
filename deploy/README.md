# Publicar o site na VPS

O site é estático. Ele mora na **mesma VPS do sistema financeiro**
(InterServer, `74.50.69.234`) sem concorrer com ele: não há processo Node, não há
porta, não há systemd. O nginx serve arquivos de `/var/www/madeinchapa-site`.

Se o site cair, o financeiro continua no ar — e vice-versa.

## Primeira vez (uma vez só, como root na VPS)

```bash
# 1. pasta do site
mkdir -p /var/www/madeinchapa-site
chown -R www-data:www-data /var/www/madeinchapa-site

# 2. server block (troque DOMINIO pelo domínio real)
sed 's/DOMINIO/madeinchapa.com.br/g' nginx.conf > /etc/nginx/sites-available/madeinchapa-site
ln -sf /etc/nginx/sites-available/madeinchapa-site /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 3. certificado (só depois de o DNS já apontar para a VPS)
certbot --nginx -d madeinchapa.com.br -d www.madeinchapa.com.br
```

### Antes do certbot: o DNS

Registro A do domínio apontando para `74.50.69.234`.

> **Gotcha do Registro.br já conhecido deste projeto:** o painel em modo avançado só
> publica a zona ao clicar **ADICIONAR** e depois **SALVAR ALTERAÇÕES** — e durante a
> janela de transição de 2h a publicação fica bloqueada. Sem a zona publicada, o
> `certbot` falha.

## Dia a dia

Da sua máquina:

```bash
./deploy/publicar.sh
```

Ele roda typecheck, lint e build, e só então envia. Depois de publicar, **abra o site e
use** — build verde não é o mesmo que site funcionando.

## Reverter

O conteúdo anterior não fica guardado no servidor. Para voltar: `git checkout` do commit
bom e `./deploy/publicar.sh` de novo. Como o build é reproduzível e leva segundos, isso é
mais simples do que manter cópias no servidor.
