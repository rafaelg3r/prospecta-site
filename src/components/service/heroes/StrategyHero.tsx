import type { CSSProperties } from "react";
import { Starfield } from "@/components/brand/Starfield";
import { HeroCopy } from "@/components/service/heroes/HeroCopy";
import type { ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// Targets on the radar: chapters of the Diagnóstico Digital (Notion). Positions in % of the radar box.
const TARGETS = [
  { label: "Público", left: 66, top: 26, side: "left" },
  { label: "Concorrentes", left: 24, top: 38, side: "right" },
  { label: "Posicionamento", left: 62, top: 66, side: "left" },
  { label: "Oportunidades", left: 30, top: 78, side: "right" },
] as const;

const RINGS = [60, 120, 180, 240];
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

// "Radar": the market scanned in a sweep, with the diagnostic chapters lighting up as targets.
export function StrategyHero({ area }: { area: ServiceCategory }) {
  return (
    <section className="relative isolate overflow-hidden">
      <Starfield seed={41} className="-z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-[15%] top-[0%] -z-10 aspect-square w-[min(1100px,150vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pb-24 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:px-10 lg:pt-20">
        <HeroCopy area={area} />

        <div aria-hidden className="intro-fade relative mx-auto aspect-square w-full max-w-[560px]" style={delay(0.2)}>
          <svg viewBox="-250 -250 500 500" className="absolute inset-0 h-full w-full overflow-visible">
            <circle r="248" fill="rgb(8 3 26 / 0.6)" />
            {RINGS.map((r, i) => (
              <circle
                key={r}
                r={r}
                fill="none"
                stroke="var(--color-accent)"
                strokeOpacity={i === RINGS.length - 1 ? 0.6 : 0.22}
                strokeWidth={i === RINGS.length - 1 ? 2 : 1}
              />
            ))}
            <line x1="-240" y1="0" x2="240" y2="0" stroke="var(--color-accent)" strokeOpacity="0.2" />
            <line x1="0" y1="-240" x2="0" y2="240" stroke="var(--color-accent)" strokeOpacity="0.2" />
            {TICKS.map((deg) => (
              <line
                key={deg}
                x1="0"
                y1={deg % 30 === 0 ? -226 : -233}
                x2="0"
                y2="-240"
                stroke="var(--color-accent-light)"
                strokeOpacity={deg % 30 === 0 ? 0.7 : 0.3}
                strokeWidth={deg % 30 === 0 ? 2 : 1}
                transform={`rotate(${deg})`}
              />
            ))}
          </svg>

          {/* Sweep: a conic beam rotated on the compositor */}
          <div className="absolute inset-[4%] overflow-hidden rounded-full">
            <div className="hero-sweep absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,color-mix(in_oklab,var(--color-accent)_55%,transparent)_0deg,transparent_75deg,transparent_360deg)]" />
          </div>

          <span className="absolute left-1/2 top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_10px_color-mix(in_oklab,var(--color-accent)_20%,transparent),0_0_30px_var(--color-accent)]" />

          {TARGETS.map((t, i) => (
            <span
              key={t.label}
              className={cn("absolute flex -translate-y-1/2 items-center gap-2.5", t.side === "left" ? "-translate-x-full flex-row-reverse" : "")}
              style={{ left: `${t.left}%`, top: `${t.top}%` }}
            >
              <span className="relative inline-flex size-3.5 shrink-0">
                <span className="hero-ping absolute inset-0 rounded-full bg-accent" style={{ animationDelay: `${i * 0.65}s` }} />
                <span className="relative size-3.5 rounded-full bg-accent-light ring-2 ring-[#08031a]" />
              </span>
              <span className="whitespace-nowrap rounded-full border border-accent/40 bg-[#08031a]/90 px-3 py-1 text-xs font-semibold text-ink sm:text-sm">
                {t.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
