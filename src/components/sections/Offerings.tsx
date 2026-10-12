import { ArrowDownRight, Browsers, FilmSlate, PenNib, Plus, Strategy } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { COMBO_DISCOUNT_LABEL, sites } from "@/content/combos";
import { packages } from "@/content/packages";
import { serviceCategories } from "@/content/services";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

const CATEGORY_ICONS = { web: Browsers, estrategia: Strategy, design: PenNib, video: FilmSlate };
const lowestPackagePrice = Math.min(...packages.map((p) => p.priceMin));

// Same orbit language as the package tiers: the rings are the monthly cycle.
function OrbitGlyph({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="-60 -60 120 120" className={className}>
      <g transform="rotate(-30)" fill="none">
        {[24, 37, 50].map((rx, i) => (
          <ellipse key={rx} rx={rx} ry={rx * 0.42} stroke="#9670ea" strokeOpacity={1 - i * 0.22} strokeWidth={i === 2 ? 3 : 1.8} />
        ))}
      </g>
      <circle r="9" fill="#d6d5dc" />
    </svg>
  );
}

function IconBubble({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full border",
        strong ? "border-brand-300/50 bg-brand-500/25 text-white" : "border-white/10 bg-white/[0.04] text-brand-300",
      )}
    >
      {children}
    </span>
  );
}

type OfferCardProps = {
  index: string;
  href: string;
  glyph: ReactNode;
  title: string;
  text: string;
  items: string[];
  meta: string;
  action: string;
  badge?: string;
  featured?: boolean;
};

function OfferCard({ index, href, glyph, title, text, items, meta, action, badge, featured }: OfferCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:p-9",
        featured
          ? "border border-transparent [background:linear-gradient(#0c0630,#0c0630)_padding-box,linear-gradient(135deg,#b49cf5,#5a2bb8_45%,#24095e_70%,#9670ea)_border-box] shadow-[0_30px_80px_-30px_rgb(119_68_219/0.6)]"
          : "panel",
      )}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(circle,rgb(119_68_219/0.4),transparent_70%)]"
        />
      )}

      <div className="flex h-7 items-center justify-between gap-4">
        <span className="font-display text-sm font-medium tracking-[0.2em] text-faint">{index}</span>
        {badge && (
          <span className="rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-200 ring-1 ring-brand-400/40">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-6 flex h-16 items-center gap-2">{glyph}</div>

      <h3 className="mt-7 font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink">
        {title}
      </h3>
      <p className="mt-3 text-lg leading-relaxed text-mute">{text}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-ink/90">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="text-sm font-medium text-mute">{meta}</span>
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-brand-200 transition-colors group-hover:text-white">
            {action}
            <ArrowDownRight
              weight="bold"
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </a>
  );
}

// Map of the offer: one-off services, monthly packages, and combos (package + site).
export function Offerings() {
  return (
    <section id="como-contratar" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Como contratar</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Contrate do seu <span className="text-violet pr-[0.06em] font-light italic">jeito.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">
            Um serviço pontual, acompanhamento todo mês ou um combo com site novo. Escolha o formato que combina com o momento da sua empresa.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3">
          <Reveal as="li" className="h-full">
            <OfferCard
              index="01"
              href="#servicos"
              glyph={serviceCategories.map((c) => {
                const Icon = CATEGORY_ICONS[c.slug];
                return (
                  <IconBubble key={c.slug}>
                    <Icon weight="light" className="size-6" aria-hidden />
                  </IconBubble>
                );
              })}
              title="Serviços avulsos"
              text="Um projeto por vez, quando você precisar: um site, uma identidade visual, um diagnóstico ou a edição de um Reel."
              items={serviceCategories.map((c) => c.name)}
              meta="Pagamento por projeto"
              action="Ver serviços"
            />
          </Reveal>

          <Reveal as="li" delay={0.08} className="h-full">
            <OfferCard
              index="02"
              href="#pacotes"
              glyph={<OrbitGlyph className="size-16" />}
              title="Pacotes mensais"
              text="Vários serviços reunidos em um plano: planejamento, posts, carrosséis, roteiros e Reels todo mês, com estratégia por trás."
              items={packages.map((p) => p.name)}
              meta={`A partir de ${formatPrice(lowestPackagePrice)}/mês`}
              action="Ver pacotes"
            />
          </Reveal>

          <Reveal as="li" delay={0.16} className="h-full">
            <OfferCard
              index="03"
              href="#combos"
              featured
              badge={COMBO_DISCOUNT_LABEL}
              glyph={
                <>
                  <OrbitGlyph className="size-16" />
                  <Plus weight="bold" className="size-5 text-brand-300" aria-hidden />
                  <IconBubble strong>
                    <Browsers weight="light" className="size-6" aria-hidden />
                  </IconBubble>
                </>
              }
              title="Combos"
              text="Um pacote mensal junto com um site novo. No combo, o site sai mais barato do que contratado separado."
              items={sites.map((s) => s.name)}
              meta="Pacote mensal + site"
              action="Montar combo"
            />
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
