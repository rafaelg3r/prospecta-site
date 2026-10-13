"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { REVEAL_MARGIN } from "@/components/ui/reveal-margin";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article";
  /** Service area slug: scopes the accent colour (see [data-area] in globals.css). */
  area?: string;
};

// Enter-on-scroll fade/rise. Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
export function Reveal({ children, className, delay = 0, y = 28, as = "div", area }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      data-area={area}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: REVEAL_MARGIN }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
