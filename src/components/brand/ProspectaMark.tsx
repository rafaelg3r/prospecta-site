// Prospecta symbol (silver orbit + violet planet slice), vectorised from the brand
// PNG by contour tracing. Served as a static file so its ~2KB of path data is
// cached once instead of being inlined into the HTML and JS for every use.
// Source files: public/brand/mark.svg (full colour) and mark-muted.svg (glyph).

// viewBox is 1500 x 1260.
const MARK_RATIO = 1500 / 1260;

type ProspectaMarkProps = {
  className?: string;
  variant?: "full" | "muted";
  /** Accessible name; omit when decorative. */
  title?: string;
};

export function ProspectaMark({ className, variant = "full", title }: ProspectaMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- plain SVG, nothing to optimise
    <img
      src={variant === "full" ? "/brand/mark.svg" : "/brand/mark-muted.svg"}
      alt={title ?? ""}
      width={150}
      height={Math.round(150 / MARK_RATIO)}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}
