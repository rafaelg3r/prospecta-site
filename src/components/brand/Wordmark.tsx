import { cn } from "@/lib/cn";

// Typographic take on the logotype: metallic PROSPECTA with the violet italic O,
// and the wide-tracked italic STUDIO underneath.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      {/* Mixed-case text + CSS uppercase, so screen readers say the name instead of spelling it. */}
      <span className="font-display text-[1em] font-semibold uppercase tracking-[0.16em] text-metal">
        Pr<span className="text-violet font-medium italic">o</span>specta
      </span>
      <span className="mt-[0.35em] font-display text-[0.42em] font-light uppercase italic tracking-[0.62em] text-ink/85">
        {" "}
        Studio
      </span>
    </span>
  );
}
