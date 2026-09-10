"use client";

import { useState } from "react";
import { cardapio, contato, type ItemCardapio } from "@/conteudo/site";
import { Revelar } from "./revelar";
import { TituloSecao } from "./titulo-secao";

const emReais = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function Linha({ item, numero }: { item: ItemCardapio; numero: number }) {
  return (
    <li className="group border-b border-borda/70 last:border-0">
      <div className="flex gap-5 py-6 transition-colors group-hover:bg-carvao-2/60 sm:gap-8 sm:px-4">
        <span className="mt-1 font-mono text-xs text-fumaca/70 tabular-nums">
          {String(numero).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="display text-2xl transition-colors group-hover:text-brasa sm:text-3xl">
              {item.nome}
            </h3>
            {item.destaque && (
              <span className="eyebrow text-ambar">Mais pedido</span>
            )}
          </div>
          {item.descricao && (
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-fumaca">
              {item.descricao}
            </p>
          )}
        </div>

        {/* Sem preço confirmado o item aparece sem número — nunca com um falso. */}
        {item.preco !== null && (
          <span className="display shrink-0 self-start text-2xl text-osso tabular-nums sm:text-3xl">
            {emReais.format(item.preco)}
          </span>
        )}
      </div>
    </li>
  );
}

export function Cardapio() {
  const categorias = cardapio.filter((categoria) => categoria.itens.length > 0);
  const [ativa, setAtiva] = useState(categorias[0]?.id);
  const categoria = categorias.find((c) => c.id === ativa) ?? categorias[0];

  if (!categoria) return null;

  return (
    <section id="cardapio" className="relative isolate scroll-mt-24 py-16 sm:py-28">
      <div className="halo -top-20 -left-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Revelar>
          <TituloSecao
            olho="O cardápio"
            titulo={
              <>
                Tudo sai <span className="text-brasa">da chapa</span>
              </>
            }
            chamada="Carne prensada na hora, pão tostado na manteiga e salada cortada no dia."
          />
        </Revelar>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Categorias: coluna própria no desktop, faixa rolável no celular. */}
          <div className="min-w-0 lg:col-span-3">
            <div
              className="sem-barra -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
              role="tablist"
              aria-label="Categorias do cardápio"
            >
              {categorias.map((item) => {
                const selecionada = item.id === categoria.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selecionada}
                    onClick={() => setAtiva(item.id)}
                    className={`shrink-0 border-l-2 px-4 py-3 text-left text-sm font-bold tracking-wide whitespace-nowrap uppercase transition-colors ${
                      selecionada
                        ? "border-brasa bg-carvao-2 text-osso"
                        : "border-transparent text-fumaca hover:text-osso"
                    }`}
                  >
                    {item.nome}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-9">
            {categoria.chamada && (
              <p className="mb-4 text-sm text-fumaca">{categoria.chamada}</p>
            )}
            <ul>
              {categoria.itens.map((item, indice) => (
                <Linha key={item.nome} item={item} numero={indice + 1} />
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 border border-borda bg-carvao-2 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-fumaca">
                Escolheu? O pedido sai pela loja online em dois minutos.
              </p>
              <a
                href={contato.lojaOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 bg-brasa px-6 py-3 text-center text-sm font-bold tracking-widest text-carvao uppercase transition-colors hover:bg-brasa-viva"
              >
                Compre aqui
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
