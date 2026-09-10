import { contato } from "@/conteudo/site";
import { linkWhatsapp } from "@/lib/links";
import { IconeSeta, IconeWhatsapp } from "./icones";
import { RodizioHero } from "./rodizio-hero";
import { StatusLoja } from "./status-loja";

export function Hero() {
  return (
    <section
      id="topo"
      className="relative isolate min-h-[100dvh] overflow-hidden lg:min-h-0 lg:pt-40 lg:pb-24"
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
        {/* No celular o conteúdo se divide em dois: identidade e título colados
            no topo, e a conversa de pedido colada na base. O meio fica livre
            para o lanche — que é o motivo de a mídia estar ali atrás.
            No desktop volta a ser um bloco só na coluna da esquerda. */}
        <div className="sobre-midia relative z-10 flex min-h-[100dvh] flex-col justify-between pt-24 pb-9 lg:col-span-7 lg:block lg:min-h-0 lg:pt-0 lg:pb-0">
          <div>
            <div className="entra flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="eyebrow text-brasa">Hamburgueria</span>
            <span className="h-px w-10 bg-borda" aria-hidden />
            <span className="eyebrow text-fumaca">Delivery e salão</span>
              <StatusLoja />
            </div>

          {/* Cada linha vive dentro de um bloco com overflow escondido: é o
              que faz o texto surgir de trás da máscara em vez de só aparecer. */}
          <h1 className="display mt-4 text-[clamp(2.1rem,8.5vw,7.5rem)] sm:mt-6">
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
          </div>

          <div>
            <p className="entra max-w-xl text-sm leading-relaxed text-osso/75 [animation-delay:470ms] sm:mt-7 sm:text-xl sm:text-fumaca">
            Hambúrguer artesanal de verdade, montado na hora. Peça pelo site,
            pelo WhatsApp ou sente numa mesa.
          </p>

          <div className="entra mt-5 flex flex-col gap-2.5 [animation-delay:580ms] sm:mt-9 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={contato.lojaOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-brasa px-6 py-3.5 text-xs font-bold tracking-wider text-carvao uppercase transition-colors hover:bg-brasa-viva sm:px-7 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              Compre aqui
              <IconeSeta className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={linkWhatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-borda px-6 py-3.5 text-xs font-bold tracking-wider text-osso uppercase transition-colors hover:border-osso sm:px-7 sm:py-4 sm:text-sm sm:tracking-widest"
            >
              <IconeWhatsapp className="size-5" />
              Pedir no WhatsApp
            </a>
          </div>

          <p className="entra mt-4 font-mono text-xs text-osso/80 [animation-delay:680ms] sm:mt-7 sm:text-sm sm:text-fumaca">
            <a href="#cardapio" className="inline-block py-2 text-osso underline decoration-borda decoration-2 underline-offset-4 transition-colors hover:decoration-brasa">
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
              className="inline-block py-2 whitespace-nowrap text-osso underline decoration-brasa decoration-2 underline-offset-4"
            >
                {contato.telefone}
              </a>
            </p>
          </div>
        </div>

        {/* O quadro entra deslocado e alto: quebra o eixo central e evita o
            hero simétrico de sempre. */}
        {/* No celular a mídia é o FUNDO da tela inteira; no desktop volta a ser
            o quadro da coluna da direita. É o mesmo componente nos dois casos —
            duplicar significaria carregar os oito vídeos e fotos duas vezes. */}
        <div className="absolute inset-0 -z-10 lg:relative lg:z-0 lg:col-span-5 lg:translate-y-6">
          <div className="entra-quadro midia-fundo size-full [animation-delay:260ms] lg:mx-auto lg:w-full lg:max-w-none">
            <RodizioHero />
          </div>
          {/* Sem véu o título branco cai em cima do queijo derretido e some.
              Forte embaixo, onde está o texto, e quase limpo no topo, para o
              lanche continuar aparecendo — que é o motivo de ele estar ali. */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carvao/80 via-carvao/25 via-50% to-carvao/85 lg:hidden"
            aria-hidden
          />
        </div>

      </div>
    </section>
  );
}
