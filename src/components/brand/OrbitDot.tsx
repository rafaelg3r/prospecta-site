import type { CSSProperties } from "react";

type OrbitDotProps = {
  /** Orbit radii and dot radius, in the same units as the parent SVG viewBox. */
  rx: number;
  ry: number;
  r: number;
  /** Width of the parent viewBox, in those units. */
  unitsWide: number;
  /** Tilt of the orbit, matching the SVG `rotate()` of the drawn ellipse. */
  tilt: number;
  /** Starting angle on the orbit, in degrees. */
  angle: number;
  /** Seconds per revolution. */
  duration: number;
  color: string;
};

/*
  A satellite moving along a tilted ellipse using only compositor transforms.

  An ellipse is a circle squashed by ry/rx. So: a square "plane" is tilted and
  squashed, a spinner inside it rotates, and the dot counter-rotates and
  un-squashes itself so it stays round. Net transform on the dot is just the
  tilt, and nothing here touches the main thread after first paint.
  Under reduced motion the spin is not applied and the dot rests at `angle`.
*/
export function OrbitDot({ rx, ry, r, unitsWide, tilt, angle, duration, color }: OrbitDotProps) {
  const squash = ry / rx;
  const size = `${(r / rx) * 100}%`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square"
      style={{
        width: `${((2 * rx) / unitsWide) * 100}%`,
        transform: `translate(-50%, -50%) rotate(${tilt}deg) scaleY(${squash})`,
      }}
    >
      <div className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
        <div className="orbit-spin absolute inset-0" style={{ "--orbit-dur": `${duration}s` } as CSSProperties}>
          <div
            className="orbit-counter absolute left-1/2 top-0 aspect-square"
            style={{ width: size, "--orbit-dur": `${duration}s` } as CSSProperties}
          >
            <div
              className="h-full w-full rounded-full"
              style={{ transform: `rotate(${-angle}deg) scaleY(${1 / squash})`, background: color }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
