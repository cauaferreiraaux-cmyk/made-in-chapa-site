import type { FaixaHorario } from "@/conteudo/site";

function minutosDe(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/**
 * A casa está aberta neste instante?
 *
 * O caso que faz esse cálculo errar é a faixa que passa da meia-noite: fechar
 * às 02:00 significa que 01:30 de sábado ainda pertence à noite de sexta. E
 * como sexta E sábado estão na mesma faixa, não basta perguntar "hoje está na
 * faixa e já abriu?" — 01:30 de sábado é antes das 19:00, mas está aberto.
 * Por isso as duas perguntas são independentes e somadas no fim.
 */
export function estaAberta(faixas: FaixaHorario[], agora: Date): boolean {
  const dia = agora.getDay();
  const diaAnterior = (dia + 6) % 7;
  const minutoAtual = agora.getHours() * 60 + agora.getMinutes();

  return faixas.some((faixa) => {
    const abre = minutosDe(faixa.abre);
    const fecha = minutosDe(faixa.fecha);
    const viraODia = fecha <= abre;

    const abertoHoje =
      faixa.dias.includes(dia) &&
      (viraODia ? minutoAtual >= abre : minutoAtual >= abre && minutoAtual < fecha);

    // madrugada que ainda é da noite anterior
    const sobraDeOntem =
      viraODia && faixa.dias.includes(diaAnterior) && minutoAtual < fecha;

    return abertoHoje || sobraDeOntem;
  });
}
