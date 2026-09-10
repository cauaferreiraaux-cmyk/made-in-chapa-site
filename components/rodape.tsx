import { contato, empresa, marca } from "@/conteudo/site";
import { linkInstagram, linkWhatsapp } from "@/lib/links";
import { IconeInstagram, IconeWhatsapp } from "./icones";

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-borda bg-carvao-2">
      {/* Chamada final: a última coisa da página é um botão, não um texto. */}
      <div className="halo -top-40 right-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-borda pb-10 sm:gap-8 sm:pb-14 lg:flex-row lg:items-end">
          <p className="display max-w-2xl text-[clamp(1.9rem,8vw,4rem)]">
            Bateu a fome?{" "}
            <span className="text-brasa">A chapa já está quente.</span>
          </p>
          <a
            href={contato.lojaOnlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-brasa px-6 py-4 text-xs font-bold tracking-wider text-carvao uppercase transition-colors hover:bg-brasa-viva sm:px-8 sm:py-5 sm:text-sm sm:tracking-widest"
          >
            Compre aqui
          </a>
        </div>

        <div className="grid gap-8 pt-10 sm:grid-cols-2 sm:gap-10 sm:pt-12 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/marca/logo-horizontal-branco.svg"
              alt={marca.nome}
              width={1123}
              height={810}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fumaca">
              {marca.resumo}
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-fumaca">Pedidos</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={contato.lojaOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 transition-colors hover:text-brasa"
                >
                  Loja online
                </a>
              </li>
              <li>
                <a
                  href={linkWhatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1 transition-colors hover:text-brasa"
                >
                  <IconeWhatsapp className="size-4" />
                  {contato.telefone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-fumaca">Redes</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={linkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-1 transition-colors hover:text-brasa"
                >
                  <IconeInstagram className="size-4" />@{contato.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-fumaca">O site</h3>
            <ul className="mt-4 space-y-3 text-sm text-fumaca">
              <li>
                <a href="#cardapio" className="inline-block py-1.5 transition-colors hover:text-osso">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#fotos" className="inline-block py-1.5 transition-colors hover:text-osso">
                  Os lanches
                </a>
              </li>
              <li>
                <a href="#salao" className="inline-block py-1.5 transition-colors hover:text-osso">
                  O salão
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-borda pt-6 text-xs text-fumaca sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {empresa.razaoSocial ?? marca.nome}
            {empresa.cnpj && ` · CNPJ ${empresa.cnpj}`}
          </p>
          <p>
            Site por{" "}
            <span className="text-osso">WCJ Tecnologia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
