"use client";

import { useEffect, useState } from "react";
import { midiasHero } from "@/conteudo/site";

/**
 * Rodízio do topo: alterna vídeos e fotos da casa.
 *
 * Todas as peças ficam montadas e empilhadas — só a opacidade muda. Trocar o
 * `src` de um <video> a cada volta recarregaria o arquivo e piscaria.
 * Quem prefere menos movimento fica na primeira peça, sem troca automática.
 */
export function RodizioHero() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    const semMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (semMovimento || pausado || midiasHero.length < 2) return;

    const tempo = setTimeout(
      () => setAtual((indice) => (indice + 1) % midiasHero.length),
      midiasHero[atual].segundos * 1000,
    );
    return () => clearTimeout(tempo);
  }, [atual, pausado]);

  return (
    <div
      className="relative aspect-9/14 w-full overflow-hidden border border-borda bg-carvao-2"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      {midiasHero.map((midia, indice) => {
        const ativa = indice === atual;

        return (
          <div
            key={midia.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              ativa ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!ativa}
          >
            {midia.tipo === "video" ? (
              <video
                className="size-full object-cover"
                src={midia.src}
                poster={midia.poster}
                autoPlay
                muted
                loop
                playsInline
                preload={indice === 0 ? "auto" : "none"}
                aria-label={midia.alt}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={midia.src}
                alt={midia.alt}
                className="size-full object-cover"
                loading={indice <= 1 ? "eager" : "lazy"}
                decoding="async"
              />
            )}
          </div>
        );
      })}

      {/* Escurece a base para os controles e a borda do quadro não sumirem. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-carvao to-transparent"
        aria-hidden
      />

      {/* Barras de posição, dentro do quadro — antes era uma etiqueta solta
          que sangrava para fora do container. */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-4">
        {midiasHero.map((midia, indice) => (
          <button
            key={midia.src}
            type="button"
            onClick={() => setAtual(indice)}
            aria-label={`Ver mídia ${indice + 1} de ${midiasHero.length}`}
            aria-current={indice === atual}
            className="group flex h-9 flex-1 cursor-pointer items-center"
          >
            <span
              className={`block h-0.5 w-full transition-colors ${
                indice === atual
                  ? "bg-brasa"
                  : "bg-osso/30 group-hover:bg-osso/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
