import { ArrowDown, Check, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { packages } from "@/content/packages";
import { offerPrice, serviceCategories } from "@/content/services";
import { cn } from "@/lib/cn";

const web = serviceCategories.find((c) => c.slug === "web")!;
export const siteOffers = web.offers;
const launch = packages.find((p) => p.includesSite);

// One browser window, drawn at (x, y). Back windows are dimmer.
function Frame({ x, y, front }: { x: number; y: number; front: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={front ? 1 : 0.55}>
      <rect width="72" height="52" rx="6" fill="#06020f" stroke="#9670ea" strokeWidth="1.6" />
      <path d="M0 13h72" stroke="#9670ea" strokeOpacity="0.6" strokeWidth="1.2" />
      {[8, 14, 20].map((cx) => (
        <circle key={cx} cx={cx} cy="6.5" r="1.8" fill="#b49cf5" />
      ))}
      {front && (
        <>
          <rect x="8" y="20" width="36" height="4" rx="2" fill="#d3c4fb" />
          <rect x="8" y="28" width="24" height="3" rx="1.5" fill="#d3c4fb" fillOpacity="0.5" />
          <rect x="8" y="36" width="56" height="9" rx="2" fill="#7744db" fillOpacity="0.55" />
        </>
      )}
    </g>
  );
}

// Window positions per level, back to front: 1 page, a few pages, many pages.
const STACKS = [
  [[16, 12]],
  [[28, 4], [12, 20]],
  [[32, 0], [16, 12], [0, 24]],
];

// Grows with the site; the last level is an app built from scratch.
export function SiteGlyph({ level, className }: { level: number; className?: string }) {
  const stack = STACKS[level];

  return (
    <svg aria-hidden viewBox="0 0 104 76" className={cn("overflow-visible", className)}>
      {stack ? (
        stack.map(([x, y], i) => <Frame key={i} x={x} y={y} front={i === stack.length - 1} />)
      ) : (
        <g transform="translate(16 12)">
          <rect width="72" height="52" rx="6" fill="#06020f" stroke="#b49cf5" strokeWidth="1.6" />
          <path d="M0 13h72M22 13v39" stroke="#9670ea" strokeOpacity="0.6" strokeWidth="1.2" />
          {[8, 14, 20].map((cx) => (
            <circle key={cx} cx={cx} cy="6.5" r="1.8" fill="#b49cf5" />
          ))}
          {[20, 27, 34].map((y) => (
            <rect key={y} x="6" y={y} width="10" height="3" rx="1.5" fill="#d3c4fb" fillOpacity="0.5" />
          ))}
          <path d="M38 26l-6 6 6 6M56 26l6 6-6 6M50 24l-6 16" fill="none" stroke="#d3c4fb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

export function Sites() {
  return (
    <section id="sites" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Sites</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
            <SplitText>
              Um site do tamanho do seu <span className="text-violet pr-[0.06em] font-light italic">negócio.</span>
            </SplitText>
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-mute">
            Preço por projeto, sem mensalidade. Quando há faixa, o valor final depende do escopo e é confirmado na proposta.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {siteOffers.map((offer, i) => (
            <Reveal as="li" key={offer.name} delay={i * 0.06} className="h-full min-w-0">
              <article className="panel flex h-full flex-col rounded-3xl p-7 sm:p-8">
                <SiteGlyph level={i} className="h-16 w-auto self-start" />
                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">{offer.scope}</p>
                <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-[1.1] tracking-[-0.02em] text-ink">{offer.name}</h3>
                <p className="mt-5 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {offerPrice(offer)}
                </p>
                <p className="text-sm text-mute">{offer.unit}</p>
                <p className="mt-5 leading-relaxed text-mute">{offer.description}</p>
                <div className="mt-auto pt-8">
                  <WhatsAppButton
                    className="w-full"
                    message={`Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento de ${offer.name}.`}
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/[0.08] px-7 py-6 sm:px-10 md:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <p className="shrink-0 font-display text-xl font-semibold text-ink">Todo site inclui</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {web.toolkit.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-mute">
                <Check weight="bold" className="size-4 shrink-0 text-brand-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {launch && (
          <Reveal className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-mute">
            <RocketLaunch weight="light" className="size-5 shrink-0 text-brand-300" aria-hidden />
            <span>O Prospecta {launch.name} já vem com site incluso.</span>
            <a
              href="#pacotes"
              className="group inline-flex items-center gap-1 font-semibold text-brand-200 transition-colors hover:text-white"
            >
              Ver pacotes mensais
              <ArrowDown
                weight="bold"
                className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
