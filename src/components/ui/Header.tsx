"use client";

import { ArrowRight, CaretDown, List, WhatsappLogo, X } from "@phosphor-icons/react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { serviceCategories, serviceHref } from "@/content/services";
import { cn } from "@/lib/cn";
import { NAV_LINKS, whatsappLink } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

// Closes on Escape and on a press outside `ref` while `open`.
function useDismiss(open: boolean, close: () => void, ref?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPress = (e: PointerEvent) => {
      if (ref?.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [open, close, ref]);
}

// Desktop "Serviços": opens on hover (mouse) or click, lists the four area pages.
function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  useDismiss(open, close, ref);

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-servicos"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors hover:text-ink",
          open ? "text-ink" : "text-mute",
        )}
      >
        Serviços
        <CaretDown weight="bold" className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            key="menu-servicos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
          >
            <m.div
              id="menu-servicos"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-surface-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]"
            >
              <ul className="grid grid-cols-2 gap-1.5 p-3">
                {serviceCategories.map((c) => {
                  const Icon = SERVICE_ICONS[c.slug];
                  return (
                    <li key={c.slug} data-area={c.slug}>
                      <Link
                        href={serviceHref(c.slug)}
                        onClick={close}
                        className="group flex gap-4 rounded-2xl p-4 transition-colors duration-300 hover:bg-white/[0.04]"
                      >
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-accent transition-colors duration-300 group-hover:border-accent/50">
                          <Icon weight="light" className="size-5" aria-hidden />
                        </span>
                        <span>
                          <span className="flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                            {c.name}
                            <ArrowRight
                              weight="bold"
                              className="size-3.5 text-accent-light opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden
                            />
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-mute">{c.description}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-7 py-4 text-sm">
                <span className="text-mute">Avulsos, em pacote mensal ou em combo com site.</span>
                <Link href="/#servicos" onClick={close} className="font-semibold text-brand-200 transition-colors hover:text-white">
                  Ver todos os serviços
                </Link>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Phones and tablets: full-screen sheet with the areas first, then the page sections.
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useDismiss(open, onClose);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="menu-mobile"
          key="menu-mobile"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-[#08031a] pt-[72px] lg:hidden"
        >
          <m.nav
            aria-label="Menu"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            className="mx-auto max-w-xl px-4 pb-12 pt-6 sm:px-6"
          >
            <p className="font-display text-[0.8rem] font-light uppercase italic tracking-[0.36em] text-mute">Áreas</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {serviceCategories.map((c) => {
                const Icon = SERVICE_ICONS[c.slug];
                return (
                  <li key={c.slug} data-area={c.slug}>
                    <Link href={serviceHref(c.slug)} onClick={onClose} className="card-area flex flex-col gap-6 rounded-2xl p-4 active:border-accent/50">
                      <Icon weight="light" className="size-7 text-accent" aria-hidden />
                      <span className="font-display text-xl font-semibold text-ink">{c.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-ink"
                  >
                    {link.label}
                    <ArrowRight weight="bold" className="size-5 text-brand-300" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            <WhatsAppButton className="mt-8 w-full" />
          </m.nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    if (next !== scrolled) setScrolled(next);
  });

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          solid ? "border-b border-white/[0.07] bg-void/75 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-[1.05rem] sm:text-[1.15rem]">
            <Wordmark />
            <span className="sr-only">, início</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) =>
              link.href === "/#servicos" ? (
                <ServicesMenu key={link.href} />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-[0.92rem] font-medium text-mute transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <WhatsAppButton size="sm" />
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar orçamento pelo WhatsApp"
              className="inline-flex size-10 items-center justify-center rounded-full bg-brand-500 text-white active:scale-[0.96] md:hidden"
            >
              <WhatsappLogo weight="fill" className="size-5" aria-hidden />
            </a>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-ink active:scale-[0.96] lg:hidden"
            >
              {menuOpen ? <X weight="bold" className="size-5" aria-hidden /> : <List weight="bold" className="size-5" aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
