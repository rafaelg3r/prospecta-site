"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

// Pulls its child a few pixels toward the cursor. Pure motion values, no re-renders.
export function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div className="inline-flex" style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </m.div>
  );
}
