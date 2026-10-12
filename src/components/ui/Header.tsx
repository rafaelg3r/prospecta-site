"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/cn";
import { NAV_LINKS, whatsappLink } from "@/lib/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-void/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#top" className="text-[1.05rem] sm:text-[1.15rem]">
          <Wordmark />
          <span className="sr-only">, início</span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-4 py-2 text-[0.92rem] font-medium text-mute transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton size="sm" />
        </div>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="inline-flex size-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] active:scale-[0.96] md:hidden"
        >
          <WhatsappLogo weight="fill" className="size-5" aria-hidden />
        </a>
      </div>
    </header>
  );
}
