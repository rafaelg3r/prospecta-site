"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";
import { ProspectaMark } from "@/components/brand/ProspectaMark";
import { serviceCategories, serviceHref } from "@/content/services";

type Destination = { path: string; label: string; area?: string };

const DESTINATIONS: Destination[] = [
  { path: "/", label: "Início" },
  ...serviceCategories.map((c) => ({ path: serviceHref(c.slug), label: c.name, area: c.slug })),
];

type Run = {
  id: number;
  phase: "cover" | "reveal";
  dest: Destination;
  href: string;
  /** Click point and the radius that reaches the farthest viewport corner from it. */
  x: number;
  y: number;
  r: number;
};

const COVER_MS = 650;
const HOLD_MS = 460; // minimum time the destination name stays on screen
const LIFT_MS = 820;
const SAFETY_MS = 6000; // lift anyway if the new page never arrives
const RIM = 64; // px of accent that lead the wipe and trail the lift
const IN_OUT = "cubic-bezier(0.76, 0, 0.24, 1)";
const OUT = "cubic-bezier(0.16, 1, 0.3, 1)";

const clean = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

/*
  Route change as a little eclipse. Clicking a link to another page grows two
  circles from the click point (the destination's accent, then the night sky),
  the Prospecta mark spins up a satellite while the destination's name rises,
  and once the new page has rendered underneath, the curtain lifts.

  Links are intercepted in the capture phase: next/link skips its own navigation
  when the click is already defaultPrevented, and we push once the screen is
  covered. Same-page and hash links, new tabs, modified clicks and reduced
  motion are left alone. Back/forward navigation is not animated.
*/
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [run, setRun] = useState<Run | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const live = useRef({ id: 0, busy: false, coveredAt: 0 });

  // 1. Intercept clicks on links to another page.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || reduce.matches) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin || clean(url.pathname) === clean(window.location.pathname)) return;

      e.preventDefault();
      if (live.current.busy) return;
      live.current.busy = true;

      // Keyboard activation has no pointer position: start from the link itself.
      let { clientX: x, clientY: y } = e;
      if (e.detail === 0) {
        const box = link.getBoundingClientRect();
        x = box.left + box.width / 2;
        y = box.top + box.height / 2;
      }
      const w = window.innerWidth;
      const h = window.innerHeight;
      const r = Math.ceil(Math.max(Math.hypot(x, y), Math.hypot(w - x, y), Math.hypot(x, h - y), Math.hypot(w - x, h - y)));
      const path = clean(url.pathname);

      setRun({
        id: ++live.current.id,
        phase: "cover",
        dest: DESTINATIONS.find((d) => d.path === path) ?? { path, label: "" },
        href: url.pathname + url.search + url.hash,
        x,
        y,
        r,
      });
    };

    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  // 2. Cover the screen, then navigate underneath.
  useEffect(() => {
    if (run?.phase !== "cover" || !root.current) return;
    const { id, href } = run;
    const el = root.current;
    document.documentElement.dataset.pageTransition = "cover";

    const circles = [...el.querySelectorAll<HTMLElement>(".pt-circle")].map((circle, i) =>
      circle.animate(
        [{ transform: "translate(-50%, -50%) scale(0)" }, { transform: "translate(-50%, -50%) scale(1)" }],
        { duration: COVER_MS, delay: i * 110, easing: IN_OUT, fill: "forwards" },
      ),
    );
    el.querySelector<HTMLElement>("[data-pt-stars]")?.animate([{ opacity: 0 }, { opacity: 0.7 }], {
      duration: 600,
      delay: COVER_MS * 0.6,
      fill: "forwards",
    });
    el.querySelector<HTMLElement>("[data-pt-mark]")?.animate(
      [
        { opacity: 0, transform: "scale(0.7) rotate(-25deg)" },
        { opacity: 1, transform: "scale(1) rotate(0deg)" },
      ],
      { duration: 900, delay: COVER_MS * 0.4, easing: OUT, fill: "forwards" },
    );
    el.querySelector<HTMLElement>("[data-pt-label]")?.animate(
      [{ transform: "translate3d(0, 115%, 0)" }, { transform: "translate3d(0, 0, 0)" }],
      { duration: 800, delay: COVER_MS * 0.5, easing: OUT, fill: "forwards" },
    );

    // Navigate once covered. Timers back up `finished`, which never settles while
    // the tab is hidden (animations only advance on rendered frames).
    let safety = 0;
    let covered = false;
    const onCovered = () => {
      if (covered || live.current.id !== id) return;
      covered = true;
      live.current.coveredAt = performance.now();
      router.push(href);
      safety = window.setTimeout(() => {
        setRun((current) => (current?.id === id ? { ...current, phase: "reveal" } : current));
      }, SAFETY_MS);
    };
    const fallback = window.setTimeout(onCovered, COVER_MS + 600);
    Promise.all(circles.map((a) => a.finished))
      .then(onCovered)
      .catch(() => {});
    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(safety);
    };
  }, [run, router]);

  // 3. The new page is in: give the name a moment on screen, then lift.
  useEffect(() => {
    if (run?.phase !== "cover" || clean(pathname) !== run.dest.path || !live.current.coveredAt) return;
    const { id } = run;
    const wait = Math.max(0, HOLD_MS - (performance.now() - live.current.coveredAt));
    const timer = window.setTimeout(() => {
      setRun((current) => (current?.id === id ? { ...current, phase: "reveal" } : current));
    }, wait);
    return () => window.clearTimeout(timer);
  }, [pathname, run]);

  // 4. Lift the curtain and hand the page back.
  useEffect(() => {
    if (run?.phase !== "reveal" || !root.current) return;
    const { id, y, r } = run;
    const el = root.current;
    document.documentElement.dataset.pageTransition = "reveal";

    el.querySelector<HTMLElement>("[data-pt-content]")?.animate(
      [
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
        { opacity: 0, transform: "translate3d(0, -48px, 0)" },
      ],
      { duration: 420, easing: "ease-in", fill: "forwards" },
    );
    const lift = el
      .querySelector<HTMLElement>("[data-pt-curtain]")!
      .animate([{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(0, ${-(y + r + RIM)}px, 0)` }], {
        duration: LIFT_MS,
        delay: 120,
        easing: IN_OUT,
        fill: "forwards",
      });

    let done = false;
    const onLifted = () => {
      if (done || live.current.id !== id) return;
      done = true;
      delete document.documentElement.dataset.pageTransition;
      live.current.busy = false;
      live.current.coveredAt = 0;
      setRun(null);
    };
    const fallback = window.setTimeout(onLifted, LIFT_MS + 800);
    lift.finished.then(onLifted).catch(() => {});
    return () => window.clearTimeout(fallback);
  }, [run]);

  if (!run) return null;

  const { x, y, r, dest } = run;
  return (
    <div ref={root} aria-hidden data-area={dest.area} className="page-transition">
      <div data-pt-curtain className="absolute inset-0">
        <span data-tone="accent" className="pt-circle" style={{ left: x, top: y, width: 2 * (r + RIM), height: 2 * (r + RIM) }} />
        <span data-tone="night" className="pt-circle" style={{ left: x, top: y, width: 2 * r, height: 2 * r }} />

        <div data-pt-content className="absolute inset-0">
          <div
            data-pt-stars
            className="absolute inset-0 bg-[url(/brand/stars.svg)] bg-[length:640px_640px] opacity-0"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <div data-pt-mark className="relative aspect-square w-[min(46vw,220px)] opacity-0">
              <svg viewBox="-120 -120 240 240" className="absolute inset-0 h-full w-full overflow-visible">
                <ellipse
                  rx="112"
                  ry="44"
                  transform="rotate(-30)"
                  fill="none"
                  stroke="var(--color-accent-light)"
                  strokeOpacity="0.35"
                  strokeWidth="1.2"
                  strokeDasharray="2 7"
                />
              </svg>
              <OrbitDot rx={112} ry={44} r={5} unitsWide={240} tilt={-30} angle={200} duration={1.8} color="var(--color-accent-light)" />
              <div className="absolute inset-[28%]">
                <ProspectaMark className="h-full w-full object-contain" />
              </div>
            </div>

            {dest.label && (
              <p className="mt-6 font-display text-[clamp(3rem,10vw,7.5rem)] font-light italic leading-[1.05] tracking-[-0.04em]">
                <span className="pt-mask">
                  <span
                    data-pt-label
                    className="text-accent-gradient block pr-[0.08em]"
                    style={{ transform: "translate3d(0, 115%, 0)" }}
                  >
                    {dest.label}
                  </span>
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
