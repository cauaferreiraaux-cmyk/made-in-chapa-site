import { IconeChama } from "./icones";

export function TituloSecao({
  olho,
  titulo,
  chamada,
}: {
  olho: string;
  titulo: React.ReactNode;
  chamada?: string;
}) {
  return (
    <div className="relative max-w-2xl">
      <div className="flex items-center gap-3">
        <IconeChama className="size-4 text-brasa" />
        <span className="eyebrow text-brasa">{olho}</span>
      </div>
      <h2 className="display mt-5 text-[clamp(2.1rem,9vw,4.75rem)] sm:mt-6">
        {titulo}
      </h2>
      {chamada && (
        <p className="mt-4 text-base leading-relaxed text-fumaca sm:mt-5 sm:text-lg">
          {chamada}
        </p>
      )}
    </div>
  );
}
