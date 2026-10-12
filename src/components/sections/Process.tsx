"use client";

import { m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { name: "Diagnóstico", text: "Entendemos seu negócio, seu público e onde você está perdendo clientes hoje." },
  { name: "Estratégia", text: "Definimos o objetivo, o posicionamento e as métricas que vamos acompanhar juntos." },
  { name: "Produção", text: "Criamos site, posts, carrosséis, roteiros e Reels pensados para converter." },
  { name: "Revisão", text: "Medimos os resultados, revisamos com você e ajustamos a rota." },
];

// Arc: quadratic curve from (20,100) through control (500,-40) to (980,100) in a 1000x120 box.
// Node positions are sampled from that same curve, at each column's center.
const ARC = "M 20 100 Q 500 -40 980 100";
const NODES = [0.125, 0.375, 0.625, 0.875].map((xPct) => {
  const t = (xPct * 1000 - 20) / 960;
  const y = 100 * (1 - t) ** 2 + 2 * -40 * t * (1 - t) + 100 * t ** 2;
  return { left: `${xPct * 100}%`, top: y, t };
});

function ArcNode({ progress, node }: { progress: MotionValue<number>; node: (typeof NODES)[number] }) {
  const lit = useTransform(progress, [node.t - 0.06, node.t + 0.02], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.4, 1]);
  return (
    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: node.left, top: node.top }}>
      <span className="relative flex size-5 items-center justify-center rounded-full border border-white/25 bg-void">
        <m.span className="size-2.5 rounded-full bg-brand-300 shadow-[0_0_18px_4px_rgb(150_112_234/0.6)]" style={{ opacity: lit, scale }} />
      </span>
    </span>
  );
}

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="metodo" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Um método claro, do primeiro contato ao <span className="text-violet pr-[0.06em] font-light italic">resultado.</span>
          </h2>
        </Reveal>

        <div ref={ref} className="mt-16 md:mt-24">
          {/* Desktop: the steps sit on an orbit arc that draws itself as you scroll. */}
          <div className="relative hidden h-[120px] lg:block" aria-hidden>
            <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
              <path d={ARC} fill="none" stroke="rgb(237 236 242 / 0.1)" strokeWidth="1.2" strokeDasharray="3 8" vectorEffect="non-scaling-stroke" />
              <m.path
                d={ARC}
                fill="none"
                stroke="url(#process-arc)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: draw }}
              />
              <defs>
                <linearGradient id="process-arc" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#5a2bb8" />
                  <stop offset="0.5" stopColor="#b49cf5" />
                  <stop offset="1" stopColor="#7744db" />
                </linearGradient>
              </defs>
            </svg>
            {NODES.map((node) => (
              <ArcNode key={node.left} progress={draw} node={node} />
            ))}
          </div>

          <ol className="relative grid gap-12 border-l border-white/10 pl-8 lg:mt-12 lg:grid-cols-4 lg:gap-10 lg:border-0 lg:pl-0">
            {STEPS.map((step, i) => (
              <Reveal as="li" key={step.name} delay={i * 0.1} className="relative lg:text-center">
                <span
                  aria-hidden
                  className="absolute -left-[calc(2rem+5px)] top-3 size-2.5 rounded-full bg-brand-400 shadow-[0_0_14px_3px_rgb(150_112_234/0.5)] lg:hidden"
                />
                <h3 className="font-display text-3xl font-semibold tracking-[-0.02em] text-ink md:text-4xl">{step.name}</h3>
                <p className="mt-3 leading-relaxed text-mute lg:mx-auto lg:max-w-[28ch]">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
