"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { whatsappLink } from "@/lib/site";

// Appears once the hero (and its own CTA) has scrolled away.
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > window.innerHeight * 0.85;
    if (next !== visible) setVisible(next);
  });

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          key="floating-wa"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar orçamento pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-5 right-4 z-40 inline-flex size-14 items-center justify-center rounded-full bg-brand-500 text-white ring-1 ring-white/15 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)] transition-colors duration-300 hover:bg-[#8452e6] sm:bottom-7 sm:right-7"
        >
          <WhatsappLogo weight="fill" className="size-7" aria-hidden />
        </m.a>
      )}
    </AnimatePresence>
  );
}
