"use client";

import { useEffect, useRef } from "react";

/**
 * Revela o conteúdo quando ele entra na tela, uma vez só.
 *
 * O elemento nasce com opacidade zero pelo CSS e o observador liga o
 * `data-visivel`. Se o JavaScript não rodar, o `<noscript>` do layout força
 * tudo visível — página escondida por script quebrado seria pior que não animar.
 */
export function Revelar({
  children,
  atraso = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  atraso?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            elemento.dataset.visivel = "true";
            observador.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — o ref é genérico demais para o union de tags
      ref={ref}
      className={`revelar ${className}`}
      style={{ animationDelay: `${atraso}ms` }}
    >
      {children}
    </Tag>
  );
}
