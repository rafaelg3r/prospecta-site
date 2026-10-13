import { OrbitScene } from "@/components/brand/OrbitScene";
import { Starfield } from "@/components/brand/Starfield";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function FinalCta() {
  return (
    <section id="contato" className="relative isolate overflow-hidden pb-28 pt-16 md:pb-40 md:pt-24">
      <Starfield seed={21} twinkles={5} className="-z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(90_43_184/0.28),transparent_70%)]"
      />

      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-4 text-center sm:px-6 lg:px-10">
        <Reveal className="w-[min(70vw,320px)]">
          <OrbitScene interactive={false} />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,6.4rem)] font-semibold leading-[1] tracking-[-0.035em]">
            <span className="text-metal">Pronto para atrair mais </span>
            <span className="text-violet pr-[0.08em] font-light italic">clientes?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-[44ch] text-lg leading-relaxed text-mute md:text-xl">
            Conte o momento do seu negócio. A gente responde com o caminho certo para ele.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <Magnetic>
            <WhatsAppButton size="lg" />
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
