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
        className="brasa-glow pointer-events-none absolute -top-24 -left-52 size-[42rem] opacity-40 blur-3xl"
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow text-brasa">Hamburgueria</span>
            <span className="h-px w-10 bg-borda" aria-hidden />
            <span className="eyebrow text-fumaca">Delivery e salão</span>
            <StatusLoja />
          </div>

          <h1 className="display mt-6 text-[clamp(3.25rem,11vw,7.5rem)]">
            Na chapa.
            <br />
            Na hora.
            <br />
            <span className="text-brasa">No ponto.</span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-fumaca sm:text-xl">
            Hambúrguer artesanal de verdade, montado na hora. Peça pelo site,
            pelo WhatsApp ou sente numa mesa.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
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

          <p className="mt-7 font-mono text-sm text-fumaca">
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
        <div className="relative lg:col-span-5">
          <div className="mx-auto w-full max-w-sm lg:max-w-none lg:translate-y-6">
            <RodizioHero />
          </div>
        </div>

      </div>
    </section>
  );
}
