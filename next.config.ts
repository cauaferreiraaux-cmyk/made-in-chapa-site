import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta out/, que vai por rsync para o
  // nginx da VPS. Sem processo Node no ar — não disputa RAM com o financeiro.
  output: "export",
  // Exigido pelo export: o otimizador de imagem do Next precisa de servidor.
  images: { unoptimized: true },
  // /pagina -> /pagina/index.html, que é como o nginx serve sem regra extra.
  trailingSlash: true,
  // Só vale em `next dev`: sem isso o Next bloqueia os pedidos do servidor de
  // desenvolvimento vindos de outro host, e testar no celular pela rede local
  // quebra. Não tem efeito nenhum no site publicado.
  allowedDevOrigins: ["192.168.68.110", "*.local"],
};

export default nextConfig;
