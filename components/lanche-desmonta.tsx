"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * As camadas são fatias de UMA foto real de um lanche da casa, recortada do
 * fundo e cortada nas fronteiras entre os ingredientes. `topo` e `altura` são
 * a posição original de cada fatia dentro da foto, em fração — montadas nesses
 * valores, elas reconstroem a foto inteira sem emenda.
 */
const CAMADAS = [
  { src: "/img/camadas/pao-topo.webp", topo: 0.0, altura: 0.2811 },
  { src: "/img/camadas/salada.webp", topo: 0.2811, altura: 0.1942 },
  { src: "/img/camadas/queijo-carne.webp", topo: 0.4753, altura: 0.1465 },
  { src: "/img/camadas/cebola.webp", topo: 0.6218, altura: 0.109 },
  { src: "/img/camadas/pao-base.webp", topo: 0.7308, altura: 0.2692 },
] as const;

const CENTRO = 2;
const CONSULTA_MOVIMENTO = "(prefers-reduced-motion: reduce)";

/**
 * Preferência de movimento do sistema. `useSyncExternalStore` porque a media
 * query é estado externo — assinar direto evita renderização em cascata.
 *
 * O prefixo `use` é exigência da regra dos hooks do React.
 */
function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const consulta = window.matchMedia(CONSULTA_MOVIMENTO);
      consulta.addEventListener("change", avisar);
      return () => consulta.removeEventListener("change", avisar);
    },
    () => window.matchMedia(CONSULTA_MOVIMENTO).matches,
    () => false,
  );
}

export function LancheDesmonta() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [progresso, setProgresso] = useState(0);
  const semMovimento = useMovimentoReduzido();

  useEffect(() => {
    if (semMovimento) return;

    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const trilho = trilhoRef.current;
      if (!trilho) return;

      const caixa = trilho.getBoundingClientRect();
      const percorrivel = caixa.height - window.innerHeight;
      if (percorrivel <= 0) return;

      setProgresso(Math.min(1, Math.max(0, -caixa.top / percorrivel)));
    };

    const aoRolar = () => {
      // Uma medição por quadro: ler getBoundingClientRect a cada evento de
      // rolagem trava a página no celular. Com a aba em segundo plano não vem
      // quadro nenhum, então ali mede-se direto.
      if (document.hidden) {
        medir();
        return;
      }
      if (!pedido) pedido = requestAnimationFrame(medir);
    };

    pedido = requestAnimationFrame(medir);
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, [semMovimento]);

  // Respiro no começo e no fim: o lanche não começa já se abrindo nem termina
  // de separar fora da tela.
  const abertura = semMovimento
    ? 0
    : Math.min(1, Math.max(0, (progresso - 0.1) / 0.72));

  return (
    <section
      id="anatomia"
      ref={trilhoRef}
      className="relative h-[200vh] lg:h-[240vh]"
      aria-label="O lanche, camada por camada"
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <p className="eyebrow absolute top-24 left-5 text-brasa sm:left-8 lg:top-28">
          Camada por camada
        </p>

        <div
          className="relative aspect-[576/587] w-[92vw] max-w-[34rem] [--passo:3.4vh] sm:w-[70vw] lg:w-auto lg:h-[68vh] lg:max-w-none lg:[--passo:5.5vh]"
          style={{ ["--abertura" as string]: abertura }}
        >
          {/* calor da chapa por trás */}
          <div
            className="brasa-glow pointer-events-none absolute inset-[12%] blur-2xl"
            aria-hidden
          />

          {CAMADAS.map((camada, indice) => (
            <div
              key={camada.src}
              className="absolute inset-x-0 will-change-transform [filter:drop-shadow(0_10px_14px_rgba(0,0,0,0.75))]"
              style={{
                top: `${camada.topo * 100}%`,
                height: `${camada.altura * 100}%`,
                transform: `translateY(calc(var(--abertura) * ${indice - CENTRO} * var(--passo)))`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={camada.src}
                alt=""
                aria-hidden
                className="size-full object-fill"
                // as cinco somam 64 KB: carregar de imediato evita a camada
                // aparecendo com atraso bem na hora em que ela se separa
                loading="eager"
                decoding="async"
              />
            </div>
          ))}

          {/* Uma descrição só para quem usa leitor de tela: cinco imagens
              decorativas seriam ruído. */}
          <span className="sr-only">
            Hambúrguer da casa se abrindo camada por camada: pão tostado,
            salada fresca, queijo e carne na chapa, cebola roxa e o pão de baixo.
          </span>
        </div>
      </div>
    </section>
  );
}
