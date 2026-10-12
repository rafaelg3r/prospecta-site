"use client";

import { ArrowUpRight, LockSimple } from "@phosphor-icons/react";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { webProjects } from "@/content/portfolio";
import { cn } from "@/lib/cn";

const AUTO_ADVANCE_MS = 6000;

// Real sites in a browser frame. Rotates on its own while in view, stops for
// good once the visitor picks a project, and pauses on hover/focus.
export function WebShowcase() {
  const [active, setActive] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || paused || userPicked || reduce) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % webProjects.length), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [inView, paused, userPicked, reduce]);

  const project = webProjects[active];

  function pick(i: number) {
    setActive(i);
    setUserPicked(true);
  }

  return (
    <div
      ref={ref}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Browser frame */}
      <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#0d0a1f] shadow-[0_40px_90px_-30px_rgb(61_20_148/0.7),0_0_0_1px_rgb(255_255_255/0.04)]">
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-1 text-xs text-mute">
            <LockSimple weight="bold" className="size-3 shrink-0" aria-hidden />
            <span className="truncate">{project.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</span>
          </div>
        </div>
        <div className="relative aspect-[1600/778] bg-void">
          {webProjects.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-optimised WebP
            <img
              key={p.slug}
              src={p.image}
              alt={`Página inicial do site ${p.name}`}
              width={1600}
              height={778}
              loading="lazy"
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-top transition-[opacity,transform] duration-700 ease-out-expo",
                i === active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.03] opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      {/* Project switcher */}
      <div role="tablist" aria-label="Projetos de sites" className="mt-5 grid grid-cols-3 gap-2">
        {webProjects.map((p, i) => (
          <button
            key={p.slug}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => pick(i)}
            className={cn(
              "relative overflow-hidden rounded-2xl border px-3 py-3 text-left transition-colors duration-300 sm:px-4",
              i === active ? "border-brand-400/60 bg-brand-500/15" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]",
            )}
          >
            <span className="block font-display text-sm font-semibold leading-tight text-ink sm:truncate sm:text-base">{p.name}</span>
            <span className="hidden truncate text-xs text-mute sm:block">{p.kind}</span>
            {i === active && !userPicked && !reduce && inView && !paused && (
              <span
                key={`${p.slug}-progress`}
                aria-hidden
                className="showcase-progress absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-300"
                style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" role="tabpanel" aria-live="polite">
        <p className="max-w-[52ch] text-mute">{project.summary}</p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-200 transition-colors hover:text-white"
        >
          Ver site ao vivo
          <ArrowUpRight weight="bold" className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
