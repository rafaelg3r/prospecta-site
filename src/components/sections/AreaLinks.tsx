import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { serviceCategories, serviceHref } from "@/content/services";

// Right after the hero: one door per service area, each in its own accent.
export function AreaLinks() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Explore por área</p>
            <h2
              id="areas-title"
              className="mt-4 font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink"
            >
              Escolha por onde <span className="text-violet pr-[0.06em] font-light italic">começar.</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-mute">Cada área tem uma página com serviços, valores, portfólio e como trabalhamos.</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCategories.map((c, i) => {
            const Icon = SERVICE_ICONS[c.slug];
            return (
              <Reveal as="li" key={c.slug} area={c.slug} delay={i * 0.06} className="h-full">
                <Link
                  href={serviceHref(c.slug)}
                  className="group card-vivid flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 sm:p-7"
                >
                  <Icon
                    aria-hidden
                    weight="thin"
                    className="pointer-events-none absolute -bottom-8 -right-6 -z-10 size-40 text-accent/15 transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <span className="flex items-start justify-between">
                    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-[#0a0526] shadow-[0_14px_30px_-12px_var(--color-accent)]">
                      <Icon weight="bold" className="size-7" aria-hidden />
                    </span>
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-accent/40 text-accent-light transition-[transform,background-color] duration-300 ease-out-expo group-hover:rotate-45 group-hover:bg-accent/20">
                      <ArrowUpRight weight="bold" className="size-4" aria-hidden />
                    </span>
                  </span>
                  <span className="mt-8 font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink">{c.name}</span>
                  <span className="mt-3 text-mute">{c.offers.map((o) => o.short ?? o.name).join(" · ")}</span>
                  <span className="mt-auto pt-6">
                    <span className="block h-1 w-12 origin-left rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-[2.5]" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
