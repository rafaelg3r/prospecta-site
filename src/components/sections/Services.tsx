import { ArrowDownRight, ArrowRight, ArrowUpRight, Browsers, FilmSlate, InstagramLogo, PenNib, Strategy } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { DesignGallery } from "@/components/sections/services/DesignGallery";
import { WebShowcase } from "@/components/sections/services/WebShowcase";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { COMBO_DISCOUNT_LABEL } from "@/content/combos";
import { DESIGN_INSTAGRAM_URL } from "@/content/portfolio";
import { serviceCategories, serviceHref, type ServiceCategory } from "@/content/services";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

type IconType = ComponentType<{ className?: string; weight?: "light" | "regular" | "bold" | "fill" | "duotone" | "thin" }>;

export const SERVICE_ICONS: Record<ServiceCategory["slug"], IconType> = {
  web: Browsers,
  estrategia: Strategy,
  design: PenNib,
  video: FilmSlate,
};

const category = (slug: ServiceCategory["slug"]) => serviceCategories.find((c) => c.slug === slug)!;

const quoteMessage = (what: string) => `Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento de ${what}.`;

function CategoryHeading({ slug, onViolet = false }: { slug: ServiceCategory["slug"]; onViolet?: boolean }) {
  const Icon = SERVICE_ICONS[slug];
  const c = category(slug);
  return (
    <>
      <span
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border",
          onViolet ? "border-white/25 bg-white/10 text-white" : "border-white/10 bg-white/[0.04] text-brand-300",
        )}
      >
        <Icon weight="light" className="size-6" />
      </span>
      <h3 className="mt-6 font-display text-[clamp(2.6rem,4.6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
        {c.name}
      </h3>
      <p className={cn("mt-4 max-w-[40ch] text-lg leading-relaxed", onViolet ? "text-white/80" : "text-mute")}>{c.description}</p>
      <Link
        href={serviceHref(slug)}
        className={cn(
          "group mt-4 inline-flex items-center gap-2 font-semibold transition-colors",
          onViolet ? "text-white hover:text-brand-200" : "text-brand-200 hover:text-white",
        )}
      >
        Conhecer a área de {c.name}
        <ArrowRight weight="bold" className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" aria-hidden />
      </Link>
    </>
  );
}

// Each service is a direct "book a quote for X" link.
function ServiceChips({ slug, onViolet = false }: { slug: ServiceCategory["slug"]; onViolet?: boolean }) {
  return (
    <ul className="mt-7 flex flex-wrap gap-2">
      {category(slug).offers.map(({ name: service }) => (
        <li key={service}>
          <a
            href={whatsappLink(quoteMessage(service))}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300",
              onViolet
                ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
                : "border-white/12 bg-white/[0.04] text-ink hover:border-brand-400/50 hover:bg-brand-500/15",
            )}
          >
            {service}
            <ArrowUpRight weight="bold" className="size-3.5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            <span className="sr-only"> (agendar orçamento pelo WhatsApp)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function Step({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span aria-hidden className="mt-2 size-2.5 shrink-0 rounded-full bg-current opacity-70" />
      <div>
        <p className="font-display text-xl font-semibold">{title}</p>
        <p className="mt-1 leading-relaxed opacity-80">{children}</p>
      </div>
    </li>
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
            Contrate de forma avulsa, dentro de um pacote ou em um combo com site. Veja alguns trabalhos e toque em um serviço para agendar seu orçamento.
          </p>
        </Reveal>

        {/* Web: copy on the left, live portfolio on the right */}
        <div className="mt-16 grid items-center gap-10 md:mt-24 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <CategoryHeading slug="web" />
            <ServiceChips slug="web" />
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton message={quoteMessage("um site")} />
              <a
                href="#combos"
                className="group inline-flex items-center gap-2 px-2 font-semibold text-brand-200 transition-colors hover:text-white"
              >
                Com pacote mensal: {COMBO_DISCOUNT_LABEL}
                <ArrowDownRight
                  weight="bold"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <WebShowcase />
          </Reveal>
        </div>

        {/* Design: the work leads, copy follows */}
        <div className="mt-28 grid items-center gap-8 md:mt-40 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:order-2 lg:col-span-5">
            <CategoryHeading slug="design" />
            <ServiceChips slug="design" />
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <WhatsAppButton message={quoteMessage("design")} />
              <a
                href={DESIGN_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-2 font-semibold text-brand-200 transition-colors hover:text-white"
              >
                <InstagramLogo weight="bold" className="size-5" aria-hidden />
                Ver mais no Instagram
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 lg:order-1 lg:col-span-7">
            <DesignGallery />
          </Reveal>
        </div>

        {/* Video + Strategy: two bold cards, no invented cases */}
        <div className="mt-28 grid gap-5 md:mt-40 lg:grid-cols-2">
          <Reveal className="relative isolate overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(160deg,#6c39d2_0%,#4a1aa6_45%,#24095e_100%)] p-7 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] sm:p-10">
            <FilmSlate aria-hidden weight="thin" className="pointer-events-none absolute -bottom-10 -right-8 -z-10 size-64 text-white/10" />
            <CategoryHeading slug="video" onViolet />
            <ol className="mt-8 space-y-5 text-white">
              <Step title="Roteiro">A ideia, o gancho dos primeiros segundos e a chamada para ação.</Step>
              <Step title="Edição">Corte, ritmo e acabamento pensados para Reels.</Step>
              <Step title="Entrega">Vídeo pronto para publicar no seu perfil.</Step>
            </ol>
            <ServiceChips slug="video" onViolet />
            <WhatsAppButton variant="light" className="mt-9" message={quoteMessage("vídeo")} />
          </Reveal>

          <Reveal delay={0.1} className="panel relative isolate overflow-hidden rounded-3xl p-7 sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full border border-white/15 [box-shadow:0_0_0_32px_rgb(255_255_255/0.025),0_0_0_70px_rgb(255_255_255/0.015)]"
            />
            <CategoryHeading slug="estrategia" />
            <ol className="mt-8 space-y-5 text-ink">
              <Step title="Diagnóstico Digital">Um raio-x da sua presença online e do que está travando a captação de clientes.</Step>
              <Step title="Estratégia Digital">Posicionamento, canais e metas claras, acompanhadas com métricas.</Step>
            </ol>
            <ServiceChips slug="estrategia" />
            <WhatsAppButton className="mt-9" message={quoteMessage("estratégia digital")} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
