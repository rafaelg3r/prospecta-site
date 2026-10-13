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
      <div className="card-area overflow-hidden rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-7 py-6 sm:px-10">
          <p className="flex items-center gap-3 font-display text-xl font-semibold text-ink">
            <FileText weight="light" className="size-7 text-accent" aria-hidden />
            Diagnóstico Digital
          </p>
          <p className="font-display text-sm font-light uppercase italic tracking-[0.32em] text-mute">Sumário</p>
        </div>
        <ol className="grid gap-x-12 px-7 py-4 sm:px-10 sm:py-6 md:grid-cols-2">
          {CHAPTERS.map((chapter, i) => (
            <li key={chapter} className="flex items-baseline gap-4 border-b border-dashed border-white/10 py-4 last:border-0 md:[&:nth-last-child(2)]:border-0">
              <span className="font-display text-sm font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-lg font-medium text-ink sm:text-xl">{chapter}</span>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
