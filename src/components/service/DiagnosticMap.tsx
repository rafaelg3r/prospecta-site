import { FileText } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

// Source: Notion > Prospecta Work > Estratégia Digital > Diagnóstico Digital.
const CHAPTERS = [
  "Contexto da empresa",
  "Público",
  "Posicionamento",
  "Concorrentes",
  "Presença digital atual",
  "Problemas encontrados",
  "Oportunidades",
  "Estratégias recomendadas",
  "Plano de ação",
  "Métricas",
];

// The diagnostic shown as the table of contents of the report the client receives.
export function DiagnosticMap() {
  return (
    <Reveal className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-10 inset-x-0 -z-10 lg:-inset-x-10 bg-[radial-gradient(closest-side,rgb(119_68_219/0.28),transparent)]"
      />
      <div className="overflow-hidden rounded-3xl border border-white/12 bg-[linear-gradient(165deg,#1d0e55_0%,#110741_55%,#0c0630_100%)] shadow-[0_40px_90px_-40px_rgb(61_20_148/0.9),inset_0_1px_0_rgb(255_255_255/0.12)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-7 py-6 sm:px-10">
          <p className="flex items-center gap-3 font-display text-xl font-semibold text-ink">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-500/25 text-brand-200">
              <FileText weight="light" className="size-5" aria-hidden />
            </span>
            Diagnóstico Digital
          </p>
          <p className="font-display text-sm font-light uppercase italic tracking-[0.32em] text-mute">Sumário</p>
        </div>
        <ol className="grid gap-x-12 px-7 py-4 sm:px-10 sm:py-6 md:grid-cols-2">
          {CHAPTERS.map((chapter, i) => (
            <li key={chapter} className="flex items-baseline gap-4 border-b border-dashed border-white/10 py-4 last:border-0 md:[&:nth-last-child(2)]:border-0">
              <span className="font-display text-sm font-semibold tabular-nums text-brand-300">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-lg font-medium text-ink sm:text-xl">{chapter}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
