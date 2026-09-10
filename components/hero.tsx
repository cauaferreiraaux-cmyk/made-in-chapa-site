import { contato } from "@/conteudo/site";
import { linkWhatsapp } from "@/lib/links";
import { IconeSeta, IconeWhatsapp } from "./icones";
import { RodizioHero } from "./rodizio-hero";
import { StatusLoja } from "./status-loja";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Brasa fora de foco atrás do texto: dá temperatura ao preto chapado. */}
      <div
        className="brasa-glow entra-brasa pointer-events-none absolute -top-24 -left-52 size-[42rem] blur-3xl"
        aria-hidden
      />
      {/* Selo da marca sangrando pela direita, quase invisível — textura, não logo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/marca/logo-selo-branco.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 hidden w-[38rem] opacity-[0.035] lg:block"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <div className="entra flex flex-wrap items-center gap-3">
            <span className="eyebrow text-brasa">Hamburgueria</span>
            <span className="h-px w-10 bg-borda" aria-hidden />
            <span className="eyebrow text-fumaca">Delivery e salão</span>
            <StatusLoja />
          </div>

          {/* Cada linha vive dentro de um bloco com overflow escondido: é o
              que faz o texto surgir de trás da máscara em vez de só aparecer. */}
          <h1 className="display mt-6 text-[clamp(3.25rem,11vw,7.5rem)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="entra-linha block [animation-delay:90ms]">
                Na chapa.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="entra-linha block [animation-delay:200ms]">
                Na hora.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="entra-linha block text-brasa [animation-delay:310ms]">
                No ponto.
              </span>
            </span>
          </h1>

          <p className="entra mt-7 max-w-xl text-lg leading-relaxed text-fumaca [animation-delay:470ms] sm:text-xl">
            Hambúrguer artesanal de verdade, montado na hora. Peça pelo site,
            pelo WhatsApp ou sente numa mesa.
          </p>

          <div className="entra mt-9 flex flex-col gap-3 [animation-delay:580ms] sm:flex-row sm:items-center">
            <a
              href={contato.lojaOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-brasa px-7 py-4 text-sm font-bold tracking-widest text-carvao uppercase transition-colors hover:bg-brasa-viva"
            >
              Compre aqui
              <IconeSeta className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-borda px-7 py-4 text-sm font-bold tracking-widest text-osso uppercase transition-colors hover:border-osso"
            >
              <IconeWhatsapp className="size-5" />
              Pedir no WhatsApp
            </a>
          </div>

          <p className="entra mt-7 font-mono text-sm text-fumaca [animation-delay:680ms]">
            <a href="#cardapio" className="text-osso underline decoration-borda decoration-2 underline-offset-4 transition-colors hover:decoration-brasa">
              Ver o cardápio
            </a>
            <span className="px-3 text-borda" aria-hidden>
              /
            </span>
            Delivery{" "}
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-osso underline decoration-brasa decoration-2 underline-offset-4"
            >
              {contato.telefone}
            </a>
          </p>
        </div>

        {/* O quadro entra deslocado e alto: quebra o eixo central e evita o
            hero simétrico de sempre. */}
        <div className="relative lg:col-span-5 lg:translate-y-6">
          <div className="entra-quadro mx-auto w-full max-w-sm [animation-delay:260ms] lg:max-w-none">
            <RodizioHero />
          </div>
        </div>

      </div>
    </section>
  );
}
