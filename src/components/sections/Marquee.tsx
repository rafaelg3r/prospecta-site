import { ProspectaMark } from "@/components/brand/ProspectaMark";
import { marqueeItems } from "@/content/services";

function Glyph() {
  return (
    <ProspectaMark variant="muted" className="mx-6 h-auto w-[0.55em] shrink-0 md:mx-10" />
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item, i) => (
        <span key={item} className="flex items-center">
          <span className={i % 2 === 0 ? "text-outline" : "text-metal"}>{item}</span>
          <Glyph />
        </span>
      ))}
    </div>
  );
}

// The one marquee on the page: the breadth of what the studio makes, at a glance.
export function Marquee() {
  return (
    <section aria-label="O que fazemos" className="relative border-y border-white/[0.06] py-8 md:py-12">
      <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-max font-display text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-none tracking-[-0.03em] motion-safe:animate-marquee">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
