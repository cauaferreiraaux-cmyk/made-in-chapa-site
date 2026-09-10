import { canais, contato, endereco, horarios } from "@/conteudo/site";
import { linkMapa, linkWhatsapp } from "@/lib/links";
import { IconeMapa, IconeRelogio, IconeSeta, IconeWhatsapp } from "./icones";
import { Pendente } from "./pendente";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

/** Cada canal aponta para o seu link; o do salão só existe com endereço. */
function destinoDo(id: (typeof canais)[number]["id"]): string | null {
  if (id === "loja") return contato.lojaOnlineUrl;
  if (id === "whatsapp") return linkWhatsapp();
  return linkMapa();
}

export function ComoPedir() {
  return (
    <section id="pedir" className="scroll-mt-24 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <TituloSecao
            olho="Como pedir"
            titulo={
              <>
                Três jeitos.{" "}
                <span className="text-brasa">Nenhuma fila.</span>
              </>
            }
          />
        </Revelar>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {canais.map((canal, indice) => {
            const destino = destinoDo(canal.id);

            return (
              <Revelar
                key={canal.id}
                atraso={indice * 110}
                // Escadinha: o bloco do meio desce, o terceiro desce mais.
                className={indice === 1 ? "lg:mt-8" : indice === 2 ? "lg:mt-16" : ""}
              >
                <div className="flex h-full flex-col border border-borda bg-carvao-2 p-7 transition-colors hover:border-brasa/60">
                  <span className="display text-6xl text-borda">
                    {canal.numero}
                  </span>
                  <h3 className="display mt-5 text-3xl">{canal.titulo}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-fumaca">
                    {canal.texto}
                  </p>

                  {destino ? (
                    <a
                      href={destino}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-3 text-sm font-bold tracking-widest text-osso uppercase"
                    >
                      {canal.id === "whatsapp" && (
                        <IconeWhatsapp className="size-4 text-brasa" />
                      )}
                      {canal.acao}
                      <IconeSeta className="size-4 text-brasa transition-transform group-hover:translate-x-1" />
                    </a>
                  ) : (
                    <div className="mt-6">
                      <Pendente>endereço do salão, para o &ldquo;como chegar&rdquo;</Pendente>
                    </div>
                  )}
                </div>
              </Revelar>
            );
          })}
        </div>

        {/* Endereço e horário: cada bloco só aparece quando o dado existe. */}
        <div className="mt-16 grid gap-4 border-t border-borda pt-12 sm:grid-cols-2">
          <div>
            <div className="flex items-center gap-3">
              <IconeMapa className="size-5 text-brasa" />
              <h3 className="eyebrow text-osso">Onde estamos</h3>
            </div>
            {endereco ? (
              <address className="mt-4 text-lg leading-relaxed text-fumaca not-italic">
                {endereco.logradouro}
                <br />
                {endereco.bairro} · {endereco.cidade}/{endereco.uf}
                {endereco.cep && (
                  <>
                    <br />
                    CEP {endereco.cep}
                  </>
                )}
              </address>
            ) : (
              <p className="mt-4 leading-relaxed text-fumaca">
                Fale com a gente pelo WhatsApp que passamos o endereço e a
                melhor forma de chegar.
                <br />
                <Pendente>endereço completo do salão</Pendente>
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3">
              <IconeRelogio className="size-5 text-brasa" />
              <h3 className="eyebrow text-osso">Horário</h3>
            </div>
            {horarios ? (
              <dl className="mt-4 space-y-2">
                {horarios.map((faixa) => (
                  <div
                    key={faixa.rotulo}
                    className="flex justify-between gap-6 border-b border-borda/60 pb-2 text-fumaca"
                  >
                    <dt>{faixa.rotulo}</dt>
                    <dd className="font-mono text-osso tabular-nums">
                      {faixa.abre} às {faixa.fecha}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-4 leading-relaxed text-fumaca">
                Confira no Instagram ou chame no WhatsApp — respondemos na hora.
                <br />
                <Pendente>horários de funcionamento</Pendente>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
