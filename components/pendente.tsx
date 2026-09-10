/**
 * Marcador de dado que ainda falta.
 *
 * Aparece só em desenvolvimento: em produção retorna `null`, então nada de
 * "a definir" indo ao ar. Serve para você enxergar o buraco enquanto trabalha,
 * sem que ele vire texto público.
 */
export function Pendente({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span className="my-1 inline-flex items-center gap-2 border border-dashed border-ambar/60 bg-ambar/10 px-2 py-1 font-mono text-[11px] tracking-wide text-ambar">
      <span aria-hidden>▲</span>
      PENDENTE: {children}
    </span>
  );
}
