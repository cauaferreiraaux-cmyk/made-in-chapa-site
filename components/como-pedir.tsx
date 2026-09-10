import { canais, contato, endereco, horarios } from "@/conteudo/site";
import { linkInstagram, linkMapa, linkWhatsapp } from "@/lib/links";
import {
  IconeInstagram,
  IconeMapa,
  IconeRelogio,
  IconeSeta,
  IconeWhatsapp,
} from "./icones";
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
  const mapa = linkMapa();

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
              <Revelar key={canal.id} atraso={indice * 110} className="h-full">
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

        {/* Endereço e horário no mesmo tratamento dos cartões acima — antes
            eram dois textos soltos embaixo de uma linha, e ficava órfão. */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col border border-borda bg-carvao-2 p-7 lg:col-span-2">
            <div className="flex items-center gap-3">
              <IconeMapa className="size-5 text-brasa" />
              <h3 className="eyebrow text-fumaca">Onde estamos</h3>
            </div>

            {endereco ? (
              <>
                <address className="display mt-4 text-3xl not-italic sm:text-4xl">
                  {endereco.logradouro && (
                    <>
                      {endereco.logradouro}
                      <br />
                    </>
                  )}
                  {endereco.bairro}
                  <span className="text-fumaca"> · </span>
                  {endereco.cidade}/{endereco.uf}
                </address>
                {!endereco.logradouro && (
                  <Pendente>rua e número, para o endereço completo</Pendente>
                )}
                {mapa && (
                  <a
                    href={mapa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-3 text-sm font-bold tracking-widest text-osso uppercase"
                  >
                    Como chegar
                    <IconeSeta className="size-4 text-brasa transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </>
            ) : (
              <p className="mt-4 leading-relaxed text-fumaca">
                Fale com a gente pelo WhatsApp que passamos o endereço.
                <Pendente>endereço do salão</Pendente>
              </p>
            )}
          </div>

          <div className="flex flex-col border border-borda bg-carvao-2 p-7">
            <div className="flex items-center gap-3">
              <IconeRelogio className="size-5 text-brasa" />
              <h3 className="eyebrow text-fumaca">Horário</h3>
            </div>

            {horarios ? (
              <dl className="mt-4 space-y-2">
                {horarios.map((faixa) => (
                  <div
                    key={faixa.rotulo}
                    className="flex justify-between gap-6 border-b border-borda/60 pb-2 text-fumaca last:border-0"
                  >
                    <dt>{faixa.rotulo}</dt>
                    <dd className="font-mono text-osso tabular-nums">
                      {faixa.abre} às {faixa.fecha}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <>
                <p className="mt-4 flex-1 leading-relaxed text-fumaca">
                  O dia de hoje sai sempre no Instagram da casa.
                </p>
                <Pendente>horários de funcionamento</Pendente>
                <a
                  href={linkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-3 text-sm font-bold tracking-widest text-osso uppercase"
                >
                  <IconeInstagram className="size-4 text-brasa" />
                  @{contato.instagram}
                </a>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
