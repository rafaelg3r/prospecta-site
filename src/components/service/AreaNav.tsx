import Link from "next/link";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { serviceCategories, serviceHref, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

// Sticky switcher under the header on area pages: every area one tap away, current one in its accent.
export function AreaNav({ current }: { current: ServiceSlug }) {
  return (
    <nav aria-label="Áreas de serviço" className="sticky top-[72px] z-30 mt-[72px] border-y border-white/[0.07] bg-[#08031a]/95">
      <div className="mx-auto flex max-w-[1400px] items-center gap-1.5 overflow-x-auto sm:gap-2 px-4 py-2.5 [scrollbar-width:none] sm:px-6 lg:px-10 [&::-webkit-scrollbar]:hidden">
        <Link href="/#servicos" className="hidden shrink-0 pr-1 text-sm font-semibold text-mute transition-colors hover:text-ink sm:inline">
          Serviços
        </Link>
        <span aria-hidden className="hidden h-5 w-px shrink-0 bg-white/15 sm:block" />
        {serviceCategories.map((c) => {
          const active = c.slug === current;
          const Icon = SERVICE_ICONS[c.slug];
          return (
            <Link
              key={c.slug}
              href={serviceHref(c.slug)}
              data-area={c.slug}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 sm:gap-2 sm:px-4",
                active ? "bg-accent text-[#0a0526]" : "text-mute hover:bg-accent/12 hover:text-ink",
              )}
            >
              <Icon weight="bold" className={cn("size-4", !active && "hidden text-accent sm:block")} aria-hidden />
              {!active && <span aria-hidden className="size-1.5 rounded-full bg-accent sm:hidden" />}
              {c.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
