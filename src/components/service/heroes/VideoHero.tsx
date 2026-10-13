import { FilmStrip, Play } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties } from "react";
import { Starfield } from "@/components/brand/Starfield";
import { HeroCopy } from "@/components/service/heroes/HeroCopy";
import type { ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

// The three parts of every script, as clips on the video track.
const CLIPS = [
  { name: "Gancho", basis: "basis-[22%]", tone: "bg-[linear-gradient(135deg,var(--color-accent-light),var(--color-accent))] text-[#2a0a04]" },
  { name: "Desenvolvimento", basis: "basis-[56%]", tone: "bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] text-white" },
  { name: "CTA", basis: "basis-[22%]", tone: "bg-[linear-gradient(135deg,#9670ea,#5a2bb8)] text-white" },
];

// Static waveform: deterministic heights so server and client render the same bars.
const WAVE = Array.from({ length: 56 }, (_, i) => Math.round(22 + 70 * Math.abs(Math.sin(i * 1.7)) * (0.45 + 0.55 * Math.abs(Math.cos(i * 0.37)))));

// "Timeline de edição": a vertical preview over an editor timeline with a running playhead.
export function VideoHero({ area }: { area: ServiceCategory }) {
  return (
    <section className="relative isolate overflow-hidden">
      <Starfield seed={31} className="-z-10 opacity-50" />
      <div
        aria-hidden
        className="absolute -left-[15%] top-[5%] -z-10 aspect-square w-[min(1000px,140vw)] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent)]"
      />
      {/* Letterbox bars: the page opens like a film frame */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-6 bg-black/50 md:h-10" />

      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 pb-16 pt-14 sm:px-6 md:pb-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 lg:px-10 lg:pt-20">
        <HeroCopy area={area} />

        <div aria-hidden className="intro-fade panel rounded-3xl p-3 sm:p-4" style={delay(0.2)}>
          <div className="flex items-center justify-between px-2 pb-3 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="flex items-center gap-2 text-ink">
              <span className="hero-rec size-2.5 rounded-full bg-[#ff4d4d] shadow-[0_0_12px_2px_rgb(255_77_77/0.6)]" />
              Rec
            </span>
            <span className="flex items-center gap-2 text-mute">
              <FilmStrip weight="bold" className="size-4 text-accent-light" />
              Vertical 9:16
            </span>
          </div>

          {/* Preview */}
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl bg-black/45">
            <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="relative h-[88%] aspect-[9/16] overflow-hidden rounded-xl bg-[linear-gradient(165deg,var(--color-accent-strong)_0%,#5a2bb8_55%,#1b0b4f_100%)] shadow-[0_24px_50px_-20px_rgb(0_0_0/0.9)]">
              <span className="absolute inset-x-[12%] top-[12%] h-[5%] rounded-full bg-white/85" />
              <span className="absolute inset-x-[22%] top-[20%] h-[4%] rounded-full bg-white/55" />
              <span className="absolute left-1/2 top-1/2 inline-flex size-[26%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40">
                <Play weight="fill" className="size-1/2 translate-x-[6%] text-white" />
              </span>
              <span className="absolute inset-x-[10%] bottom-[8%] h-[6%] rounded-full bg-white" />
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-3 rounded-2xl bg-black/35 p-3 sm:p-4">
            <div className="flex gap-3">
              <div className="flex w-7 shrink-0 flex-col gap-2 pt-5 text-[0.65rem] font-bold text-mute">
                <span className="flex h-10 items-center">V1</span>
                <span className="flex h-8 items-center">A1</span>
              </div>
              <div className="relative min-w-0 flex-1">
                <div className="flex h-3 items-end justify-between">
                  {Array.from({ length: 25 }, (_, i) => (
                    <span key={i} className={cn("w-px bg-white/25", i % 4 === 0 ? "h-3" : "h-1.5")} />
                  ))}
                </div>
                <div className="mt-2 flex h-10 gap-1">
                  {CLIPS.map((clip) => (
                    <span
                      key={clip.name}
                      className={cn("flex min-w-0 items-center truncate rounded-lg px-2 text-[0.65rem] font-bold sm:text-xs", clip.basis, clip.tone)}
                    >
                      {clip.name}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex h-8 items-center gap-[2px]">
                  {WAVE.map((h, i) => (
                    <span key={i} className="flex-1 rounded-full bg-accent/55" style={{ height: `${h}%` }} />
                  ))}
                </div>

                {/* Playhead: a full-width layer slid across, the line sits at its left edge */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="hero-playhead absolute inset-0">
                    <span className="absolute -top-0.5 left-0 h-[calc(100%+2px)] w-0.5 bg-white shadow-[0_0_10px_rgb(255_255_255/0.8)]" />
                    <span className="absolute -left-[5px] -top-1 size-3 rotate-45 rounded-[2px] bg-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
