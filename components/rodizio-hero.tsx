"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const caixaRef = useRef<HTMLDivElement>(null);

  /**
   * Manda tocar o vídeo da peça ativa.
   *
   * O atributo `autoplay` sozinho não basta no iPhone: em Modo de Baixo
   * Consumo o iOS recusa a reprodução automática, e o vídeo fica parado com o
   * botão nativo por cima. Chamar play() na troca de peça e de novo no
   * primeiro toque da pessoa recupera na maioria dos casos — e quando o
   * sistema recusa mesmo, o poster continua ali, então nunca fica um buraco.
   */
  const tocarAtivo = useCallback(() => {
    const caixa = caixaRef.current;
    if (!caixa) return;

    caixa.querySelectorAll("video").forEach((video, indice) => {
      if (indice === atual) {
        const tentativa = video.play();
        // navegador que recusa devolve promessa rejeitada; ignorar é o certo
        if (tentativa) tentativa.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [atual]);

  useEffect(() => {
    tocarAtivo();
  }, [tocarAtivo]);

  // Primeiro gesto na página: o iOS passa a permitir o que recusou antes.
  useEffect(() => {
    const aoTocar = () => tocarAtivo();
    window.addEventListener("touchstart", aoTocar, { once: true, passive: true });
    window.addEventListener("click", aoTocar, { once: true });
    return () => {
      window.removeEventListener("touchstart", aoTocar);
      window.removeEventListener("click", aoTocar);
    };
  }, [tocarAtivo]);

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
      ref={caixaRef}
      className="relative size-full overflow-hidden bg-carvao-2 lg:aspect-9/14 lg:h-auto lg:border lg:border-borda"
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
                preload={indice === 0 ? "auto" : "metadata"}
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
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-gradient-to-t from-carvao to-transparent lg:block"
        aria-hidden
      />

      {/* Barras de posição, dentro do quadro — antes era uma etiqueta solta
          que sangrava para fora do container. */}
      <div className="absolute inset-x-0 bottom-0 z-20 hidden items-center gap-2 px-5 pb-6 lg:flex lg:px-4 lg:pb-4">
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
