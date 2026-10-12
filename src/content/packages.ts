// Source: Notion > Prospecta Work > Pacotes. Prices are monthly, in BRL.
export type Package = {
  slug: string;
  name: string;
  tagline: string;
  /** Monthly price; equal min and max means a single price. */
  priceMin: number;
  priceMax: number;
  deliverables: string[];
  featured?: boolean;
  /** Already ships with a website, so it is not offered as a combo. */
  includesSite?: boolean;
};

export const packages: Package[] = [
  {
    slug: "presenca",
    name: "Presença",
    tagline: "Para manter sua marca ativa e consistente todo mês.",
    priceMin: 1490,
    priceMax: 1490,
    deliverables: [
      "Planejamento mensal",
      "4 posts",
      "2 carrosséis",
      "4 roteiros",
      "4 Reels",
      "Direcionamento de conteúdo",
    ],
  },
  {
    slug: "crescimento",
    name: "Crescimento",
    tagline: "Para transformar conteúdo em crescimento, com estratégia por trás.",
    priceMin: 2490,
    priceMax: 2490,
    deliverables: [
      "Estratégia e planejamento",
      "8 posts",
      "4 carrosséis",
      "8 roteiros",
      "8 Reels",
      "Análise mensal",
      "Reunião estratégica",
    ],
  },
  {
    slug: "autoridade",
    name: "Autoridade",
    tagline: "Para virar referência no seu mercado.",
    priceMin: 3490,
    priceMax: 4490,
    deliverables: [
      "Estratégia",
      "8 a 12 posts",
      "4 a 6 carrosséis",
      "12 roteiros e Reels",
      "Métricas",
      "Análise de concorrentes",
      "Otimização",
      "Campanhas",
    ],
  },
  {
    slug: "launch",
    name: "Launch",
    tagline: "Para lançar ou reposicionar a marca do zero, com site incluso.",
    priceMin: 3900,
    priceMax: 5500,
    deliverables: [
      "Diagnóstico digital",
      "Estratégia",
      "Site ou landing page",
      "Identidade visual inicial",
      "Conteúdo",
      "Roteiros",
      "Reels",
      "Calendário editorial",
    ],
    featured: true,
    includesSite: true,
  },
];

export const packageGuarantees = [
  "Objetivo definido com você",
  "Métricas acordadas",
  "Revisões periódicas",
];
