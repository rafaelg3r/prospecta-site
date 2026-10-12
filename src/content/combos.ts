// Combo = a monthly package hired together with a website.
// Site prices: Notion > Prospecta Work > Pacotes (Periodicidade "Projeto único"), in BRL.
// The discount was set by the owner on 2026-10-12. Change it here and every
// combo price on the site follows.
export const COMBO_SITE_DISCOUNT = 0.1;
export const COMBO_DISCOUNT_LABEL = `${Math.round(COMBO_SITE_DISCOUNT * 100)}% off no site`;

export type Site = {
  slug: string;
  name: string;
  priceMin: number;
  priceMax: number;
};

export const sites: Site[] = [
  { slug: "landing-page", name: "Landing Page", priceMin: 900, priceMax: 1500 },
  { slug: "site-2-paginas", name: "Site com 2 páginas", priceMin: 1600, priceMax: 2400 },
  { slug: "site-completo", name: "Site completo", priceMin: 2500, priceMax: 4500 },
];

export const comboSitePrice = (price: number) => Math.round(price * (1 - COMBO_SITE_DISCOUNT));
