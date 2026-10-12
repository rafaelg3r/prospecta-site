import { cn } from "@/lib/cn";

// Deterministic positions so server and client markup always match.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/*
  Static stars come from one cached, tiled SVG (public/brand/stars.svg), so they
  cost no DOM. Only a handful of twinkling stars are elements, and they animate
  opacity on the compositor.
*/
export function Starfield({ twinkles = 7, seed = 7, className }: { twinkles?: number; seed?: number; className?: string }) {
  const rand = mulberry32(seed);
  const stars = Array.from({ length: twinkles }, () => ({
    x: +(rand() * 100).toFixed(2),
    y: +(rand() * 100).toFixed(2),
    size: +(rand() * 1.6 + 1.6).toFixed(1),
    delay: +(rand() * 4).toFixed(2),
  }));

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-[url(/brand/stars.svg)] bg-[length:640px_640px]", className)}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#e9e6ff] opacity-40 motion-safe:animate-twinkle"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </div>
  );
}
