import type { CSSProperties } from "react";
import { designPieces } from "@/content/portfolio";

/*
  Desktop: posts fanned like a hand of cards; hovering the hand spreads it and
  lifts the card under the cursor (CSS only, transform-based).
  Mobile/tablet: a plain horizontal scroll-snap strip.
  The fan geometry lives in globals.css (.design-fan / .design-card).
*/
export function DesignGallery() {
  const mid = (designPieces.length - 1) / 2;

  return (
    <div className="design-fan" role="group" aria-label="Posts criados para o Instagram">
      {designPieces.map((piece, i) => (
        <figure
          key={piece.slug}
          className="design-card"
          style={{ "--o": i - mid, "--z": designPieces.length - Math.abs(Math.round(i - mid)) } as CSSProperties}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-optimised WebP */}
          <img
            src={piece.image}
            alt={`Post "${piece.title}" criado para o Instagram`}
            width={512}
            height={640}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-2xl object-cover"
          />
        </figure>
      ))}
    </div>
  );
}
