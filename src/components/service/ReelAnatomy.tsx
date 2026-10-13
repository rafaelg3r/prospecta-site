import { Play } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

// The three parts every script is built around (same wording as the home page).
const PARTS = [
  {
    name: "Gancho",
    short: "Gancho",
    text: "Os primeiros segundos decidem se a pessoa fica. É onde entra a ideia mais forte do roteiro.",
    share: "basis-[22%]",
  },
  {
    name: "Desenvolvimento",
    short: "Meio",
    text: "A mensagem em ritmo de corte, direto ao ponto e pensada para o formato vertical.",
    share: "basis-[56%]",
  },
  {
    name: "Chamada para ação",
    short: "CTA",
    text: "O próximo passo claro: salvar, comentar, seguir ou chamar no WhatsApp.",
    share: "basis-[22%]",
  },
];

// A phone with a looping playhead over the script timeline, next to what each part does.
export function ReelAnatomy() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
      <Reveal className="mx-auto w-[min(72vw,300px)]">
        <div
          aria-hidden
          className="relative aspect-[9/16] overflow-hidden rounded-[2.4rem] border border-white/15 bg-[linear-gradient(165deg,#6c39d2_0%,#3d1494_45%,#0c0630_100%)] p-5 shadow-[0_40px_90px_-30px_rgb(119_68_219/0.8),inset_0_1px_0_rgb(255_255_255/0.2)]"
        >
          <div className="mx-auto h-1.5 w-16 rounded-full bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-20 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30">
              <Play weight="fill" className="size-8 translate-x-0.5 text-white" />
            </span>
          </div>
          <div className="absolute inset-x-5 bottom-6">
            <div className="h-1 overflow-hidden rounded-full bg-white/20">
              <div className="reel-progress h-full w-full origin-left rounded-full bg-white" />
            </div>
            <div className="mt-2 flex gap-1.5">
              {PARTS.map((part, i) => (
                <div key={part.name} className={cn("h-1.5 rounded-full", i === 0 ? "bg-brand-200" : i === 2 ? "bg-brand-300/80" : "bg-white/35", part.share)} />
              ))}
            </div>
            <div className="mt-2.5 flex gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/70">
              {PARTS.map((part) => (
                <span key={part.name} className={cn("truncate", part.share)}>
                  {part.short}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <ol className="flex flex-col gap-4">
        {PARTS.map((part, i) => (
          <Reveal as="li" key={part.name} delay={i * 0.08} className="panel flex gap-5 rounded-3xl p-6 sm:p-8">
            <span className="w-16 shrink-0 font-display text-5xl font-semibold leading-none text-outline">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display text-2xl font-semibold text-ink">{part.name}</h3>
              <p className="mt-2 text-lg leading-relaxed text-mute">{part.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
