import { ArrowRight, ArrowUpRight, CheckCircle, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ReactNode } from "react";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { DesignGallery } from "@/components/sections/services/DesignGallery";
import { WebShowcase } from "@/components/sections/services/WebShowcase";
import { AreaNav } from "@/components/service/AreaNav";
import { DiagnosticMap } from "@/components/service/DiagnosticMap";
import { DesignHero } from "@/components/service/heroes/DesignHero";
import { StrategyHero } from "@/components/service/heroes/StrategyHero";
import { VideoHero } from "@/components/service/heroes/VideoHero";
import { WebHero } from "@/components/service/heroes/WebHero";
import { ReelAnatomy } from "@/components/service/ReelAnatomy";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { COMBO_DISCOUNT_LABEL } from "@/content/combos";
import { DESIGN_INSTAGRAM_URL } from "@/content/portfolio";
import { offerPrice, serviceCategories, serviceHref, type ServiceCategory } from "@/content/services";
import { teamMember } from "@/content/team";
import { whatsappLink } from "@/lib/site";

// Source: Notion > Processos da Prospecta > SOPs (same closing criteria on every process).
const DONE_CRITERIA = ["Entrega revisada", "Aprovação registrada", "Próximo passo definido"];

const quoteMessage = (what: string) => `Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento de ${what}.`;

function SectionHeading({ eyebrow, children, intro }: { eyebrow: string; children: ReactNode; intro?: string }) {
  return (
    <Reveal className="max-w-3xl">
      <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">{eyebrow}</p>
      <h2 className="mt-5 font-display text-[clamp(2.2rem,4.8vw,4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
        {children}
      </h2>
      {intro && <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">{intro}</p>}
    </Reveal>
  );
}

const Accent = ({ children }: { children: ReactNode }) => (
  <span className="text-accent-gradient pr-[0.06em] font-light italic">{children}</span>
);

// Real work (or, for areas without public cases, how the deliverable is built).
function Showcase({ area }: { area: ServiceCategory }) {
  switch (area.slug) {
    case "web":
      return (
        <>
          <SectionHeading eyebrow="Portfólio" intro="Alguns sites que já estão no ar. Toque em um projeto para ver.">
            Sites feitos <Accent>por aqui.</Accent>
          </SectionHeading>
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-5xl md:mt-20">
            <WebShowcase />
          </Reveal>
        </>
      );
    case "design":
      return (
        <>
          <SectionHeading eyebrow="Portfólio" intro="Posts criados para o Instagram. Passe o cursor para abrir o leque.">
            Peças feitas <Accent>por aqui.</Accent>
          </SectionHeading>
          <Reveal delay={0.1} className="mt-10 min-w-0 md:mt-16">
            <DesignGallery />
          </Reveal>
          <Reveal className="mt-6 flex justify-center">
            <a
              href={DESIGN_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-2 font-semibold text-accent-light transition-colors hover:text-white"
            >
              <InstagramLogo weight="bold" className="size-5" aria-hidden />
              Ver mais no Instagram
            </a>
          </Reveal>
        </>
      );
    case "video":
      return (
        <>
          <SectionHeading eyebrow="Anatomia de um Reel" intro="Todo roteiro que escrevemos segue a mesma estrutura em três partes.">
            Cada segundo com uma <Accent>função.</Accent>
          </SectionHeading>
          <div className="mt-14 md:mt-20">
            <ReelAnatomy />
          </div>
        </>
      );
    case "estrategia":
      return (
        <>
          <SectionHeading
            eyebrow="Diagnóstico Digital"
            intro="O diagnóstico é o ponto de partida. Estes são os capítulos do relatório que você recebe."
          >
            Tudo o que olhamos antes de <Accent>recomendar.</Accent>
          </SectionHeading>
          <div className="mt-14 md:mt-20">
            <DiagnosticMap />
          </div>
        </>
      );
  }
}

function AreaHero({ area }: { area: ServiceCategory }) {
  switch (area.slug) {
    case "web":
      return <WebHero area={area} />;
    case "design":
      return <DesignHero area={area} />;
    case "video":
      return <VideoHero area={area} />;
    case "estrategia":
      return <StrategyHero area={area} />;
  }
}

export function ServicePage({ area }: { area: ServiceCategory }) {
  const owner = teamMember(area.owner);
  const others = serviceCategories.filter((c) => c.slug !== area.slug);

  return (
    <>
      <main data-area={area.slug}>
        <AreaNav current={area.slug} />
        <AreaHero area={area} />

        {/* Services and prices */}
        <section id="servicos-e-valores" className="py-20 md:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Serviços e valores"
              intro="Todos podem ser contratados de forma avulsa. Quando há faixa, o valor final depende do escopo e é confirmado no orçamento."
            >
              O que fazemos em <Accent>{area.name.toLowerCase()}.</Accent>
            </SectionHeading>

            <ul className={`mt-14 grid gap-5 md:mt-20 md:grid-cols-2 ${area.offers.length === 3 ? "lg:grid-cols-3" : ""}`}>
              {area.offers.map((offer, i) => (
                <Reveal as="li" key={offer.name} delay={i * 0.06} className="h-full">
                  <a
                    href={whatsappLink(quoteMessage(offer.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-vivid flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 sm:p-9"
                  >
                    <span aria-hidden className="absolute left-7 top-0 h-1 w-16 rounded-b-full bg-accent sm:left-9" />
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-display text-5xl font-semibold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-[#0a0526] transition-transform duration-300 ease-out-expo group-hover:rotate-45">
                        <ArrowUpRight weight="bold" className="size-4" aria-hidden />
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-[1.7rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{offer.name}</h3>
                    <p className="mt-3 text-lg leading-relaxed text-mute">{offer.description}</p>
                    <div className="mt-auto pt-8">
                      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-white/10 pt-6">
                        <p>
                          <span className="block font-display text-2xl font-semibold tracking-[-0.02em] text-ink">{offerPrice(offer)}</span>
                          {offer.unit && offer.priceMin !== undefined && <span className="text-sm text-mute">{offer.unit}</span>}
                        </p>
                        <span className="text-sm font-semibold text-accent-light transition-colors group-hover:text-white">
                          Agendar orçamento
                          <span className="sr-only"> de {offer.name} pelo WhatsApp</span>
                        </span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Portfolio or deliverable anatomy */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <Showcase area={area} />
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading eyebrow="Como trabalhamos" intro="As mesmas etapas em todo projeto, para você saber sempre em que ponto ele está.">
              Um processo que você <Accent>acompanha.</Accent>
            </SectionHeading>

            <ol className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:mt-20 lg:grid-cols-4">
              {area.process.map((step, i) => (
                <Reveal as="li" key={step} delay={(i % 4) * 0.06} className="relative border-t border-white/12 pt-6">
                  <span
                    aria-hidden
                    className="absolute -top-px left-0 h-0.5 w-16 bg-[linear-gradient(90deg,var(--color-accent),transparent)]"
                  />
                  <span className="font-display text-sm font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">{step}</p>
                </Reveal>
              ))}
            </ol>

            <Reveal className="card-vivid mt-14 flex flex-col gap-4 rounded-3xl px-7 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
              <p className="font-display text-xl font-semibold text-ink">Toda entrega termina com</p>
              <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                {DONE_CRITERIA.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-mute">
                    <CheckCircle weight="fill" className="size-6 text-accent" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Toolkit + who does it */}
        <section className="py-10 md:py-16">
          <div className="mx-auto grid max-w-[1400px] gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
            <Reveal className="card-vivid rounded-3xl p-7 sm:p-10">
              <p className="font-display text-[0.8rem] font-light uppercase italic tracking-[0.36em] text-mute">{area.toolkit.title}</p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {area.toolkit.items.map((item) => (
                  <li key={item} className="rounded-full border border-accent/35 bg-accent/12 px-4 py-2 font-medium text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.08} className="card-vivid flex flex-col gap-6 rounded-3xl p-7 sm:flex-row sm:items-center sm:p-10">
              <span className="inline-flex size-20 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-accent-light),var(--color-accent-strong)_60%,#24095e)] font-display text-2xl font-semibold text-white ring-1 ring-white/30">
                {owner.initials}
              </span>
              <div>
                <p className="font-display text-[0.8rem] font-light uppercase italic tracking-[0.36em] text-mute">Quem cuida</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink">{owner.name}</p>
                <p className="text-accent-light">{owner.role}</p>
                <p className="mt-3 leading-relaxed text-mute">{owner.bio}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Monthly packages and combos */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <Reveal className="card-accent relative isolate overflow-hidden rounded-3xl p-8 sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 -z-10 size-80 rounded-full border border-white/15 [box-shadow:0_0_0_36px_rgb(255_255_255/0.035),0_0_0_80px_rgb(255_255_255/0.02)]"
              />
              <p className="font-display text-[0.8rem] font-light uppercase italic tracking-[0.36em] text-white/70">Também todo mês</p>
              <p className="mt-4 max-w-[30ch] font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
                {area.inPackages}
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <WhatsAppButton
                  variant="light"
                  message="Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento de um pacote mensal."
                />
                <Link href="/#pacotes" className="group inline-flex items-center gap-2 px-2 font-semibold text-white transition-colors hover:text-brand-200">
                  Ver pacotes mensais
                  <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                {area.slug === "web" && (
                  <Link href="/#combos" className="group inline-flex items-center gap-2 px-2 font-semibold text-white transition-colors hover:text-brand-200">
                    Montar combo: {COMBO_DISCOUNT_LABEL}
                    <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Other areas */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
            <SectionHeading eyebrow="Outras áreas">
              Tudo sob o mesmo <Accent>teto.</Accent>
            </SectionHeading>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {others.map((c, i) => {
                const OtherIcon = SERVICE_ICONS[c.slug];
                return (
                  <Reveal as="li" key={c.slug} area={c.slug} delay={i * 0.06} className="h-full">
                    <Link
                      href={serviceHref(c.slug)}
                      className="group card-vivid flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 sm:p-8"
                    >
                      <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-accent text-[#0a0526]">
                        <OtherIcon weight="bold" className="size-6" />
                      </span>
                      <span className="mt-6 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">{c.name}</span>
                      <span className="mt-2 leading-relaxed text-mute">{c.description}</span>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-accent-light transition-colors group-hover:text-white">
                        Conhecer
                        <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
