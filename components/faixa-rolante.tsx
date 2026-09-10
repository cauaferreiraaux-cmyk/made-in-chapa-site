import { cardapio } from "@/conteudo/site";

/**
 * Faixa infinita com os nomes do cardápio, alternando cheio e vazado.
 * O conteúdo é duplicado porque a animação anda -50%: o laço fecha sem emenda.
 */
export function FaixaRolante() {
  const nomes = cardapio.flatMap((categoria) =>
    categoria.itens.map((item) => item.nome),
  );
  if (nomes.length === 0) return null;

  const sequencia = [...nomes, ...nomes];

  return (
    <div
      className="relative flex overflow-hidden border-y border-borda bg-carvao-2 py-5"
      aria-hidden
    >
      <div className="faixa-rolante flex shrink-0 items-center gap-8 pr-8 whitespace-nowrap">
        {sequencia.map((nome, indice) => (
          <span key={`${nome}-${indice}`} className="flex items-center gap-8">
            <span
              className={`display text-3xl sm:text-4xl ${
                indice % 2 === 0 ? "text-osso" : "vazado"
              }`}
            >
              {nome}
            </span>
            <span className="size-1.5 rotate-45 bg-brasa" />
          </span>
        ))}
      </div>
    </div>
  );
}
