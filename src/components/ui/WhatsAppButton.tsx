import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

type WhatsAppButtonProps = {
  label?: string;
  message?: string;
  variant?: "primary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

// Every CTA on the site books a quote over WhatsApp. One label, one look.
// Flat fill, no glow: on hover the label rolls and the arrow swaps (see .roll / .arrow-swap).
export function WhatsAppButton({
  label = "Agendar orçamento",
  message,
  variant = "primary",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-semibold tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.97]",
        size === "sm" && "h-10 gap-2 pl-5 pr-4 text-[0.9rem]",
        size === "md" && "h-12 gap-2.5 pl-6 pr-5 text-[0.95rem]",
        size === "lg" && "h-14 gap-3 pl-7 pr-6 text-base",
        variant === "primary" && "bg-brand-500 text-white hover:bg-[#8452e6]",
        variant === "ghost" && "border border-white/15 text-ink hover:border-white/35 hover:bg-white/[0.04]",
        // For use on accent surfaces, where the violet button would disappear.
        variant === "light" && "bg-ink text-brand-800 hover:bg-white",
        className,
      )}
    >
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      <span className={cn("arrow-swap", size === "sm" ? "size-3.5" : "size-4")} aria-hidden>
        <ArrowUpRight weight="bold" className="size-full" />
        <ArrowUpRight weight="bold" className="size-full" />
      </span>
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  );
}
