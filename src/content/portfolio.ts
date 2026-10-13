// Real work by Rafael C. Vedana (Prospecta Studio). Screenshots in public/work/.

export type WebProject = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  url: string;
  image: string;
};

export const webProjects: WebProject[] = [
  {
    slug: "domhygino",
    name: "Dom Hygino",
    kind: "Site institucional",
    summary: "Rede de franquias de carnes premium. UX de alto padrão para apresentar cortes, lojas e franquia.",
    url: "https://domhygino.com.br/",
    image: "/work/site-domhygino.webp",
  },
  {
    slug: "boxstore",
    name: "BOX! Store",
    kind: "Site de loja",
    summary: "Moda masculina premium no noroeste gaúcho. Visual editorial para apresentar coleções, lojas e o Clube VIP.",
    url: "https://box-store-orcin.vercel.app/",
    image: "/work/site-boxstore.webp",
  },
  {
    slug: "cristina",
    name: "Cristina da Costa",
    kind: "Site profissional",
    summary: "Terapeuta hipnóloga. Visual acolhedor e foco em levar o visitante a agendar o atendimento.",
    url: "https://cristinadacostaterapeuta.com.br/",
    image: "/work/site-cristina.webp",
  },
];

export type DesignPiece = { slug: string; title: string; image: string };

export const designPieces: DesignPiece[] = [
  { slug: "monte", title: "Monte", image: "/work/post-monte.webp" },
  { slug: "riscos", title: "Riscos", image: "/work/post-riscos.webp" },
  { slug: "autentico", title: "Autêntico", image: "/work/post-autentico.webp" },
  { slug: "dominio-visual", title: "Domínio Visual", image: "/work/post-dominio-visual.webp" },
  { slug: "disciplina", title: "Disciplina", image: "/work/post-disciplina.webp" },
  { slug: "explorar", title: "Explorar", image: "/work/post-explorar.webp" },
  { slug: "experiencia", title: "Experiência", image: "/work/post-experiencia.webp" },
];

export const DESIGN_INSTAGRAM_URL = "https://www.instagram.com/rafaeldacostadesign/";
