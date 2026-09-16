import { cardapio, combosDestaque, contato } from "@/conteudo/site";
import { linkWhatsapp } from "@/lib/links";
import { IconeSeta, IconeWhatsapp } from "./icones";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

const emReais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/**
 * Preço do combo, buscado no cardápio pelo nome.
 *
 * O valor NÃO é repetido nos dados do destaque de propósito: se ele aparecesse
 * aqui e no cardápio, uma hora os dois iam divergir e o site anunciaria dois
 * preços para o mesmo combo.
 */
function precoDe(nome: string): number | null {
  for (const categoria of cardapio) {
    const achado = categoria.itens.find((item) => item.nome === nome);
    if (achado) return achado.preco;
  }
  return null;
}

/**
 * Os combos como linha de frente da casa.
 *
 * Fica logo depois do topo, antes do cardápio completo: é o que a casa quer
 * vender primeiro, então é o primeiro produto que a pessoa encontra.
 */
export function CombosDestaque() {
  // Combo sem preço no cardápio não é desenhado — melhor faltar um card do que
  // anunciar um combo sem valor.
  const combos = combosDestaque
    .map((combo) => ({ ...combo, preco: precoDe(combo.nome) }))
    .filter((combo): combo is typeof combo & { preco: number } =>
      Number.isFinite(combo.preco),
    );

  if (combos.length === 0) return null;

  return (
    <section
      id="combos"
      className="relative isolate scroll-mt-24 border-y border-borda bg-carvao-2 py-16 sm:py-28"
    >
      <div className="halo -top-24 right-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <TituloSecao
            olho="A linha de frente"
            titulo={
              <>
                Feitos para <span className="text-brasa">dividir</span>
              </>
            }
            chamada="Os combos são o carro-chefe da casa: lanche no pão de brioche, porção e bebida na mesma caixa, por um preço que só fecha em conta quando é para mais de um."
          />
        </Revelar>

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3">
          {combos.map((combo, indice) => {
            const porPessoa = combo.preco / combo.pessoas;
            const maisPedido = combo.nome === "Combo Trio";

            return (
              <Revelar key={combo.nome} atraso={indice * 110} className="h-full">
                <article
                  className={`flex h-full flex-col overflow-hidden border bg-carvao transition-colors ${
                    maisPedido
                      ? "border-brasa"
                      : "border-borda hover:border-brasa/60"
                  }`}
                >
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={combo.foto}
                      alt={combo.alt}
                      width={1200}
                      height={1600}
                      loading={indice === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="aspect-4/3 w-full object-cover"
                    />
                    {maisPedido && (
                      <span className="eyebrow absolute top-3 left-3 bg-brasa px-3 py-1.5 text-carvao">
                        O mais pedido
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="eyebrow text-fumaca">{combo.chamada}</span>
                    <h3 className="display mt-2 text-3xl sm:text-4xl">
                      {combo.nome}
                    </h3>

                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="display text-3xl text-brasa tabular-nums sm:text-4xl">
                        {emReais.format(combo.preco)}
                      </span>
                      <span className="text-sm text-fumaca">
                        {emReais.format(porPessoa)} por pessoa
                      </span>
                    </div>

                    <ul className="mt-5 flex-1 space-y-2 text-sm leading-snug text-fumaca">
                      {combo.itens.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-brasa" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* A loja online não tem Trio nem Família: nesses o pedido
                        vai pelo WhatsApp, senão o botão levaria a um lugar onde
                        o combo não existe. */}
                    {combo.naLojaOnline ? (
                      <a
                        href={contato.lojaOnlineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 inline-flex items-center justify-center gap-3 bg-brasa px-6 py-3.5 text-xs font-bold tracking-wider text-carvao uppercase transition-colors hover:bg-brasa-viva sm:text-sm"
                      >
                        Compre aqui
                        <IconeSeta className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    ) : (
                      <a
                        href={linkWhatsapp(
                          `Olá! Queria pedir o ${combo.nome}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-6 inline-flex items-center justify-center gap-3 border border-borda px-6 py-3.5 text-xs font-bold tracking-wider text-osso uppercase transition-colors hover:border-osso sm:text-sm"
                      >
                        <IconeWhatsapp className="size-4" />
                        Pedir no WhatsApp
                      </a>
                    )}
                  </div>
                </article>
              </Revelar>
            );
          })}
        </div>

        <p className="mt-8 text-sm text-fumaca">
          Todos saem da chapa na hora do pedido, com pão de brioche e a maionese
          verde da casa.{" "}
          <a
            href="#cardapio"
            className="inline-block py-1 text-osso underline decoration-borda decoration-2 underline-offset-4 transition-colors hover:decoration-brasa"
          >
            Ver o cardápio completo
          </a>
        </p>
      </div>
    </section>
  );
}
