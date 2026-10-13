import type { ServiceSlug } from "@/content/services";

// Source: Notion > EMPRESA > Sócios.
export const TEAM: {
  slug: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  areas: ServiceSlug[];
}[] = [
  {
    slug: "rafael",
    initials: "RV",
    name: "Rafael C. Vedana",
    role: "Design & Web",
    bio: "Cuida de tudo o que a sua marca mostra: sites, landing pages, interfaces, animações, social design e identidade visual.",
    skills: ["Next.js e React", "Interfaces", "Identidade visual"],
    areas: ["web", "design"],
  },
  {
    slug: "alison",
    initials: "AM",
    name: "Alison Morais",
    role: "Estratégia & Vídeo",
    bio: "Cuida de tudo o que a sua marca diz: vendas, mercado, concorrência e conversão, além dos roteiros e da edição dos vídeos.",
    skills: ["Conversão", "Roteiros", "Edição de vídeo"],
    areas: ["estrategia", "video"],
  },
];

export const teamMember = (slug: string) => TEAM.find((m) => m.slug === slug)!;
