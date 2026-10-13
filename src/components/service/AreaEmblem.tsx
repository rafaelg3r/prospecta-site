import type { CSSProperties, ReactNode } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";

const RINGS = [
  { rx: 170, ry: 66 },
  { rx: 232, ry: 90 },
  { rx: 290, ry: 113 },
];

// Where the floating service tags sit around the planet, in % of the emblem box.
const TAG_SPOTS: CSSProperties[] = [
  { left: "2%", top: "16%" },
  { right: "0%", top: "40%" },
  { left: "8%", bottom: "14%" },
];

/*
  Hero visual of a service page: the area icon as a planet, the brand orbits
  around it and a few of the area's services floating as tags.
  Satellites use OrbitDot (compositor-only), tags float with CSS transforms.
*/
export function AreaEmblem({ icon, tags }: { icon: ReactNode; tags: string[] }) {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-[min(86vw,520px)]">
      <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(closest-side,rgb(119_68_219/0.45),transparent)]" />
      <svg viewBox="-300 -300 600 600" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="emblem-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d3c4fb" />
            <stop offset="0.5" stopColor="#7744db" />
            <stop offset="1" stopColor="#3d1494" />
          </linearGradient>
          <radialGradient id="emblem-planet" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#a77bff" />
            <stop offset="0.55" stopColor="#5a2bb8" />
            <stop offset="1" stopColor="#24095e" />
          </radialGradient>
        </defs>
        <g transform="rotate(-24)" fill="none">
          {RINGS.map((r, i) => (
            <ellipse
              key={r.rx}
              rx={r.rx}
              ry={r.ry}
              stroke={i === 1 ? "url(#emblem-ring)" : "rgb(237 236 242 / 0.16)"}
              strokeWidth={i === 1 ? 2.6 : 1.3}
              strokeDasharray={i === 1 ? undefined : "3 9"}
            />
          ))}
        </g>
        <circle r="108" fill="url(#emblem-planet)" />
        <circle r="108" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.5" />
      </svg>

      <OrbitDot rx={232} ry={90} r={9} unitsWide={600} tilt={-24} angle={200} duration={18} color="#ffffff" />
      <OrbitDot rx={290} ry={113} r={6} unitsWide={600} tilt={-24} angle={20} duration={26} color="#b49cf5" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white">{icon}</div>

      {tags.slice(0, TAG_SPOTS.length).map((tag, i) => (
        <span
          key={tag}
          className="absolute max-w-[46%] motion-safe:animate-float"
          style={{ ...TAG_SPOTS[i], animationDelay: `${i * -3}s` }}
        >
          <span className="block truncate rounded-full border border-white/15 bg-[#120842]/85 px-3.5 py-1.5 text-xs font-semibold text-ink shadow-[0_10px_30px_-12px_rgb(0_0_0/0.8)] sm:px-4 sm:py-2 sm:text-sm">
            {tag}
          </span>
        </span>
      ))}
    </div>
  );
}
