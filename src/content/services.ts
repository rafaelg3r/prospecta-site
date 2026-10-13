// Source: Notion > Prospecta Work > Serviços (prices, all sold à la carte), the
// area pages (Web Development, Design Studio, Vídeo & Roteiros, Estratégia
// Digital) and Processos da Prospecta > SOPs & Checklists (process steps).
import { formatPrice } from "@/lib/format";

export type ServiceSlug = "web" | "design" | "video" | "estrategia";

export type ServiceOffer = {
  name: string;
  /** Shorter label for tight spots (floating tags on the area page). */
  short?: string;
  description: string;
  /** BRL. Omit both for "sob orçamento"; omit only priceMax for "a partir de". */
  priceMin?: number;
  priceMax?: number;
  /** Shown after the price, e.g. "por projeto". */
  unit?: string;
};

export type ServiceCategory = {
  slug: ServiceSlug;
  name: string;
  description: string;
  offers: ServiceOffer[];
  // Area page (/servicos/[slug])
  seoTitle: string;
  headline: string;
  /** Last words of the headline, set in violet italic. */
  headlineAccent: string;
  intro: string;
  process: string[];
  toolkit: { title: string; items: string[] };
  /** Team member slug, see src/content/team.ts. */
  owner: "rafael" | "alison";
  inPackages: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web",
    name: "Web",
    description: "Sites e páginas pensados para transformar visita em contato.",
    seoTitle: "Criação de sites e landing pages",
    headline: "Sites que transformam visita em",
    headlineAccent: "contato.",
    intro:
      "Landing pages, sites e projetos sob medida para quem chega pelo Google, pelo Instagram ou por indicação encontrar rápido o que procura e falar com você.",
    offers: [
      {
        name: "Landing Page",
        description: "Uma página focada em uma oferta e em um único próximo passo.",
        priceMin: 900,
        priceMax: 1500,
        unit: "por projeto",
      },
      {
        name: "Site com 2 páginas e funcionalidades",
        short: "Site com 2 páginas",
        description: "Duas páginas com os recursos que o seu negócio precisa.",
        priceMin: 1600,
        priceMax: 2400,
        unit: "por projeto",
      },
      {
        name: "Site completo",
        description: "O site institucional inteiro: quem você é, o que oferece e como falar com você.",
        priceMin: 2500,
        priceMax: 4500,
        unit: "por projeto",
      },
      {
        name: "Projeto web sob medida",
        short: "Sob medida",
        description: "Web apps e sistemas feitos do zero para uma necessidade específica.",
        priceMin: 4500,
        unit: "por projeto",
      },
    ],
    process: ["Briefing", "Arquitetura", "Wireframe", "Design", "Desenvolvimento", "Conteúdo", "Responsividade", "SEO", "Testes", "Revisão", "Deploy"],
    toolkit: { title: "Em todo site", items: ["SEO", "Performance", "Responsividade", "Integrações", "Deploy", "Manutenção"] },
    owner: "rafael",
    inPackages: "O Prospecta Launch já inclui site ou landing page. Com qualquer outro pacote mensal, o site entra no combo com desconto.",
  },
  {
    slug: "estrategia",
    name: "Estratégia",
    description: "Clareza sobre onde sua marca está e para onde ela precisa ir.",
    seoTitle: "Diagnóstico e estratégia digital",
    headline: "Um plano claro antes de",
    headlineAccent: "produzir.",
    intro:
      "Entendemos seu mercado, seu público e seus concorrentes para decidir onde investir, o que comunicar e como medir o resultado.",
    offers: [
      {
        name: "Diagnóstico Digital",
        description: "Um raio-x da sua presença online e do que está travando a captação de clientes.",
        priceMin: 297,
        priceMax: 497,
        unit: "por projeto",
      },
      {
        name: "Estratégia Digital",
        description: "Posicionamento, canais e metas claras, acompanhadas com métricas.",
        priceMin: 800,
        priceMax: 2000,
        unit: "por mês",
      },
    ],
    process: ["Diagnóstico", "Estratégia", "Plano de ação", "Métricas"],
    toolkit: {
      title: "No que trabalhamos",
      items: [
        "Pesquisa de mercado",
        "Concorrentes",
        "Personas",
        "ICP",
        "Posicionamento",
        "Pilares de conteúdo",
        "Funil",
        "Aquisição",
        "Conversão",
        "CTAs",
        "Calendário editorial",
      ],
    },
    owner: "alison",
    inPackages: "Estratégia faz parte dos pacotes Crescimento e Autoridade, e o Launch começa por um Diagnóstico Digital.",
  },
  {
    slug: "design",
    name: "Design",
    description: "Visual consistente, que faz sua marca ser lembrada.",
    seoTitle: "Design de posts, carrosséis e identidade visual",
    headline: "Um visual que faz sua marca ser",
    headlineAccent: "lembrada.",
    intro:
      "Posts, carrosséis e identidade visual falando a mesma língua, para o seu perfil ter cara de marca do primeiro ao último post.",
    offers: [
      {
        name: "Post profissional",
        description: "Uma peça pronta para o feed, com copy e direção visual.",
        priceMin: 120,
        priceMax: 180,
        unit: "por post",
      },
      {
        name: "Carrossel",
        description: "Conteúdo em sequência, pensado para ser salvo e compartilhado.",
        priceMin: 250,
        priceMax: 400,
        unit: "por carrossel",
      },
      {
        name: "Identidade visual",
        description: "Cores, tipografia e elementos que dão cara própria à sua marca.",
      },
    ],
    process: ["Briefing", "Estratégia", "Copy", "Conceito", "Design", "Revisão", "Aprovação", "Entrega"],
    toolkit: {
      title: "No dia a dia",
      items: ["Posts", "Carrosséis", "Identidades visuais", "Direção visual", "Referências", "Biblioteca visual"],
    },
    owner: "rafael",
    inPackages: "Posts e carrosséis fazem parte de todos os pacotes mensais, com planejamento por trás.",
  },
  {
    slug: "video",
    name: "Vídeo",
    description: "Roteiro e edição para Reels que prendem a atenção.",
    seoTitle: "Roteiro e edição de Reels",
    headline: "Reels que seguram a",
    headlineAccent: "atenção.",
    intro:
      "Do roteiro à edição: a ideia, o gancho dos primeiros segundos e a chamada para ação, prontos para publicar no seu perfil.",
    offers: [
      {
        name: "Roteiro",
        description: "A ideia, o gancho e a chamada para ação escritos para o seu público.",
        priceMin: 80,
        priceMax: 150,
        unit: "por roteiro",
      },
      {
        name: "Edição de Reel",
        description: "Corte, ritmo e acabamento pensados para o formato vertical.",
        priceMin: 150,
        priceMax: 350,
        unit: "por Reel",
      },
    ],
    process: ["Ideia", "Hook", "Roteiro", "Gravação", "Edição", "Revisão", "Aprovação", "Entrega"],
    toolkit: { title: "Em cada vídeo", items: ["Roteiros", "Hooks", "CTAs", "Storytelling", "Edição", "Referências"] },
    owner: "alison",
    inPackages: "Roteiros e Reels fazem parte de todos os pacotes mensais.",
  },
];

export const serviceHref = (slug: ServiceSlug) => `/servicos/${slug}`;

export function offerPrice({ priceMin, priceMax }: ServiceOffer) {
  if (priceMin === undefined) return "Sob orçamento";
  if (priceMax === undefined) return `A partir de ${formatPrice(priceMin)}`;
  return formatPrice(priceMin, priceMax);
}

export const marqueeItems = [
  "Sites",
  "Landing Pages",
  "Identidade Visual",
  "Posts",
  "Carrosséis",
  "Roteiros",
  "Reels",
  "Estratégia Digital",
];
