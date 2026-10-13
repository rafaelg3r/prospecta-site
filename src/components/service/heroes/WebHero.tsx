import { LockSimple } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties } from "react";
import { Starfield } from "@/components/brand/Starfield";
import { HeroCopy } from "@/components/service/heroes/HeroCopy";
import { webProjects } from "@/content/portfolio";
import type { ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// Wireframe blocks, in % of the browser viewport. Only the left side shows (clip-path).
const WIRE: { l: number; t: number; w: number; h: number; round?: boolean; media?: boolean }[] = [
  { l: 4, t: 5, w: 12, h: 4 },
  { l: 62, t: 5.5, w: 7, h: 3 },
  { l: 72, t: 5.5, w: 7, h: 3 },
  { l: 82, t: 5.5, w: 12, h: 4.5, round: true },
  { l: 6, t: 22, w: 40, h: 8 },
  { l: 6, t: 33, w: 30, h: 8 },
  { l: 6, t: 47, w: 34, h: 2.6 },
  { l: 6, t: 52, w: 27, h: 2.6 },
  { l: 6, t: 61, w: 15, h: 7, round: true },
  { l: 52, t: 20, w: 42, h: 50, media: true },
  { l: 6, t: 78, w: 27, h: 16 },
  { l: 37, t: 78, w: 27, h: 16 },
  { l: 68, t: 78, w: 27, h: 16 },
];

// "Do wireframe ao site": one browser, half sketch (a real step of our process), half the finished site.
export function WebHero({ area }: { area: ServiceCategory }) {
  const shot = webProjects[0];
  const tabs = area.offers.slice(0, 3).map((o) => o.short ?? o.name);
  const chips = area.toolkit.items.slice(0, 3);

  return (
    <section className="relative isolate overflow-hidden pb-16 pt-14 md:pb-28 md:pt-20">
      <Starfield seed={11} className="-z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[42%] -z-10 aspect-square w-[min(1200px,160vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(119_68_219/0.24),transparent)]"
      />

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <HeroCopy area={area} align="center" />

        <div className="intro-fade relative mx-auto mt-14 max-w-6xl md:mt-20" style={delay(0.25)}>
          {chips.map((chip, i) => (
            <span
              key={chip}
              aria-hidden
              className={cn(
                "absolute z-10 hidden motion-safe:animate-float lg:block",
                i === 0 && "-left-10 top-[34%]",
                i === 1 && "-right-8 top-[16%]",
                i === 2 && "-right-12 bottom-[18%]",
              )}
              style={{ animationDelay: `${i * -3}s` }}
            >
              <span className="flex items-center gap-2 rounded-full border border-white/12 bg-surface-2 px-4 py-2 text-sm font-semibold text-ink shadow-[0_18px_40px_-16px_rgb(0_0_0/0.9)]">
                {chip}
              </span>
            </span>
          ))}

          <div className="[perspective:2200px]">
            <div className="origin-top md:[transform:rotateX(9deg)]">
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0d0a1f] shadow-[0_60px_120px_-50px_rgb(0_0_0/0.95)] sm:rounded-3xl">
                {/* Tabs: the web offers */}
                <div className="flex items-end gap-3 border-b border-white/[0.08] bg-white/[0.03] px-4 pt-3">
                  <div aria-hidden className="mb-3 flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                    <span className="size-2.5 rounded-full bg-white/20" />
                  </div>
                  <ul className="flex min-w-0 gap-1" aria-label="Formatos de site">
                    {tabs.map((tab, i) => (
                      <li
                        key={tab}
                        className={cn(
                          "truncate rounded-t-xl px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm",
                          i === 0 ? "border border-b-0 border-white/10 bg-[#0d0a1f] text-ink" : "hidden text-mute sm:block",
                        )}
                      >
                        {tab}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2 text-xs text-mute">
                  <LockSimple weight="bold" className="size-3" aria-hidden />
                  {shot.url.replace(/^https:\/\//, "").replace(/\/$/, "")}
                </div>

                <div className="relative aspect-[1600/778] bg-void">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-optimised WebP */}
                  <img
                    src={shot.image}
                    alt={`Site ${shot.name}, criado pela Prospecta`}
                    width={1600}
                    height={778}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />

                  <div aria-hidden className="absolute inset-0 bg-[#0f0b26] [clip-path:polygon(0_0,58%_0,38%_100%,0_100%)]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    {WIRE.map((b, i) => (
                      <span
                        key={i}
                        className={cn(
                          "absolute border border-dashed border-white/30 bg-white/[0.05]",
                          b.round ? "rounded-full" : "rounded-md",
                          b.media &&
                            "bg-[linear-gradient(to_top_right,transparent_calc(50%-1px),rgb(255_255_255/0.25),transparent_calc(50%+1px)),linear-gradient(to_top_left,transparent_calc(50%-1px),rgb(255_255_255/0.25),transparent_calc(50%+1px))]",
                        )}
                        style={{ left: `${b.l}%`, top: `${b.t}%`, width: `${b.w}%`, height: `${b.h}%` }}
                      />
                    ))}
                  </div>

                  <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <line x1="58" y1="0" x2="38" y2="100" stroke="var(--color-accent-light)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  </svg>

                  <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#0f0b26] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-mute sm:bottom-5 sm:left-5 sm:text-xs">
                    Wireframe
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-accent px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[#0a0526] sm:bottom-5 sm:right-5 sm:text-xs">
                    No ar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
