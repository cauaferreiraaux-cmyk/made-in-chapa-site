import type { Metadata } from "next";
import { Anton, Space_Grotesk } from "next/font/google";
import { marca } from "@/conteudo/site";
import { URL_SITE } from "@/lib/links";
import "./globals.css";

// Anton: display condensada, um peso só — conversa com o "HAMBURGUERIA"
// em caixa alta do logo. Space Grotesk: corpo com caráter, sem virar Inter.
const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Space_Grotesk({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITE),
  title: `${marca.nome} · ${marca.categoria}`,
  description: marca.resumo,
  openGraph: {
    title: `${marca.nome} · ${marca.categoria}`,
    description: marca.resumo,
    type: "website",
    locale: "pt_BR",
    siteName: marca.nome,
    url: URL_SITE,
    // Sem isto, quem compartilha o link no WhatsApp vê o favicon minúsculo no
    // lugar de uma imagem — era o que estava acontecendo.
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${marca.nome} — hambúrguer artesanal feito na chapa`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${marca.nome} · ${marca.categoria}`,
    description: marca.resumo,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable}`}>
      <body>
        {/* Sem JavaScript o observador nunca revela nada — este estilo garante
            que a página apareça inteira em vez de ficar em branco. */}
        <noscript>
          <style>{`.revelar{opacity:1 !important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
