// Source: Notion > Prospecta Work > Serviços (all sold à la carte).
export type ServiceCategory = {
  slug: "web" | "design" | "video" | "estrategia";
  name: string;
  description: string;
  services: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web",
    name: "Web",
    description: "Sites e páginas pensados para transformar visita em contato.",
    services: [
      "Landing Page",
      "Site com 2 páginas e funcionalidades",
      "Site completo",
      "Projeto web sob medida",
    ],
  },
  {
    slug: "estrategia",
    name: "Estratégia",
    description: "Clareza sobre onde sua marca está e para onde ela precisa ir.",
    services: ["Diagnóstico Digital", "Estratégia Digital"],
  },
  {
    slug: "design",
    name: "Design",
    description: "Visual consistente, que faz sua marca ser lembrada.",
    services: ["Post profissional", "Carrossel", "Identidade visual"],
  },
  {
    slug: "video",
    name: "Vídeo",
    description: "Roteiro e edição para Reels que prendem a atenção.",
    services: ["Roteiro", "Edição de Reel"],
  },
];

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
