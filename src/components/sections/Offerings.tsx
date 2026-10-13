import { ArrowDownRight, ArrowUpRight, Browsers, Equals, Plus, Tag } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { OrbitDot } from "@/components/brand/OrbitDot";
import { SERVICE_ICONS } from "@/components/sections/Services";
import { Reveal } from "@/components/ui/Reveal";
import { COMBO_DISCOUNT_LABEL } from "@/content/combos";
import { packages } from "@/content/packages";
import { serviceCategories, serviceHref } from "@/content/services";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";

const lowestPackagePrice = formatPrice(Math.min(...packages.map((p) => p.priceMin)));

const STEPS = ["Pontual", "Todo mês", "Completo"];

/* ---------- Visuals (one per format) ---------- */

// 01: the four areas, each one a door to its own page.
function AreaDoors() {
  return (
    <ul className="grid h-full grid-cols-2 grid-rows-2 gap-2.5">
      {serviceCategories.map((c) => {
        const Icon = SERVICE_ICONS[c.slug];
        return (
          <li key={c.slug}>
            <Link
              href={serviceHref(c.slug)}
              className="group flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition-[transform,background-color,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-brand-300/50 hover:bg-brand-500/15"
            >
              <span className="flex items-start justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-500/20 text-brand-200">
                  <Icon weight="light" className="size-5" />
                </span>
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

// 02: the tiers as orbits around the brand, the cycle repeats every month.
function PackageOrbits() {
  const rings = [44, 66, 88, 110];
  return (
    <div aria-hidden className="flex h-full items-center gap-4">
      <div className="relative aspect-square h-full max-h-48 shrink-0">
        <svg viewBox="-125 -125 250 250" className="absolute inset-0 h-full w-full overflow-visible">
          <g transform="rotate(-30)" fill="none">
            {rings.map((rx, i) => (
              <ellipse
                key={rx}
                rx={rx}
                ry={rx * 0.42}
                stroke={i === 3 ? "#b49cf5" : "#9670ea"}
                strokeOpacity={0.35 + i * 0.2}
                strokeWidth={i === 3 ? 2.6 : 1.5}
              />
            ))}
          </g>
          <circle r="20" fill="#d6d5dc" />
        </svg>
        <OrbitDot rx={110} ry={46} r={7} unitsWide={250} tilt={-30} angle={150} duration={14} color="#ffffff" />
        <OrbitDot rx={66} ry={28} r={5} unitsWide={250} tilt={-30} angle={320} duration={10} color="#d3c4fb" />
      </div>
      <ol className="flex min-w-0 flex-col gap-1.5">
        {packages.map((p, i) => (
          <li key={p.slug} className="flex items-center gap-2 text-sm font-semibold text-ink/90">
            <span className="flex gap-0.5">
              {packages.map((_, j) => (
                <span key={j} className={cn("size-1.5 rounded-full", j <= i ? "bg-brand-300" : "bg-white/15")} />
              ))}
            </span>
            <span className="truncate">{p.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

// 03: package + site = combo, drawn as an equation.
function ComboEquation() {
  return (
    <div aria-hidden className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-center gap-2.5">
        <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white/12 px-3 py-4 ring-1 ring-white/20">
          <svg viewBox="-40 -24 80 48" className="h-9 w-14 overflow-visible">
            <g transform="rotate(-24)" fill="none">
              <ellipse rx="36" ry="13" stroke="#fff" strokeOpacity="0.9" strokeWidth="2" />
              <ellipse rx="24" ry="9" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" />
            </g>
            <circle r="8" fill="#fff" />
          </svg>
          <span className="text-sm font-semibold">Pacote</span>
        </div>
        <Plus weight="bold" className="size-5 shrink-0 text-white/80" />
        <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white/12 px-3 py-4 ring-1 ring-white/20">
          <div className="h-9 w-14 overflow-hidden rounded-md border border-white/70">
            <div className="flex gap-0.5 border-b border-white/50 px-1 py-0.5">
              <span className="size-1 rounded-full bg-white/80" />
              <span className="size-1 rounded-full bg-white/80" />
              <span className="size-1 rounded-full bg-white/80" />
            </div>
            <div className="space-y-1 p-1">
              <div className="h-1 w-3/4 rounded-full bg-white/80" />
              <div className="h-1 w-1/2 rounded-full bg-white/50" />
              <div className="h-2.5 w-full rounded-sm bg-white/30" />
            </div>
          </div>
          <span className="text-sm font-semibold">Site</span>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <Equals weight="bold" className="size-5 shrink-0 text-white/80" />
        <div className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-dashed border-white/50 bg-white/10 px-4 py-2.5 font-display text-lg font-semibold">
          <Tag weight="bold" className="size-5" />
          {COMBO_DISCOUNT_LABEL}
        </div>
      </div>
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

const TONES = {
  soft: {
    card: "panel",
    visual: "bg-[radial-gradient(120%_100%_at_50%_0%,rgb(119_68_219/0.22),transparent_70%)] border-white/[0.07]",
    step: "text-brand-300",
    muted: "text-mute",
    label: "text-faint",
    action: "text-brand-200 hover:text-white",
  },
  deep: {
    card: "border border-brand-400/30 bg-[linear-gradient(165deg,#25105f_0%,#150a49_55%,#0c0630_100%)] shadow-[0_30px_70px_-35px_rgb(119_68_219/0.7),inset_0_1px_0_rgb(255_255_255/0.1)]",
    visual: "bg-[radial-gradient(120%_100%_at_50%_0%,rgb(150_112_234/0.28),transparent_70%)] border-white/10",
    step: "text-brand-200",
    muted: "text-mute",
    label: "text-brand-300/80",
    action: "text-brand-200 hover:text-white",
  },
  bright: {
    card: "border border-white/25 bg-[linear-gradient(160deg,#7d48ea_0%,#5426c0_45%,#2e0d78_100%)] text-white shadow-[0_40px_90px_-30px_rgb(119_68_219/0.85),inset_0_1px_0_rgb(255_255_255/0.25)]",
    visual: "bg-[radial-gradient(120%_100%_at_50%_0%,rgb(255_255_255/0.16),transparent_70%)] border-white/15",
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
          <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-mute">
            Três formatos que se completam: comece por um serviço, ganhe constância com um pacote mensal ou junte pacote e site em um
            combo.
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
          <Reveal as="li" className="h-full">
            <FormatCard
              step={1}
              tone="soft"
              title="Serviços avulsos"
              text="Um projeto por vez, em uma das quatro áreas. Toque em uma delas para conhecer."
              visual={<AreaDoors />}
              pays="Por projeto, sem mensalidade"
              idealFor="Resolver algo pontual, como um site novo, uma identidade visual ou um diagnóstico."
              action={{ href: "#servicos", label: "Ver todos os serviços" }}
            />
          </Reveal>

          <Reveal as="li" delay={0.08} className="h-full">
            <FormatCard
              step={2}
              tone="deep"
              title="Pacotes mensais"
              text="Vários serviços reunidos em um plano, com planejamento, conteúdo e estratégia todo mês."
              visual={<PackageOrbits />}
              pays={`Mensalidade a partir de ${lowestPackagePrice}`}
              idealFor="Manter a marca ativa e crescendo, sem precisar contratar peça por peça."
              action={{ href: "#pacotes", label: "Comparar pacotes" }}
            />
          </Reveal>

          <Reveal as="li" delay={0.16} className="h-full">
            <FormatCard
              step={3}
              tone="bright"
              title="Combos"
              text="Um pacote mensal junto com um site novo. O site sai mais barato do que contratado separado."
              visual={<ComboEquation />}
              pays={`Mensalidade do pacote + site com ${COMBO_DISCOUNT_LABEL.replace(" no site", "")}`}
              idealFor="Quem vai lançar ou renovar a presença digital e quer site e conteúdo juntos."
              action={{ href: "#combos", label: "Montar meu combo" }}
            />
          </Reveal>
        </ol>

        <Reveal className="mt-6 flex items-center justify-center gap-2 text-center text-mute">
          <Browsers weight="light" className="size-5 shrink-0 text-brand-300" aria-hidden />
          <span>
            Só precisa de um site? Ele também é vendido avulso, na{" "}
            <Link href={serviceHref("web")} className="font-semibold text-brand-200 underline-offset-4 transition-colors hover:text-white hover:underline">
              área de Web
            </Link>
            .
          </span>
        </Reveal>
      </div>
    </section>
  );
}
