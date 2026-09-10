"use client";

import { useEffect, useState } from "react";
import { linkWhatsapp } from "@/lib/links";
import { IconeWhatsapp } from "./icones";

/**
 * Atalho de WhatsApp que acompanha a rolagem.
 *
 * Só aparece depois que o hero sai da tela — no primeiro quadro os botões
 * grandes já estão à vista e ele só atrapalharia.
 */
export function BotaoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > window.innerHeight * 0.8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <a
      href={linkWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir pelo WhatsApp"
      className={`fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-brasa text-carvao shadow-lg shadow-carvao/60 transition-all duration-300 hover:bg-brasa-viva sm:size-16 ${
        visivel
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <IconeWhatsapp className="size-7 sm:size-8" />
    </a>
  );
}
