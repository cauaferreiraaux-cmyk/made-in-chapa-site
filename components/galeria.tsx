"use client";

import { useRef } from "react";
import { galeria } from "@/conteudo/site";
import { IconeSeta } from "./icones";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

/**
 * Carrossel das fotos da casa.
 *
 * A rolagem é a nativa do navegador com scroll-snap: funciona no dedo, no
 * trackpad e no teclado sem biblioteca nenhuma, e as setas só empurram essa
 * mesma rolagem. Todos os quadros têm o mesmo tamanho, em paisagem — as fotos
 * são verticais e entram recortadas pelo centro.
 */
export function Galeria() {
  const faixaRef = useRef<HTMLDivElement>(null);

  if (galeria.length === 0) return null;

  const deslizar = (sentido: 1 | -1) => {
    const faixa = faixaRef.current;
    if (!faixa) return;
    // um quadro por clique, medido no primeiro slide (o gap entra junto)
    const primeiro = faixa.firstElementChild as HTMLElement | null;
    const passo = primeiro ? primeiro.offsetWidth + 16 : faixa.clientWidth * 0.8;
    faixa.scrollBy({ left: passo * sentido, behavior: "smooth" });
  };

  return (
    <section id="fotos" className="scroll-mt-24 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <TituloSecao
              olho="Os lanches"
              titulo={
                <>
                  Sem <span className="text-brasa">retoque</span>
                </>
              }
              chamada="Foto do que sai da chapa aqui, no salão da casa."
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => deslizar(-1)}
                aria-label="Ver fotos anteriores"
                className="flex size-12 items-center justify-center border border-borda text-osso transition-colors hover:border-brasa hover:text-brasa"
              >
                <IconeSeta className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => deslizar(1)}
                aria-label="Ver próximas fotos"
                className="flex size-12 items-center justify-center border border-borda text-osso transition-colors hover:border-brasa hover:text-brasa"
              >
                <IconeSeta className="size-5" />
              </button>
            </div>
          </div>
        </Revelar>
      </div>

      {/* A faixa sangra até a borda da tela: o quadro cortado à direita é o que
          conta para o visitante que ainda há foto para o lado. */}
      <div
        ref={faixaRef}
        className="sem-barra mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-2 sm:px-8"
      >
        {galeria.map((foto, indice) => (
          <figure
            key={foto.src}
            className="group relative aspect-video w-[86%] shrink-0 snap-center overflow-hidden border border-borda bg-carvao-2 sm:w-[60%] lg:w-[42%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto.src}
              alt={foto.alt}
              width={foto.largura}
              height={foto.altura}
              loading={indice < 2 ? "eager" : "lazy"}
              decoding="async"
              className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            {foto.legenda && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carvao via-carvao/70 to-transparent p-4 pt-10">
                <span className="display text-lg text-osso sm:text-xl">
                  {foto.legenda}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
