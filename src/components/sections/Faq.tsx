import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { COMBO_SITE_DISCOUNT } from "@/content/combos";

const FAQ = [
  {
    q: "Preciso fechar um pacote mensal?",
    a: "Não. Todos os serviços podem ser contratados de forma avulsa, como um site, uma landing page, um carrossel ou um diagnóstico digital. Os pacotes são para quem quer acompanhamento contínuo.",
  },
  {
    q: "O que é um combo?",
    a: `É um pacote mensal contratado junto com um site. No combo, o site sai com ${Math.round(COMBO_SITE_DISCOUNT * 100)}% de desconto sobre o valor avulso, e o pacote mantém o mesmo valor mensal.`,
  },
  {
    q: "Vocês fazem o site e também o conteúdo?",
    a: "Sim. Web, design, vídeo e estratégia acontecem no mesmo estúdio, então site, posts e Reels falam a mesma língua.",
  },
  {
    q: "Por onde a gente começa?",
    a: "Por uma conversa no WhatsApp. Entendemos o momento da sua empresa e indicamos o caminho: um serviço pontual, um pacote mensal, um combo com site ou um diagnóstico digital.",
  },
  {
    q: "Como vocês medem o resultado?",
    a: "Antes de começar, definimos com você o objetivo e as métricas que importam. Depois, revisamos os números em uma cadência combinada e ajustamos a estratégia.",
  },
  {
    q: "Os valores podem variar?",
    a: "Os valores dos pacotes são a referência mensal, e os dos sites são por projeto. Quando há faixa, o preço final depende do escopo e é confirmado na proposta, depois de entendermos o momento do seu negócio.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-10">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-display text-[0.85rem] font-light uppercase italic tracking-[0.42em] text-mute">Dúvidas frequentes</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-ink">
            <SplitText>
              Antes de chamar no <span className="text-violet pr-[0.06em] font-light italic">WhatsApp.</span>
            </SplitText>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-t border-white/10">
            {FAQ.map((item) => (
              <details key={item.q} className="faq group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 font-display text-xl font-semibold text-ink transition-colors duration-300 hover:text-brand-200 sm:text-2xl">
                  {item.q}
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-brand-300 transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-open:rotate-45 group-open:border-brand-300 group-open:bg-brand-300 group-open:text-void">
                    <Plus weight="bold" className="size-4" aria-hidden />
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-8 text-lg leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
