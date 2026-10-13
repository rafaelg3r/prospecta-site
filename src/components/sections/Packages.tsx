"use client";

import { ArrowDown, ArrowsClockwise, Browsers, ChartLineUp, Check, Target } from "@phosphor-icons/react";
import { AnimatePresence, m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";
import { ProspectaMark } from "@/components/brand/ProspectaMark";
import { ComboBuilder, comboPackages } from "@/components/sections/packages/ComboBuilder";
import { Reveal } from "@/components/ui/Reveal";
import { REVEAL_MARGIN } from "@/components/ui/reveal-margin";
import { SplitText } from "@/components/ui/SplitText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { COMBO_DISCOUNT_LABEL } from "@/content/combos";
import { packageGuarantees, packages, type Package } from "@/content/packages";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

// One orbit per package: the bigger the orbit, the further the brand reaches.
const RINGS = packages.map((_, i) => {
  const rx = 150 + i * 66;
  return { rx, ry: Math.round(rx * 0.4) };
});

const GUARANTEE_ICONS = [Target, ChartLineUp, ArrowsClockwise];

// Decorative mirror of the card in view; the cards themselves carry the content.
function PackageOrbit({ active }: { active: number }) {
  const ring = RINGS[active];

  return (
    <div className="relative" aria-hidden>
      <div className="relative aspect-[80/54] w-full">
        <div className="absolute inset-x-[18%] inset-y-0 rounded-full bg-[radial-gradient(closest-side,rgb(119_68_219/0.16)_0%,transparent_100%)]" />
        <svg viewBox="-400 -270 800 540" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="pkg-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d3c4fb" />
              <stop offset="0.5" stopColor="#7744db" />
              <stop offset="1" stopColor="#3d1494" />
            </linearGradient>
          </defs>
          <g transform="rotate(-30)" fill="none">
            {RINGS.map((r, i) => (
              <g key={i}>
                <ellipse rx={r.rx} ry={r.ry} stroke="rgb(237 236 242 / 0.13)" strokeWidth="1.3" strokeDasharray="3 9" />
                <ellipse
                  rx={r.rx}
                  ry={r.ry}
                  stroke="url(#pkg-ring)"
                  style={{
                    strokeWidth: i === active ? 3 : 1.6,
                    opacity: i <= active ? (i === active ? 1 : 0.5) : 0,
                    transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), stroke-width 0.7s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </g>
            ))}
          </g>
        </svg>
        <OrbitDot
          key={active}
          rx={ring.rx}
          ry={ring.ry}
          r={9}
          unitsWide={800}
          tilt={-30}
          angle={150}
          duration={16}
          color="#ffffff"
        />
        <div className="absolute left-1/2 top-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2">
          <ProspectaMark className="h-auto w-full" />
        </div>
      </div>

      <div className="mt-8 h-32 text-center">
        <p className="font-display text-xl font-light italic text-mute">Prospecta</p>
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={packages[active].slug}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-5xl font-semibold tracking-[-0.02em] text-ink">{packages[active].name}</p>
            <p className="mt-2 font-display text-xl font-medium text-brand-200">
              {formatPrice(packages[active].priceMin, packages[active].priceMax)}
              <span className="text-base font-normal text-mute"> /mês</span>
            </p>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Small orbit badge so the tier still reads on mobile, where the big orbit is hidden.
function TierGlyph({ level }: { level: number }) {
  return (
    <svg aria-hidden viewBox="-60 -60 120 120" className="size-12 shrink-0">
      <g transform="rotate(-30)" fill="none">
        {RINGS.map((_, i) => (
          <ellipse
            key={i}
            rx={18 + i * 12}
            ry={(18 + i * 12) * 0.42}
            stroke={i <= level ? "#9670ea" : "rgb(237 236 242 / 0.16)"}
            strokeWidth={i === level ? 3 : 1.6}
          />
        ))}
      </g>
      <circle r="7" fill="#d6d5dc" />
    </svg>
  );
}

// Bottom of each card: packages without a site can turn into a combo.
function ComboStrip({ pkg, onCombo }: { pkg: Package; onCombo: (slug: string) => void }) {
  if (pkg.includesSite) {
    return (
      <p className="mt-8 flex items-center gap-4 rounded-2xl border border-white/10 px-5 py-4 text-ink/90">
        <Browsers weight="light" className="size-6 shrink-0 text-brand-300" aria-hidden />
        Site ou landing page já incluso, sem precisar de combo.
      </p>
    );
  }

  return (
    <a
      href="#combos"
      onClick={() => onCombo(pkg.slug)}
      className="group mt-8 flex items-center gap-4 rounded-2xl border border-dashed border-brand-400/40 px-5 py-4 transition-colors duration-300 hover:border-brand-300/80 hover:bg-brand-500/[0.08]"
    >
      <Browsers weight="light" className="size-6 shrink-0 text-brand-300" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">Quer um site junto?</span>
        <span className="block text-sm text-mute">Vire combo: {COMBO_DISCOUNT_LABEL}.</span>
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-200 transition-colors group-hover:text-white">
        <span className="hidden sm:inline">Montar combo</span>
        <ArrowDown
          weight="bold"
          className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
          aria-hidden
        />
      </span>
    </a>
  );
}

type PackageCardProps = { pkg: Package; index: number; onActive: (i: number) => void; onCombo: (slug: string) => void };

function PackageCard({ pkg, index, onActive, onCombo }: PackageCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: REVEAL_MARGIN }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl p-7 sm:p-10",
        pkg.featured ? "border border-brand-400/45 bg-surface-2" : "panel",
      )}
    >

      <div className="flex items-start justify-between gap-4">
        <h3 className="flex flex-col">
          <span className="font-display text-lg font-light italic text-mute">Prospecta</span>
          <span className="font-display text-[clamp(2.5rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink">
            {pkg.name}
          </span>
        </h3>
        <div className="flex flex-col items-end gap-3">
          <TierGlyph level={index} />
          {pkg.featured && (
            <span className="rounded-full bg-brand-200 px-3 py-1 text-xs font-bold text-brand-800">Mais completo</span>
          )}
        </div>
      </div>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-2 font-display">
        <span className="text-[clamp(1.6rem,3.2vw,2.15rem)] font-semibold tracking-[-0.02em] text-ink">
          {formatPrice(pkg.priceMin, pkg.priceMax)}
        </span>
        <span className="text-lg text-mute">/mês</span>
      </p>

      <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-mute">{pkg.tagline}</p>

      <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {pkg.deliverables.map((item) => (
          <li key={item} className="flex items-center gap-3 text-ink/90">
            <Check weight="bold" className="size-4 shrink-0 text-brand-300" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <ComboStrip pkg={pkg} onCombo={onCombo} />

      <WhatsAppButton
        className="mt-8 w-full sm:w-auto"
        message={`Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento do pacote Prospecta ${pkg.name}.`}
      />
    </m.article>
  );
}

export function Packages() {
  const [active, setActive] = useState(0);
  const [comboPackage, setComboPackage] = useState(comboPackages[1]?.slug ?? comboPackages[0].slug);

  return (
    <>
      <section id="pacotes" className="relative py-24 md:py-36">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
          <Reveal className="max-w-3xl">
            <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Pacotes mensais</p>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
              <SplitText>
                Escolha o seu <span className="text-violet pr-[0.06em] font-light italic">plano.</span>
              </SplitText>
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">
              Quatro níveis de acompanhamento mensal, do essencial ao completo. Quer um site novo junto? Transforme o pacote em um
              combo e o site sai mais barato.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="hidden lg:block">
              <div className="sticky top-[calc(50dvh-14rem)]">
                <PackageOrbit active={active} />
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8">
              {packages.map((pkg, i) => (
                <PackageCard key={pkg.slug} pkg={pkg} index={i} onActive={setActive} onCombo={setComboPackage} />
              ))}
            </div>
          </div>

          <Reveal className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/[0.08] px-7 py-6 sm:px-10 md:mt-14 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display text-xl font-semibold text-ink">Todos os pacotes incluem</p>
            <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
              {packageGuarantees.map((g, i) => {
                const Icon = GUARANTEE_ICONS[i];
                return (
                  <li key={g} className="flex items-center gap-3 text-mute">
                    <Icon weight="light" className="size-6 text-brand-300" aria-hidden />
                    {g}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      <ComboBuilder packageSlug={comboPackage} onPackageChange={setComboPackage} />
    </>
  );
}
