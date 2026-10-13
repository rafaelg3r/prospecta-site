import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { serviceCategories, serviceHref } from "@/content/services";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Wordmark className="text-2xl" />
          <p className="mt-6 max-w-[34ch] leading-relaxed text-mute">
            Transformamos presença online em aquisição e conversão de clientes.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="font-display text-lg font-semibold text-ink">Navegação</p>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-mute transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Áreas de serviço">
          <p className="font-display text-lg font-semibold text-ink">Serviços</p>
          <ul className="mt-5 flex flex-col gap-3">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <Link href={serviceHref(c.slug)} className="text-mute transition-colors hover:text-ink">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg font-semibold text-ink">Contato</p>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-mute transition-colors hover:text-ink"
              >
                <WhatsappLogo weight="light" className="size-5 text-brand-300" aria-hidden />
                {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-mute transition-colors hover:text-ink"
              >
                <InstagramLogo weight="light" className="size-5 text-brand-300" aria-hidden />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.05]">
        <p className="mx-auto max-w-[1400px] px-4 py-6 text-sm text-mute sm:px-6 lg:px-10">
          © 2026 Prospecta Studio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
