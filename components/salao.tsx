import { fotosSalao, sobre } from "@/conteudo/site";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

export function Salao() {
  const [principal, ...apoio] = fotosSalao;

  return (
    <section
      id="salao"
      className="grao relative scroll-mt-24 overflow-hidden border-y border-borda bg-carvao-2 py-16 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Revelar>
          <TituloSecao olho="O salão" titulo={sobre.titulo} />
          <div className="mt-6 space-y-5">
            {sobre.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="text-lg leading-relaxed text-fumaca">
                {paragrafo}
              </p>
            ))}
          </div>
        </Revelar>

        {/* Duas fotos menores encavaladas sobre a principal, em vez de fileira. */}
        <Revelar atraso={120} className="relative">
          {principal && (
            <div className="ml-auto w-[82%] overflow-hidden border border-borda">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={principal.src}
                alt={principal.alt}
                width={principal.largura}
                height={principal.altura}
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          )}
          <div className="absolute -bottom-6 left-0 flex w-[46%] flex-col gap-3">
            {apoio.map((foto) => (
              <div
                key={foto.src}
                className="overflow-hidden border border-borda bg-carvao"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto.src}
                  alt={foto.alt}
                  width={foto.largura}
                  height={foto.altura}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Revelar>
      </div>
    </section>
  );
}
