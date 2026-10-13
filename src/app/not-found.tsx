import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { OrbitScene } from "@/components/brand/OrbitScene";
import { Starfield } from "@/components/brand/Starfield";
import { Footer } from "@/components/sections/Footer";
import { AreaLink } from "@/components/ui/AreaLink";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
  title: "Página não encontrada | Prospecta Studio",
  robots: { index: false },
};

// Static export writes this as 404.html: the brand's own page instead of Next's default English one.
export default function NotFound() {
  return (
    <>
      <main className="relative isolate overflow-hidden">
        <Starfield seed={404} className="-z-10 opacity-70" />
        <div className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col items-center justify-center px-4 pb-20 pt-28 text-center sm:px-6 lg:px-10">
          <div className="w-[min(56vw,240px)]">
            <OrbitScene interactive={false} />
          </div>
          <h1 className="mt-4 max-w-[18ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            <span className="text-metal">Esta página saiu de </span>
            <span className="text-violet pr-[0.08em] font-light italic">órbita.</span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mute">
            O endereço pode ter mudado ou não existir mais. Escolha uma área ou volte para o início.
          </p>
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <AreaLink slug={c.slug} label={c.name} size="sm" />
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <WhatsAppButton />
            <Link
              href="/"
              className="group inline-flex h-12 items-center gap-2 rounded-full px-4 font-semibold text-ink transition-colors hover:text-brand-300"
            >
              <ArrowLeft weight="bold" className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden />
              Voltar ao início
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
