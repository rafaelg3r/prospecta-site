import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { SplitText } from "@/components/ui/SplitText";
import { serviceCategories, serviceHref } from "@/content/services";

// Right after the hero: an index of the four areas, one row each. On hover the
// row fills from the bottom with that area's accent and the name steps in.
export function AreaLinks() {
  return (
    <section id="areas" aria-labelledby="areas-title" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Explore por área</p>
          <h2
            id="areas-title"
            className="mt-4 font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
          >
            <SplitText>
              Escolha por onde <span className="text-violet pr-[0.06em] font-light italic">começar.</span>
            </SplitText>
          </h2>
          <p className="mt-4 max-w-[52ch] text-mute">Cada área tem uma página com serviços, valores, portfólio e como trabalhamos.</p>
        </Reveal>

        <ul className="mt-10 border-t border-white/10 md:mt-14">
          {serviceCategories.map((c, i) => {
            const Icon = SERVICE_ICONS[c.slug];
            const offers = c.offers.map((o) => o.short ?? o.name).join(", ");
            return (
              <Reveal as="li" key={c.slug} area={c.slug} delay={i * 0.06} y={16}>
                <Link
                  href={serviceHref(c.slug)}
                  className="group relative isolate grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 overflow-hidden border-b border-white/10 py-6 sm:gap-x-8 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,22rem)_auto] md:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent)] transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
                  />
                  <Icon
                    aria-hidden
                    weight="light"
                    className="size-8 text-accent transition-transform duration-700 ease-out-expo group-hover:-rotate-12 md:size-10"
                  />
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-none tracking-[-0.035em] text-ink transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                      {c.name}
                    </span>
                    <span className="mt-2 block text-sm text-mute md:hidden">{offers}</span>
                  </span>
                  <span className="hidden text-mute md:block">{offers}</span>
                  <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-ink transition-[background-color,border-color,color] duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-[#0a0526] md:size-14">
                    <span className="arrow-swap size-4 md:size-5" aria-hidden>
                      <ArrowUpRight weight="bold" className="size-full" />
                      <ArrowUpRight weight="bold" className="size-full" />
                    </span>
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
