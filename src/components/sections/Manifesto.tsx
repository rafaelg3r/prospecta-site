"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// Words wrapped in *asterisks* get the violet italic accent.
const TEXT =
  "Presença sem estratégia é só *vitrine.* Unimos design, conteúdo e estratégia para que cada página, post e vídeo tenha um trabalho: *trazer clientes* até você.";

type Token = { word: string; accent: boolean };

function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  let accent = false;
  for (const raw of text.split(" ")) {
    let word = raw;
    const opens = word.startsWith("*");
    if (opens) {
      accent = true;
      word = word.slice(1);
    }
    const closes = word.endsWith("*");
    if (closes) word = word.slice(0, -1);
    tokens.push({ word, accent });
    if (closes) accent = false;
  }
  return tokens;
}

const TOKENS = tokenize(TEXT);

type WordProps = { token: Token; progress: MotionValue<number>; range: [number, number]; dim: number };

function Word({ token, progress, range, dim }: WordProps) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <m.span
      style={{ opacity }}
      className={token.accent ? "text-violet pr-[0.06em] font-light italic" : undefined}
    >
      {token.word}
    </m.span>
  );
}

// Reading pace = scroll pace: each word lights up as the visitor scrolls past.
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section aria-label="Manifesto" className="px-4 py-28 sm:px-6 md:py-44">
      <p
        ref={ref}
        className="mx-auto max-w-[22ch] text-center font-display text-[clamp(2.1rem,5vw,4.4rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink"
      >
        {/* Same markup on server and client; reduced motion only changes the dim level (none). */}
        {TOKENS.map((token, i) => {
          const start = i / TOKENS.length;
          const end = start + 1 / TOKENS.length;
          return (
            <span key={i}>
              <Word token={token} progress={scrollYProgress} range={[start, end]} dim={reduce ? 1 : 0.2} />
              {i < TOKENS.length - 1 ? " " : null}
            </span>
          );
        })}
      </p>
    </section>
  );
}
