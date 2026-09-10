"use client";

import { useEffect, useState } from "react";
import { contato } from "@/conteudo/site";
import { linkWhatsapp } from "@/lib/links";
import { IconeWhatsapp } from "./icones";

const secoes = [
  { href: "#cardapio", rotulo: "Cardápio" },
  { href: "#fotos", rotulo: "Os lanches" },
  { href: "#salao", rotulo: "O salão" },
  { href: "#pedir", rotulo: "Como pedir" },
];

export function Cabecalho() {
  // O cabeçalho começa transparente sobre o hero e ganha fundo ao rolar —
  // sem isso ele briga com a foto logo no primeiro quadro.
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Trava o fundo enquanto o menu de celular está aberto.
  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  return (
    <>
      {/* O painel do menu é IRMÃO do cabeçalho, não filho. O cabeçalho usa
          backdrop-blur, e backdrop-filter cria bloco de contenção: um
          `position: fixed` lá dentro passa a se medir pelo cabeçalho (64px de
          altura) em vez da tela, e o menu abria com 1px. */}
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        rolou || menuAberto
          ? "border-b border-borda bg-carvao/92 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <a href="#topo" className="shrink-0" aria-label="Made in Chapa — início">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/marca/logo-horizontal-branco.svg"
            alt="Made in Chapa"
            className="h-9 w-auto sm:h-11"
            width={1123}
            height={810}
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {secoes.map((secao) => (
            <a
              key={secao.href}
              href={secao.href}
              className="text-sm font-medium text-fumaca transition-colors hover:text-osso"
            >
              {secao.rotulo}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={linkWhatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden size-11 items-center justify-center border border-borda text-osso transition-colors hover:border-osso sm:flex"
            aria-label="Pedir pelo WhatsApp"
          >
            <IconeWhatsapp className="size-5" />
          </a>

          <a
            href={contato.lojaOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-brasa px-5 py-3 text-sm font-bold tracking-wide text-carvao uppercase transition-colors hover:bg-brasa-viva sm:inline-flex"
          >
            Compre aqui
          </a>

          <button
            type="button"
            onClick={() => setMenuAberto((aberto) => !aberto)}
            className="flex size-11 items-center justify-center border border-borda text-osso lg:hidden"
            aria-expanded={menuAberto}
            aria-controls="menu-celular"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 h-0.5 bg-current transition-transform duration-300 ${
                  menuAberto ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute inset-x-0 h-0.5 bg-current transition-transform duration-300 ${
                  menuAberto ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      </header>

      {/* Tela cheia de verdade: do fim do cabeçalho até a base, fundo opaco.
          Antes tinha só a altura do próprio conteúdo e o topo do site aparecia
          por baixo, com os botões do hero duplicando os do menu. */}
      {menuAberto && (
        <nav
          id="menu-celular"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-borda bg-carvao sm:top-20 lg:hidden"
        >
          <ul className="mx-auto flex min-h-full max-w-7xl flex-col justify-center px-5 py-8 sm:px-8">
            {secoes.map((secao) => (
              <li key={secao.href} className="border-b border-borda/60">
                <a
                  href={secao.href}
                  onClick={() => setMenuAberto(false)}
                  className="display block py-5 text-4xl text-osso transition-colors hover:text-brasa"
                >
                  {secao.rotulo}
                </a>
              </li>
            ))}
            <li className="grid gap-3 pt-8">
              <a
                href={contato.lojaOnlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brasa px-5 py-4 text-sm font-bold tracking-wide text-carvao uppercase"
              >
                Compre aqui
              </a>
              <a
                href={linkWhatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-borda px-5 py-4 text-sm font-bold tracking-wide text-osso uppercase"
              >
                <IconeWhatsapp className="size-4" />
                Pedir no WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
