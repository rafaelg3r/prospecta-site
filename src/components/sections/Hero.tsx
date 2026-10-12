import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import type { CSSProperties, ReactNode } from "react";
import { OrbitScene } from "@/components/brand/OrbitScene";
import { Starfield } from "@/components/brand/Starfield";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function MaskLine({ children, d }: { children: ReactNode; d: number }) {
  // Padding around the mask (offset by negative margins) keeps accents (ó),
  // descenders (g, q) and the italic overhang from being clipped.
  return (
    <span className="mx-[-0.12em] mt-[-0.16em] mb-[-0.2em] block overflow-hidden px-[0.12em] pb-[0.2em] pt-[0.16em]">
      <span className="intro-rise block" style={delay(d)}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Starfield className="-z-10 opacity-80" />

      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-4 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.08fr_1fr] lg:gap-6 lg:px-10 lg:pb-12 lg:pt-24">
        <div className="relative z-10">
          <p
            className="intro-fade font-display text-[0.72rem] font-light uppercase italic tracking-[0.28em] text-mute sm:text-[0.85rem] sm:tracking-[0.42em]"
            style={delay(0.1)}
          >
            Sites, estratégia e prospecção digital
          </p>

          <h1 className="mt-6 font-display text-[clamp(3.1rem,7.2vw,6.6rem)] font-semibold leading-[0.98] tracking-[-0.035em]">
            <MaskLine d={0.2}>
              <span className="text-metal">Sites que</span>
            </MaskLine>
            <MaskLine d={0.32}>
              <span className="text-metal">prospectam</span>
            </MaskLine>
            <MaskLine d={0.44}>
              <span className="text-violet pr-[0.12em] font-light italic">clientes.</span>
            </MaskLine>
          </h1>

          <p className="intro-fade mt-7 max-w-[36ch] text-lg leading-relaxed text-mute md:text-xl" style={delay(0.65)}>
            Criamos sites e estratégias que colocam sua empresa na frente de quem já está procurando, e transformam visitas em
            conversas no WhatsApp.
          </p>

          <div
            className="intro-fade mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={delay(0.8)}
          >
            <Magnetic>
              <WhatsAppButton size="lg" />
            </Magnetic>
            <a
              href="#pacotes"
              className="group inline-flex h-14 items-center gap-2 rounded-full px-4 text-base font-semibold text-ink transition-colors hover:text-brand-300 md:h-16"
            >
              Ver pacotes
              <ArrowDownRight
                weight="bold"
                className="size-5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden
              />
            </a>
          </div>
        </div>

        <div className="intro-mark relative mx-auto w-[min(82vw,440px)] lg:w-full lg:max-w-[660px]" style={delay(0.15)}>
          <OrbitScene />
        </div>
      </div>
    </section>
  );
}
