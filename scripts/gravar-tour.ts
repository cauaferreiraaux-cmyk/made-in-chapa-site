/**
 * Grava um passeio pelo site, para mostrar ao cliente.
 *
 * Roda contra a BUILD de produção servida em localhost:3200 — não contra o
 * `next dev`. No modo de desenvolvimento a página carrega o indicador do Next
 * no canto e recompila enquanto grava, e as duas coisas aparecem no vídeo.
 *
 *   npm run build
 *   python3 -m http.server 3200 --directory out &
 *   npm run grava:tour
 */
import { chromium } from "playwright";

const ALVO = process.env.ALVO ?? "http://localhost:3200";
const SAIDA = process.env.SAIDA ?? "/tmp/tour-made-in-chapa";
const LARGURA = Number(process.env.LARGURA ?? 1440);
const ALTURA = Number(process.env.ALTURA ?? 900);

/**
 * Rolagem com aceleração e frenagem — velocidade constante fica robótica.
 *
 * O código vai como STRING de propósito: o tsx compila com "keep names" e
 * injeta chamadas a `__name` nas funções, que não existe dentro do navegador.
 * Passar texto puro contorna isso.
 */
async function rolarAte(
  pagina: import("playwright").Page,
  seletor: string,
  ms = 1600,
) {
  await pagina.evaluate(`
    new Promise((pronto) => {
      const alvo = document.querySelector(${JSON.stringify(seletor)});
      if (!alvo) return pronto();
      const inicio = window.scrollY;
      const fim = window.scrollY + alvo.getBoundingClientRect().top;
      const t0 = performance.now();
      requestAnimationFrame(function passo(agora) {
        const t = Math.min(1, (agora - t0) / ${ms});
        const suave = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2;
        window.scrollTo(0, inicio + (fim - inicio) * suave);
        if (t < 1) requestAnimationFrame(passo); else pronto();
      });
    })
  `);
}

async function main() {
  const navegador = await chromium.launch();
  const contexto = await navegador.newContext({
    viewport: { width: LARGURA, height: ALTURA },
    deviceScaleFactor: 1,
    recordVideo: { dir: SAIDA, size: { width: LARGURA, height: ALTURA } },
    reducedMotion: "no-preference",
  });

  const pagina = await contexto.newPage();
  await pagina.goto(ALVO, { waitUntil: "networkidle" });

  // a entrada em cascata é o primeiro efeito que o cliente vê
  await pagina.waitForTimeout(2500);
  // tempo parado no topo: o rodízio troca de peça sozinho
  await pagina.waitForTimeout(6000);

  await rolarAte(pagina, "#cardapio", 1800);
  await pagina.waitForTimeout(2200);

  // passeia pelas categorias
  for (const nome of ["Burgers gourmet", "Combos", "Porções"]) {
    const aba = pagina.getByRole("tab", { name: nome });
    if (await aba.count()) {
      await aba.first().click();
      await pagina.waitForTimeout(1500);
    }
  }

  await rolarAte(pagina, "#fotos", 1500);
  await pagina.waitForTimeout(1500);

  // abre uma foto em tela cheia e passa para a seguinte
  const foto = pagina.locator('#fotos button[aria-label^="Ampliar"]').nth(1);
  if (await foto.count()) {
    await foto.click();
    await pagina.waitForTimeout(1800);
    await pagina.getByRole("button", { name: "Próxima foto" }).click();
    await pagina.waitForTimeout(1600);
    await pagina.keyboard.press("Escape");
    await pagina.waitForTimeout(800);
  }

  await rolarAte(pagina, "#salao", 1500);
  await pagina.waitForTimeout(2200);

  await rolarAte(pagina, "#pedir", 1500);
  await pagina.waitForTimeout(2600);

  await rolarAte(pagina, "footer", 1400);
  await pagina.waitForTimeout(2400);

  await contexto.close();
  await navegador.close();
  console.log("vídeo bruto em", SAIDA);
}

main();
