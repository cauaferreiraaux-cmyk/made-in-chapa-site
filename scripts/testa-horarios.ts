/**
 * Confere o selo "aberto agora" contra os horários reais da casa.
 *
 * Roda com `npm run testa:horarios`. Importa a MESMA função que a tela usa —
 * um teste que copia a lógica não prova nada sobre o código que está no ar.
 */
import { horarios } from "../conteudo/site";
import { estaAberta } from "../lib/horarios";

// 2026-09-13 é um domingo.
const CASOS: [string, string, boolean][] = [
  ["Domingo 17:30, antes de abrir", "2026-09-13T17:30", false],
  ["Domingo 18:30, aberto", "2026-09-13T18:30", true],
  ["Segunda 00:30, vira do domingo", "2026-09-14T00:30", true],
  ["Segunda 01:30, domingo já fechou", "2026-09-14T01:30", false],
  ["Segunda 17:00, fechado", "2026-09-14T17:00", false],
  ["Quinta 20:00, aberto", "2026-09-17T20:00", true],
  ["Sexta 01:00, vira da quinta", "2026-09-18T01:00", true],
  ["Sexta 02:00, quinta já fechou", "2026-09-18T02:00", false],
  ["Sexta 18:45, ainda não abriu", "2026-09-18T18:45", false],
  ["Sexta 19:30, aberto", "2026-09-18T19:30", true],
  ["Sábado 01:59, vira da sexta", "2026-09-19T01:59", true],
  ["Sábado 02:30, sexta já fechou", "2026-09-19T02:30", false],
  ["Sábado 23:00, aberto", "2026-09-19T23:00", true],
];

if (!horarios) {
  console.error("Sem horários em conteudo/site.ts — nada a verificar.");
  process.exit(1);
}

let falhas = 0;
for (const [nome, quando, esperado] of CASOS) {
  const obtido = estaAberta(horarios, new Date(quando));
  const ok = obtido === esperado;
  if (!ok) falhas++;
  console.log(
    `${ok ? "ok   " : "FALHA"} ${nome.padEnd(34)} esperado=${String(esperado).padEnd(5)} obtido=${obtido}`,
  );
}

console.log(
  falhas ? `\n${falhas} falha(s)` : `\ntodos os ${CASOS.length} casos passaram`,
);
process.exit(falhas ? 1 : 0);
