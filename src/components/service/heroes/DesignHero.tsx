import type { CSSProperties } from "react";
import { Starfield } from "@/components/brand/Starfield";
import { HeroCopy } from "@/components/service/heroes/HeroCopy";
import { designPieces } from "@/content/portfolio";
import type { ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// Where each pinned post sits on the board (wrapper floats, inner element tilts).
const PINS = [
  { box: "left-[0%] top-[12%] w-[44%] z-10", tilt: "-rotate-[7deg]", float: "0s" },
  { box: "left-[29%] top-[24%] w-[46%] z-20", tilt: "rotate-[3deg]", float: "-3s" },
  { box: "right-[0%] top-[2%] w-[38%] z-10", tilt: "rotate-[9deg]", float: "-6s" },
];

const SWATCHES = ["bg-accent", "bg-accent-light", "bg-brand-500", "bg-ink", "bg-void"];

// "Moodboard": real posts pinned to a board, next to a palette and a type specimen.
export function DesignHero({ area }: { area: ServiceCategory }) {
  const posts = designPieces.slice(0, PINS.length);

  return (
    <section className="relative isolate overflow-hidden">
      <Starfield seed={23} className="-z-10 opacity-60" />
      <div
        aria-hidden
        className="absolute -right-[20%] top-[10%] -z-10 aspect-square w-[min(1000px,140vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="absolute -left-[25%] bottom-[-20%] -z-10 aspect-square w-[min(900px,120vw)] rounded-full bg-[radial-gradient(closest-side,rgb(119_68_219/0.2),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pb-24 lg:grid-cols-[1.02fr_1fr] lg:gap-10 lg:px-10 lg:pt-20">
        <HeroCopy area={area} />

        <div className="intro-fade relative mx-auto aspect-square w-full max-w-[580px]" style={delay(0.2)}>
          {posts.map((post, i) => (
            <figure key={post.slug} className={cn("absolute m-0 motion-safe:animate-float", PINS[i].box)} style={{ animationDelay: PINS[i].float }}>
              <div className={cn("relative", PINS[i].tilt)}>
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 z-10 h-6 w-16 -translate-x-1/2 -rotate-3 rounded-sm bg-accent-light/35"
                />
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-optimised WebP */}
                <img
                  src={post.image}
                  alt={`Post "${post.title}" criado pela Prospecta`}
                  width={512}
                  height={640}
                  decoding="async"
                  className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_34px_60px_-24px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.1)]"
                />
              </div>
            </figure>
          ))}

          <div className="panel absolute bottom-[3%] left-[2%] z-30 rounded-2xl p-3 sm:p-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent-light sm:text-xs">Paleta</p>
            <div aria-hidden className="mt-2 flex gap-1.5 sm:gap-2">
              {SWATCHES.map((swatch) => (
                <span key={swatch} className={cn("size-6 rounded-full ring-1 ring-white/25 sm:size-8", swatch)} />
              ))}
            </div>
          </div>

          <div className="panel absolute bottom-[8%] right-[2%] z-30 rounded-2xl px-4 py-3 sm:px-5 sm:py-4">
            <p aria-hidden className="font-display text-5xl font-semibold leading-none text-accent-gradient sm:text-6xl">
              Aa
            </p>
            <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent-light sm:text-xs">Tipografia</p>
          </div>
        </div>
      </div>
    </section>
  );
}
