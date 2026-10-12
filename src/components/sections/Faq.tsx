import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";

const FAQ = [
  {
    q: "Preciso fechar um pacote mensal?",
    a: "Não. Todos os serviços podem ser contratados de forma avulsa, como uma landing page, um carrossel ou um diagnóstico digital. Os pacotes são para quem quer acompanhamento contínuo.",
  },
  {
    q: "Vocês fazem o site e também o conteúdo?",
    a: "Sim. Web, design, vídeo e estratégia acontecem no mesmo estúdio, então site, posts e Reels falam a mesma língua.",
  },
  {
    q: "Por onde a gente começa?",
    a: "Por uma conversa no WhatsApp. Entendemos o momento da sua empresa e indicamos o caminho: um serviço pontual, um pacote mensal ou um diagnóstico digital.",
  },
  {
    q: "Como vocês medem o resultado?",
    a: "Antes de começar, definimos com você o objetivo e as métricas que importam. Depois, revisamos os números em uma cadência combinada e ajustamos a estratégia.",
  },
  {
    q: "Os valores podem variar?",
    a: "Os valores dos pacotes são a referência mensal. Quando há faixa, o preço final depende do escopo e é confirmado na proposta, depois de entendermos o momento do seu negócio.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Dúvidas frequentes</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            Antes de chamar no <span className="text-violet pr-[0.06em] font-light italic">WhatsApp.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {FAQ.map((item) => (
              <details key={item.q} className="faq group panel rounded-3xl px-6 sm:px-8">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl font-semibold text-ink sm:text-2xl">
                  {item.q}
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-brand-300 transition-transform duration-500 ease-out-expo group-open:rotate-45">
                    <Plus weight="bold" className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-7 text-lg leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
