import { BotaoFlutuante } from "@/components/botao-flutuante";
import { Cabecalho } from "@/components/cabecalho";
import { Cardapio } from "@/components/cardapio";
import { CombosDestaque } from "@/components/combos-destaque";
import { ComoPedir } from "@/components/como-pedir";
import { FaixaRolante } from "@/components/faixa-rolante";
import { Galeria } from "@/components/galeria";
import { Hero } from "@/components/hero";
import { Rodape } from "@/components/rodape";
import { Salao } from "@/components/salao";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <main>
        <Hero />
        <FaixaRolante />
        <CombosDestaque />
        <Cardapio />
        <Galeria />
        <Salao />
        <ComoPedir />
      </main>
      <Rodape />
      <BotaoFlutuante />
    </>
  );
}
