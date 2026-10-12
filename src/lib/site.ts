// Single source of truth for contact data. Change the number here and every
// CTA on the site follows.
export const WHATSAPP_NUMBER = "5555999668247"; // +55 (55) 99966-8247
export const WHATSAPP_DISPLAY = "(55) 99966-8247";

export const INSTAGRAM_URL = "https://www.instagram.com/prospecta_studio";
export const INSTAGRAM_HANDLE = "@prospecta_studio";

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, Prospecta! Vim pelo site e gostaria de agendar um orçamento para a minha empresa.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#pacotes", label: "Pacotes" },
  { href: "#combos", label: "Combos" },
  { href: "#metodo", label: "Método" },
  { href: "#quem-faz", label: "Quem faz" },
] as const;
