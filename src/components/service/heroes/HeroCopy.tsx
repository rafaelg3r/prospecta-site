import { ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";

export const areaQuote = (area: ServiceCategory) =>
  `Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento de ${area.slug === "web" ? "um site" : area.name.toLowerCase()}.`;

// Text half of every area hero: area badge, headline, intro and the two actions.
export function HeroCopy({ area, align = "left", className }: { area: ServiceCategory; align?: "left" | "center"; className?: string }) {
  const Icon = SERVICE_ICONS[area.slug];
  const center = align === "center";

  return (
    <div className={cn(center && "mx-auto max-w-4xl text-center", className)}>
      <p className="intro-fade inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/12 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-accent-light">
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-accent text-[#0a0526]">
          <Icon weight="bold" className="size-4" aria-hidden />
        </span>
        {area.name}
      </p>

      <h1 className="mt-7 font-display text-[clamp(2.8rem,6.2vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
        <span className="text-metal">{area.headline} </span>
        <span className="text-accent-gradient pr-[0.12em] font-light italic">{area.headlineAccent}</span>
      </h1>
      <p className={cn("mt-7 max-w-[44ch] text-lg leading-relaxed text-mute md:text-xl", center && "mx-auto")}>{area.intro}</p>

      <div className={cn("mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4", center && "items-center sm:justify-center")}>
        <WhatsAppButton size="lg" message={areaQuote(area)} />
        <a
          href="#servicos-e-valores"
          className="group inline-flex h-14 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-base font-semibold text-ink transition-colors hover:text-accent-light"
        >
          Ver serviços e valores
          <ArrowDown weight="bold" className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
