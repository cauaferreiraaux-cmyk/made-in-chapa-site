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
      <h2 className="display mt-4 text-[clamp(2.5rem,7vw,4.75rem)]">{titulo}</h2>
      {chamada && (
        <p className="mt-5 text-lg leading-relaxed text-fumaca">{chamada}</p>
      )}
    </div>
  );
}
