import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta out/, que vai por rsync para o
  // nginx da VPS. Sem processo Node no ar — não disputa RAM com o financeiro.
  output: "export",
  // Exigido pelo export: o otimizador de imagem do Next precisa de servidor.
  images: { unoptimized: true },
  // /pagina -> /pagina/index.html, que é como o nginx serve sem regra extra.
  trailingSlash: true,
};

export default nextConfig;
