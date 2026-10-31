import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";
import { SiteGlyph, siteOffers } from "@/components/sections/Sites";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { packages } from "@/content/packages";
import { serviceCategories, serviceHref } from "@/content/services";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

const lowestPackagePrice = formatPrice(Math.min(...packages.map((p) => p.priceMin)));
const lowestSitePrice = formatPrice(Math.min(...siteOffers.map((o) => o.priceMin ?? Infinity)));

const STEPS = ["Pontual", "Projeto único", "Todo mês"];

/* ---------- Visuals (one per format) ---------- */

// 01: the four areas, each one a door to its own page.
function AreaDoors() {
  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-2.5">
      {serviceCategories.map((c) => {
        const Icon = SERVICE_ICONS[c.slug];
        return (
          <li key={c.slug} data-area={c.slug}>
            <Link
              href={serviceHref(c.slug)}
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 p-3 transition-[background-color,border-color] duration-300 ease-out-expo hover:border-accent/60 hover:bg-accent/[0.08]"
            >
              <span className="flex items-start justify-between">
                <Icon weight="light" className="size-6 text-accent transition-transform duration-500 ease-out-expo group-hover:-rotate-12" />
                <ArrowUpRight
                  weight="bold"
                  aria-hidden
                  className="size-4 text-mute transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                />
              </span>
              <span className="mt-2 font-display text-base font-semibold text-ink sm:text-lg">{c.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// 03: the tiers as orbits around the brand, the cycle repeats every month.
// Drawn in white, since it sits on the violet card.
function PackageOrbits() {
  const rings = [44, 66, 88, 110];
  return (
    <div aria-hidden className="flex h-full items-center gap-4">
      <div className="relative aspect-square h-full max-h-32 shrink-0 sm:max-h-48">
        <svg viewBox="-125 -125 250 250" className="absolute inset-0 h-full w-full overflow-visible">
          <g transform="rotate(-30)" fill="none">
            {rings.map((rx, i) => (
              <ellipse
                key={rx}
                rx={rx}
                ry={rx * 0.42}
                stroke="#ffffff"
                strokeOpacity={0.3 + i * 0.2}
                strokeWidth={i === 3 ? 2.6 : 1.5}
              />
            ))}
          </g>
          <circle r="20" fill="#ffffff" />
        </svg>
        <OrbitDot rx={110} ry={46} r={7} unitsWide={250} tilt={-30} angle={150} duration={14} color="#ffffff" />
        <OrbitDot rx={66} ry={28} r={5} unitsWide={250} tilt={-30} angle={320} duration={10} color="#ffffff" />
      </div>
      <ol className="flex min-w-0 flex-col gap-1.5">
        {packages.map((p, i) => (
          <li key={p.slug} className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="flex gap-0.5">
              {packages.map((_, j) => (
                <span key={j} className={cn("size-1.5 rounded-full", j <= i ? "bg-white" : "bg-white/25")} />
              ))}
            </span>
            <span className="truncate">{p.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// 02: the sites side by side, growing from one page to an app.
function SiteTiers() {
  return (
    <div aria-hidden className="flex h-full items-center gap-5">
      <SiteGlyph level={2} className="h-24 w-auto shrink-0 sm:h-28" />
      <ol className="flex min-w-0 flex-col gap-1.5">
        {siteOffers.map((o, i) => (
          <li key={o.name} className="flex items-center gap-2 text-sm font-semibold text-ink/90">
            <span className="flex gap-0.5">
              {siteOffers.map((_, j) => (
                <span key={j} className={cn("size-1.5 rounded-full", j <= i ? "bg-brand-300" : "bg-white/15")} />
              ))}
            </span>
            <span className="truncate">{o.short ?? o.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Card ---------- */

type FormatCardProps = {
  step: number;
  title: string;
  text: string;
  pays: string;
  idealFor: string;
  visual: ReactNode;
  action: { href: string; label: string };
  tone: "soft" | "deep" | "bright";
};

// Same flat card, three tones: the progression reads in the surface, not in glow.
const TONES = {
  soft: {
    card: "panel",
    visual: "border-white/[0.07]",
    step: "text-brand-300",
    muted: "text-mute",
    label: "text-faint",
    action: "text-brand-200 hover:text-white",
  },
  deep: {
    card: "border border-white/10 bg-surface-2",
    visual: "border-white/[0.08]",
    step: "text-brand-200",
    muted: "text-mute",
    label: "text-brand-300/80",
    action: "text-brand-200 hover:text-white",
  },
  bright: {
    card: "card-accent",
    visual: "border-white/15",
    step: "text-white",
    muted: "text-white/80",
    label: "text-white/60",
    action: "text-white hover:text-brand-200",
  },
};

function FormatCard({ step, title, text, pays, idealFor, visual, action, tone }: FormatCardProps) {
  const t = TONES[tone];
  return (
    <article className={cn("relative isolate flex h-full flex-col overflow-hidden rounded-3xl", t.card)}>
      <div className={cn("h-60 border-b p-5 sm:p-6", t.visual)}>{visual}</div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <p className={cn("font-display text-sm font-semibold tracking-[0.18em]", t.step)}>
          {String(step).padStart(2, "0")}
          <span className="lg:hidden"> · {STEPS[step - 1].toUpperCase()}</span>
        </p>
        <h3 className="mt-3 font-display text-[clamp(1.9rem,2.6vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.025em]">{title}</h3>
        <p className={cn("mt-3 text-lg leading-relaxed", t.muted)}>{text}</p>

        <dl className="mt-7 grid gap-4 border-t border-white/10 pt-6">
          <div>
            <dt className={cn("text-xs font-semibold uppercase tracking-[0.16em]", t.label)}>Como paga</dt>
            <dd className="mt-1 font-semibold">{pays}</dd>
          </div>
          <div>
            <dt className={cn("text-xs font-semibold uppercase tracking-[0.16em]", t.label)}>Ideal para</dt>
            <dd className={cn("mt-1 leading-relaxed", t.muted)}>{idealFor}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-8">
          <a href={action.href} className={cn("group inline-flex items-center gap-2 font-semibold transition-colors", t.action)}>
            {action.label}
            <ArrowDownRight
              weight="bold"
              aria-hidden
              className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

/* ---------- Section ---------- */

// Map of the offer, in page order: one-off services, sites (per project) and monthly packages.
export function Offerings() {
  return (
    <section id="como-contratar" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Como contratar</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
            <SplitText>
              Contrate do seu <span className="text-violet pr-[0.06em] font-light italic">jeito.</span>
            </SplitText>
          </h2>
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-mute">
            Três formatos que se completam: comece por um serviço, tenha um site com preço por projeto ou ganhe constância com um
            pacote mensal.
          </p>
        </Reveal>

        {/* Progression rail (desktop): pontual, todo mês, completo */}
        <Reveal className="relative mt-16 hidden grid-cols-3 gap-5 lg:grid" y={12}>
          <span
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgb(150_112_234/0.35),#b49cf5,#ffffff)]"
          />
          {STEPS.map((step, i) => (
            <div key={step} className="relative flex justify-center">
              <span
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1",
                  i === 2 ? "bg-white text-brand-700 ring-white" : "bg-void text-ink ring-white/20",
                )}
              >
                <span className={cn("size-1.5 rounded-full", i === 2 ? "bg-brand-500" : "bg-brand-300")} />
                {step}
              </span>
            </div>
          ))}
        </Reveal>

        <ol className="mt-12 grid gap-5 lg:mt-6 lg:grid-cols-3">
          <Reveal as="li" className="h-full min-w-0">
            <FormatCard
              step={1}
              tone="soft"
              title="Serviços avulsos"
              text="Um projeto por vez, em uma das quatro áreas. Toque em uma delas para conhecer."
              visual={<AreaDoors />}
              pays="Por projeto, sem mensalidade"
              idealFor="Resolver algo pontual, como uma identidade visual, um carrossel ou um diagnóstico."
              action={{ href: "#servicos", label: "Ver todos os serviços" }}
            />
          </Reveal>

          <Reveal as="li" delay={0.08} className="h-full min-w-0">
            <FormatCard
              step={2}
              tone="deep"
              title="Sites"
              text="Da landing page ao projeto sob medida, com o preço de cada um à vista."
              visual={<SiteTiers />}
              pays={`Por projeto, a partir de ${lowestSitePrice}`}
              idealFor="Ter um site novo ou trocar o atual, pagando uma vez só."
              action={{ href: "#sites", label: "Ver preços dos sites" }}
            />
          </Reveal>

          <Reveal as="li" delay={0.16} className="h-full min-w-0">
            <FormatCard
              step={3}
              tone="bright"
              title="Pacotes mensais"
              text="Vários serviços reunidos em um plano, com planejamento, conteúdo e estratégia todo mês."
              visual={<PackageOrbits />}
              pays={`Mensalidade a partir de ${lowestPackagePrice}`}
              idealFor="Manter a marca ativa e crescendo, sem precisar contratar peça por peça."
              action={{ href: "#pacotes", label: "Comparar pacotes" }}
            />
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
