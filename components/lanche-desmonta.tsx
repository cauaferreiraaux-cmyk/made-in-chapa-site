"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TituloSecao } from "./titulo-secao";

/**
 * As camadas, de cima para baixo. `desenho` é o SVG de cada uma; a separação
 * na hora de desmontar sai do índice, então a ordem aqui é a ordem do lanche.
 */
const CAMADAS = [
  {
    id: "pao-topo",
    nome: "Pão tradicional",
    detalhe: "tostado na manteiga",
    desenho: (
      <>
        <path
          d="M52 132c0-46 38-78 96-78s96 32 96 78c0 8-6 14-14 14H66c-8 0-14-6-14-14Z"
          fill="#d29a54"
        />
        <path
          d="M52 132c0-46 38-78 96-78s96 32 96 78"
          fill="none"
          stroke="#f0c383"
          strokeWidth="5"
          strokeLinecap="round"
          opacity=".55"
        />
        {/* gergelim */}
        <g fill="#f6e2be">
          <ellipse cx="106" cy="96" rx="7" ry="4" transform="rotate(-24 106 96)" />
          <ellipse cx="148" cy="80" rx="7" ry="4" transform="rotate(6 148 80)" />
          <ellipse cx="190" cy="94" rx="7" ry="4" transform="rotate(22 190 94)" />
          <ellipse cx="80" cy="122" rx="7" ry="4" transform="rotate(-38 80 122)" />
          <ellipse cx="216" cy="120" rx="7" ry="4" transform="rotate(34 216 120)" />
          <ellipse cx="128" cy="114" rx="6" ry="3.5" transform="rotate(-8 128 114)" />
          <ellipse cx="170" cy="116" rx="6" ry="3.5" transform="rotate(14 170 116)" />
        </g>
      </>
    ),
  },
  {
    id: "alface",
    nome: "Alface",
    detalhe: "cortada no dia",
    desenho: (
      <path
        d="M44 152c8-14 22-6 30-16 7-9 20-10 28-2 8-9 22-12 32-4 9-10 24-10 33-1 9-8 23-6 30 3 8-9 22-8 29 2 7-9 21-4 28 10 6 12-2 22-14 22H58c-13 0-20-10-14-14Z"
        fill="#7fa03c"
      />
    ),
  },
  {
    id: "tomate",
    nome: "Tomate",
    detalhe: "",
    desenho: (
      <>
        <rect x="58" y="150" width="180" height="22" rx="11" fill="#b8412f" />
        <rect x="58" y="150" width="180" height="9" rx="4.5" fill="#d1523d" opacity=".7" />
      </>
    ),
  },
  {
    id: "cebola",
    nome: "Cebola roxa",
    detalhe: "",
    desenho: (
      <>
        <rect x="64" y="152" width="168" height="16" rx="8" fill="#8d5b82" />
        <rect x="64" y="152" width="168" height="6" rx="3" fill="#a97a9d" opacity=".8" />
      </>
    ),
  },
  {
    id: "queijo",
    nome: "Queijo muçarela",
    detalhe: "derretido na chapa",
    desenho: (
      <path
        d="M56 150h184c6 0 10 4 10 10s-4 10-10 10h-6l-10 18-12-18h-18l-11 22-13-22h-20l-10 16-11-16H56c-6 0-10-4-10-10s4-10 10-10Z"
        fill="#e0a51f"
      />
    ),
  },
  {
    id: "carne",
    nome: "Carne na chapa",
    detalhe: "prensada na hora",
    desenho: (
      <>
        <rect x="48" y="144" width="200" height="36" rx="17" fill="#4a2a1b" />
        <rect x="48" y="144" width="200" height="13" rx="6.5" fill="#633a25" />
        <g fill="#2e1a10" opacity=".55">
          <circle cx="86" cy="166" r="4" />
          <circle cx="126" cy="171" r="3" />
          <circle cx="168" cy="164" r="4.5" />
          <circle cx="208" cy="170" r="3.5" />
        </g>
      </>
    ),
  },
  {
    id: "pao-base",
    nome: "Maionese artesanal",
    detalhe: "feita aqui dentro",
    desenho: (
      <>
        {/* fio de maionese sobre o pão de baixo */}
        <path
          d="M62 150h172c5 0 9 4 9 9s-4 9-9 9H62c-5 0-9-4-9-9s4-9 9-9Z"
          fill="#f3ead2"
        />
        <path
          d="M56 168h184c7 0 12 5 12 12v10c0 16-13 28-29 28H73c-16 0-29-12-29-28v-10c0-7 5-12 12-12Z"
          fill="#c48f4b"
        />
        <path
          d="M56 168h184c7 0 12 5 12 12"
          fill="none"
          stroke="#e0b479"
          strokeWidth="4"
          opacity=".5"
        />
      </>
    ),
  },
] as const;

/** Quanto cada camada se afasta do centro, em unidades do viewBox. */
const PASSO = 46;
const CENTRO = 3;

const CONSULTA_MOVIMENTO = "(prefers-reduced-motion: reduce)";

/**
 * Lê a preferência de movimento do sistema.
 *
 * `useSyncExternalStore` em vez de um `useEffect` com `setState`: a media query
 * é estado externo, e assinar direto evita a renderização em cascata.
 *
 * O prefixo `use` é exigência do React (a regra dos hooks não entende
 * "usaMovimento…"), então este é o único nome em inglês do repo.
 */
function useMovimentoReduzido(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const consulta = window.matchMedia(CONSULTA_MOVIMENTO);
      consulta.addEventListener("change", avisar);
      return () => consulta.removeEventListener("change", avisar);
    },
    () => window.matchMedia(CONSULTA_MOVIMENTO).matches,
    () => false, // no build não há sistema para consultar
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
      // O trilho é mais alto que a tela: o progresso é o quanto do excedente
      // já passou. 0 = lanche montado, 1 = todo separado.
      const percorrivel = caixa.height - window.innerHeight;
      if (percorrivel <= 0) return;

      const bruto = -caixa.top / percorrivel;
      setProgresso(Math.min(1, Math.max(0, bruto)));
    };

    const aoRolar = () => {
      // Uma medição por quadro: ler getBoundingClientRect a cada evento de
      // rolagem trava a página em celular. Com a aba em segundo plano o
      // navegador não entrega quadro nenhum, então ali mede-se direto — sem
      // isso a posição fica congelada em quem volta para a aba.
      if (document.hidden) {
        medir();
        return;
      }
      if (!pedido) pedido = requestAnimationFrame(medir);
    };

    // A primeira medição também vai para o quadro seguinte: chamar `medir()`
    // aqui seria setState síncrono dentro do efeito.
    pedido = requestAnimationFrame(medir);
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (pedido) cancelAnimationFrame(pedido);
    };
  }, [semMovimento]);

  // Sobra um respiro no começo e no fim para o lanche não começar já se
  // desmontando nem terminar de separar fora da tela.
  const abertura = Math.min(1, Math.max(0, (progresso - 0.12) / 0.7));

  return (
    <section
      id="anatomia"
      ref={trilhoRef}
      className="relative h-[280vh] lg:h-[320vh]"
      aria-label="Anatomia do lanche"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <TituloSecao
              olho="Anatomia"
              titulo={
                <>
                  Camada <span className="text-brasa">por camada</span>
                </>
              }
            />

            <ul className="mt-6 space-y-1 sm:mt-8 sm:space-y-2">
              {CAMADAS.map((camada, indice) => {
                // Cada nome acende quando a sua camada terminou de se separar.
                const limiar = (indice + 0.6) / CAMADAS.length;
                const aceso = semMovimento || abertura >= limiar * 0.85;

                return (
                  <li
                    key={camada.id}
                    className={`flex items-baseline gap-3 transition-all duration-500 sm:gap-4 ${
                      aceso
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-3 opacity-25"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tabular-nums transition-colors ${
                        aceso ? "text-brasa" : "text-fumaca"
                      }`}
                    >
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-xl sm:text-2xl lg:text-3xl">
                      {camada.nome}
                    </span>
                    {camada.detalhe && (
                      <span className="hidden text-sm text-fumaca sm:inline">
                        {camada.detalhe}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-1 lg:order-2">
            <svg
              viewBox="0 0 296 500"
              className="mx-auto h-[38vh] w-full max-w-md sm:h-[46vh] lg:h-[70vh]"
              role="img"
              aria-label="Ilustração de um hambúrguer separado em camadas: pão, alface, tomate, cebola roxa, queijo, carne e o pão de baixo com maionese"
            >
              {/* brilho de brasa por trás do lanche */}
              <ellipse cx="148" cy="250" rx="120" ry="120" fill="url(#calor)" />
              <defs>
                <radialGradient id="calor">
                  <stop offset="0%" stopColor="#d99a12" stopOpacity=".22" />
                  <stop offset="100%" stopColor="#d99a12" stopOpacity="0" />
                </radialGradient>
              </defs>

              <g transform="translate(0, 90)">
                {CAMADAS.map((camada, indice) => {
                  // translateY positivo desce: as camadas ACIMA do centro
                  // precisam de valor negativo para subir.
                  const distancia = indice - CENTRO;
                  const deslocamento = semMovimento
                    ? 0
                    : distancia * PASSO * abertura;
                  // Leve inclinação alternada: separado, o lanche fica vivo em
                  // vez de virar sete retângulos empilhados.
                  const giro = semMovimento ? 0 : (indice % 2 ? 1.6 : -1.6) * abertura;

                  return (
                    <g
                      key={camada.id}
                      style={{
                        transform: `translateY(${deslocamento}px) rotate(${giro}deg)`,
                        transformOrigin: "148px 160px",
                        transition: "transform 120ms linear",
                      }}
                    >
                      {camada.desenho}
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
