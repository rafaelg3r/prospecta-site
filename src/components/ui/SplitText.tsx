"use client";

import { useInView } from "motion/react";
import { REVEAL_MARGIN } from "@/components/ui/reveal-margin";
import { Children, cloneElement, isValidElement, useRef, type CSSProperties, type ReactElement, type ReactNode } from "react";

type Unit = { key: string; index: number; node: ReactNode };

// Plain words split on spaces; an element whose only child is text (the italic
// accent span) is split too, each word keeping the element's classes, so the
// line can still wrap inside it. Anything else moves as one unit.
function toUnits(children: ReactNode): (Unit | " ")[] {
  const out: (Unit | " ")[] = [];
  let index = 0;
  Children.forEach(children, (child, ci) => {
    if (typeof child === "string" || typeof child === "number") {
      String(child)
        .split(/(\s+)/)
        .forEach((word, wi) => {
          if (!word) return;
          out.push(/^\s+$/.test(word) ? " " : { key: `${ci}-${wi}`, index: index++, node: word });
        });
      return;
    }
    if (isValidElement<{ children?: ReactNode }>(child) && typeof child.props.children === "string") {
      const el = child as ReactElement<{ children?: ReactNode }>;
      el.props.children!.toString()
        .split(/(\s+)/)
        .forEach((word, wi) => {
          if (!word) return;
          out.push(/^\s+$/.test(word) ? " " : { key: `${ci}-${wi}`, index: index++, node: cloneElement(el, { key: wi }, word) });
        });
      return;
    }
    if (child != null && typeof child !== "boolean") out.push({ key: `${ci}`, index: index++, node: child });
  });
  return out;
}

// Headline words rise from their own masks, in sequence, the first time the
// headline is in view (styles: .split / .split-unit in globals.css).
// Screen readers get the sentence as written.
export function SplitText({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5, margin: REVEAL_MARGIN });
  const units = toUnits(children);

  return (
    <span ref={ref} className="split" data-inview={inView || undefined}>
      {units.map((unit) =>
        unit === " " ? (
          " "
        ) : (
          <span key={unit.key} className="split-unit">
            <span style={{ "--i": unit.index } as CSSProperties}>{unit.node}</span>
          </span>
        ),
      )}
    </span>
  );
}
