"use client";

import { useEffect, useState } from "react";
import { horarios } from "@/conteudo/site";
import { estaAberta } from "@/lib/horarios";

/**
 * Selo "aberto agora" / "fechado agora".
 *
 * Enquanto `horarios` for `null` em `conteudo/site.ts`, não desenha nada — não
 * existe estado de loja para mostrar sem horário confirmado. Preencha os
 * horários e o selo liga sozinho.
 */
export function StatusLoja() {
  const [aberto, setAberto] = useState<boolean | null>(null);

  useEffect(() => {
    // Capturado numa const local: dentro do closure o TypeScript perde o
    // estreitamento feito direto sobre o import.
    const faixas = horarios;
    if (!faixas) return;
    const atualizar = () => setAberto(estaAberta(faixas, new Date()));
    atualizar();
    const intervalo = setInterval(atualizar, 60_000);
    return () => clearInterval(intervalo);
  }, []);

  // `null` no primeiro render evita divergência entre o HTML gerado no build
  // e o relógio de quem abre a página.
  if (!horarios || aberto === null) return null;

  return (
    <span className="inline-flex items-center gap-2 border border-borda bg-carvao-2/80 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase">
      <span
        className={`size-2 rounded-full ${aberto ? "bg-ambar" : "bg-fumaca"}`}
        aria-hidden
      />
      {aberto ? "Aberto agora" : "Fechado agora"}
    </span>
  );
}
