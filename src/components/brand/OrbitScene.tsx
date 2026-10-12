"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";
import { ProspectaMark } from "@/components/brand/ProspectaMark";
import { cn } from "@/lib/cn";

// Satellites on tilted orbits: the clients a strong brand pulls in.
// The tilt matches the angle of the ring in the logo.
const TILT = -30;
const UNITS = 1200;
const ORBITS = [
  { id: "o1", rx: 300, ry: 118, dur: 22, dash: undefined, dots: [{ r: 6, color: "#ffffff", angle: 40 }, { r: 3.5, color: "#b49cf5", angle: 220 }] },
  { id: "o2", rx: 420, ry: 165, dur: 34, dash: undefined, dots: [{ r: 7, color: "#9670ea", angle: 120 }, { r: 4, color: "#ffffff", angle: 300 }] },
  { id: "o3", rx: 540, ry: 212, dur: 50, dash: "2 10", dots: [{ r: 4.5, color: "#d3c4fb", angle: 200 }] },
];

type OrbitSceneProps = {
  className?: string;
  /** Pointer parallax. */
  interactive?: boolean;
};

export function OrbitScene({ className, interactive = true }: OrbitSceneProps) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const markX = useTransform(sx, (v) => v * 22);
  const markY = useTransform(sy, (v) => v * 16);
  const orbitX = useTransform(sx, (v) => v * -12);
  const orbitY = useTransform(sy, (v) => v * -9);

  useEffect(() => {
    if (!interactive || reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, reduce, px, py]);

  return (
    <div className={cn("relative aspect-square w-full", className)} aria-hidden>
      {/* violet bloom behind the planet; the radial gradient is already soft, no blur filter needed */}
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgb(119_68_219/0.42)_0%,rgb(61_20_148/0.16)_38%,transparent_66%)]" />

      <m.div className="absolute inset-0" style={{ x: orbitX, y: orbitY }}>
        <svg viewBox={`${-UNITS / 2} ${-UNITS / 2} ${UNITS} ${UNITS}`} className="absolute inset-0 h-full w-full overflow-visible">
          <g transform={`rotate(${TILT})`} fill="none" stroke="rgb(237 236 242 / 0.2)" strokeWidth="1.4">
            {ORBITS.map((o) => (
              <ellipse key={o.id} rx={o.rx} ry={o.ry} strokeDasharray={o.dash} />
            ))}
          </g>
        </svg>
        {ORBITS.flatMap((o) =>
          o.dots.map((d) => (
            <OrbitDot
              key={`${o.id}-${d.angle}`}
              rx={o.rx}
              ry={o.ry}
              r={d.r}
              unitsWide={UNITS}
              tilt={TILT}
              angle={d.angle}
              duration={o.dur}
              color={d.color}
            />
          )),
        )}
      </m.div>

      <m.div className="absolute inset-[21%]" style={{ x: markX, y: markY }}>
        <div className="h-full w-full motion-safe:animate-float">
          <ProspectaMark className="h-full w-full object-contain" />
        </div>
      </m.div>
    </div>
  );
}
