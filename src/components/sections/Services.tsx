import { ArrowUpRight, Browsers, FilmSlate, PenNib, Strategy } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { serviceCategories, type ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

type IconType = ComponentType<{ className?: string; weight?: "light" | "regular" | "bold" | "fill" | "duotone" | "thin" }>;

const ICONS: Record<ServiceCategory["slug"], IconType> = {
  web: Browsers,
  estrategia: Strategy,
  design: PenNib,
  video: FilmSlate,
};

// Bento placement: 4 categories, 4 cells (4+2 / 3+3 on desktop).
const LAYOUT: Record<ServiceCategory["slug"], string> = {
  web: "md:col-span-2 lg:col-span-4",
  estrategia: "lg:col-span-2",
  design: "lg:col-span-3",
  video: "lg:col-span-3",
};

const SURFACE: Record<ServiceCategory["slug"], string> = {
  web: "panel",
  estrategia:
    "border border-white/15 bg-[linear-gradient(160deg,#6c39d2_0%,#4a1aa6_45%,#24095e_100%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.18)]",
  design: "panel",
  video: "panel",
};

function Decoration({ slug }: { slug: ServiceCategory["slug"] }) {
  if (slug === "web") {
    return (
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -bottom-40 -right-28 hidden w-[520px] opacity-70 md:block">
        <g transform="rotate(-30 200 200)" fill="none" strokeWidth="1.2">
          <ellipse cx="200" cy="200" rx="190" ry="76" stroke="rgb(237 236 242 / 0.14)" />
          <ellipse cx="200" cy="200" rx="140" ry="56" stroke="rgb(150 112 234 / 0.45)" />
          <ellipse cx="200" cy="200" rx="90" ry="36" stroke="rgb(237 236 242 / 0.1)" strokeDasharray="2 7" />
        </g>
        <circle cx="200" cy="200" r="34" fill="url(#web-planet)" />
        <defs>
          <radialGradient id="web-planet" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#b49cf5" />
            <stop offset="0.55" stopColor="#5a2bb8" />
            <stop offset="1" stopColor="#24095e" />
          </radialGradient>
        </defs>
      </svg>
    );
  }
  if (slug === "design") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_0%,rgb(255_255_255/0.13),transparent_55%)]"
      />
    );
  }
  if (slug === "video") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_0%_100%,rgb(90_43_184/0.45),transparent_60%)]"
      />
    );
  }
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/20 [box-shadow:0_0_0_28px_rgb(255_255_255/0.03),0_0_0_60px_rgb(255_255_255/0.02)]"
    />
  );
}

function ServiceCell({ category, index }: { category: ServiceCategory; index: number }) {
  const Icon = ICONS[category.slug];
  const onViolet = category.slug === "estrategia";

  return (
    <Reveal delay={index * 0.08} className={cn("relative isolate overflow-hidden rounded-3xl p-7 sm:p-9", LAYOUT[category.slug], SURFACE[category.slug])}>
      <Decoration slug={category.slug} />

      <div className="relative flex h-full flex-col">
        <span
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-full border",
            onViolet ? "border-white/25 bg-white/10 text-white" : "border-white/10 bg-white/[0.04] text-brand-300",
          )}
        >
          <Icon weight="light" className="size-6" />
        </span>

        <h3 className="mt-8 font-display text-4xl font-semibold tracking-[-0.02em] text-ink md:text-5xl">{category.name}</h3>
        <p className={cn("mt-3 max-w-[38ch] leading-relaxed", onViolet ? "text-white/80" : "text-mute")}>{category.description}</p>

        <ul className={cn("mt-8 grid gap-2.5 sm:mt-auto sm:pt-10", category.slug === "web" && "sm:grid-cols-2 lg:max-w-[78%]")}>
          {category.services.map((service) => (
            <li key={service}>
              <a
                href={whatsappLink(`Olá, Prospecta! Quero um orçamento de ${service}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex min-h-14 items-center justify-between gap-4 rounded-2xl px-5 py-3.5 font-medium transition-colors duration-300",
                  onViolet ? "bg-white/10 text-white hover:bg-white/20" : "bg-white/[0.045] text-ink hover:bg-white/[0.09]",
                )}
              >
                <span>
                  {service}
                  <span className="sr-only"> (pedir orçamento no WhatsApp)</span>
                </span>
                <ArrowUpRight
                  weight="bold"
                  aria-hidden
                  className={cn(
                    "size-4.5 shrink-0 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    onViolet ? "text-white" : "text-brand-300",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="servicos" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Tudo o que a sua presença digital <span className="text-violet pr-[0.06em] font-light italic">precisa.</span>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">
            Contrate de forma avulsa ou dentro de um pacote. Toque em um serviço para pedir orçamento pelo WhatsApp.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {serviceCategories.map((category, i) => (
            <ServiceCell key={category.slug} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
