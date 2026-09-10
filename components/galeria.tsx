"use client";

import { useCallback, useEffect, useState } from "react";
import { galeria } from "@/conteudo/site";
import { IconeSeta } from "./icones";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

/**
 * Fotos da casa em grade uniforme.
 *
 * Todos os quadros têm o mesmo tamanho e a MESMA proporção das fotos originais
 * (retrato 3:4) — é isso que garante que nada seja cortado. Forçar paisagem
 * cortava o topo e a base de cada lanche.
 *
 * Clicar abre a foto inteira em tela cheia, aí sim sem recorte nenhum.
 */
export function Galeria() {
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const navegar = useCallback((passo: 1 | -1) => {
    setAberta((atual) => {
      if (atual === null) return atual;
      return (atual + passo + galeria.length) % galeria.length;
    });
  }, []);

  useEffect(() => {
    if (aberta === null) return;

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") fechar();
      if (evento.key === "ArrowRight") navegar(1);
      if (evento.key === "ArrowLeft") navegar(-1);
    };

    // Trava a rolagem do fundo enquanto a foto está aberta.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberta, fechar, navegar]);

  if (galeria.length === 0) return null;

  const foto = aberta === null ? null : galeria[aberta];

  return (
    <section id="fotos" className="relative isolate scroll-mt-24 py-16 sm:py-28">
      <div className="halo top-10 -right-48" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <TituloSecao
            olho="Os lanches"
            titulo={
              <>
                Sem <span className="text-brasa">retoque</span>
              </>
            }
            chamada="Foto do que sai da chapa aqui, no salão da casa. Clique para ver de perto."
          />
        </Revelar>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {galeria.map((item, indice) => (
            <Revelar key={item.src} atraso={(indice % 4) * 80}>
              <button
                type="button"
                onClick={() => setAberta(indice)}
                aria-label={`Ampliar foto: ${item.alt}`}
                className="group relative block aspect-3/4 w-full cursor-zoom-in overflow-hidden border border-borda bg-carvao-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.largura}
                  height={item.altura}
                  loading={indice < 4 ? "eager" : "lazy"}
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.legenda && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carvao via-carvao/70 to-transparent p-3 pt-10 text-left">
                    <span className="display text-base text-osso sm:text-lg">
                      {item.legenda}
                    </span>
                  </span>
                )}
              </button>
            </Revelar>
          ))}
        </div>
      </div>

      {foto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={foto.alt}
          onClick={fechar}
          className="fixed inset-0 z-60 flex items-center justify-center bg-carvao/95 p-4 backdrop-blur-sm sm:p-8"
        >
          {/* object-contain: aqui a foto aparece inteira, sem cortar nada */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={foto.src}
            alt={foto.alt}
            width={foto.largura}
            height={foto.altura}
            onClick={(evento) => evento.stopPropagation()}
            // w-auto/h-auto para a caixa ficar do tamanho exato da foto: se ela
            // sobrar, o clique na área vazia não fecharia o visualizador.
            className="h-auto max-h-[86vh] w-auto max-w-full object-contain"
          />

          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="absolute top-4 right-4 flex size-12 items-center justify-center border border-borda text-osso transition-colors hover:border-brasa hover:text-brasa sm:top-6 sm:right-6"
          >
            <span aria-hidden className="text-2xl leading-none">
              ×
            </span>
          </button>

          {galeria.length > 1 && (
            <>
              <button
                type="button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  navegar(-1);
                }}
                aria-label="Foto anterior"
                className="absolute left-2 flex size-12 items-center justify-center border border-borda bg-carvao/70 text-osso transition-colors hover:border-brasa hover:text-brasa sm:left-6"
              >
                <IconeSeta className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={(evento) => {
                  evento.stopPropagation();
                  navegar(1);
                }}
                aria-label="Próxima foto"
                className="absolute right-2 flex size-12 items-center justify-center border border-borda bg-carvao/70 text-osso transition-colors hover:border-brasa hover:text-brasa sm:right-6"
              >
                <IconeSeta className="size-5" />
              </button>
            </>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-fumaca tabular-nums">
            {(aberta ?? 0) + 1} / {galeria.length}
          </p>
        </div>
      )}
    </section>
  );
}
