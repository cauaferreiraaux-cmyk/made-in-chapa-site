import { galeria } from "@/conteudo/site";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

/**
 * Grade proposital fora do esquadro: a primeira foto ocupa quatro células e as
 * outras se acomodam em volta. Grade regular deixaria isso com cara de catálogo.
 */
export function Galeria() {
  if (galeria.length === 0) return null;

  return (
    <section id="fotos" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <TituloSecao
            olho="Os lanches"
            titulo={
              <>
                Sem <span className="text-brasa">retoque</span>
              </>
            }
            chamada="Foto do que sai da chapa aqui, no salão da casa."
          />
        </Revelar>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {galeria.map((foto, indice) => (
            <Revelar
              key={foto.src}
              atraso={(indice % 4) * 90}
              className={
                indice === 0
                  ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
                  : ""
              }
            >
              <figure className="group relative h-full overflow-hidden border border-borda bg-carvao-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto.src}
                  alt={foto.alt}
                  width={foto.largura}
                  height={foto.altura}
                  loading={indice < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    indice === 0 ? "h-full min-h-[22rem]" : "aspect-3/4 h-full"
                  }`}
                />
                {foto.legenda && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carvao via-carvao/70 to-transparent p-4 pt-10">
                    <span className="display text-lg text-osso sm:text-xl">
                      {foto.legenda}
                    </span>
                  </figcaption>
                )}
              </figure>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
