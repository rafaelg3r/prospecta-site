import { ArrowRight, CalendarCheck } from "@phosphor-icons/react/dist/ssr";
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
        "group relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-bold tracking-[-0.01em] transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out-expo active:scale-[0.98]",
        size === "sm" && "h-11 px-5 text-[0.92rem]",
        size === "md" && "h-14 px-7 text-base",
        size === "lg" && "h-16 px-8 text-[1.05rem] md:h-[4.25rem] md:px-10 md:text-lg",
        variant === "primary" &&
          "border border-white/25 bg-[linear-gradient(135deg,#a77bff_0%,#8452f0_45%,#6a35e0_100%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_0_0_1px_rgb(150_112_234/0.35),0_14px_38px_-8px_rgb(132_82_240/0.75)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_0_0_1px_rgb(180_156_245/0.55),0_20px_48px_-8px_rgb(132_82_240/0.95)]",
        variant === "ghost" && "border border-white/20 bg-white/[0.06] text-ink hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.1]",
        // For use on violet surfaces, where the gradient button would disappear.
        variant === "light" &&
          "bg-white text-brand-700 shadow-[0_14px_38px_-10px_rgb(0_0_0/0.55)] hover:-translate-y-0.5 hover:bg-brand-200",
        className,
      )}
    >
      <CalendarCheck weight="bold" className={size === "lg" ? "size-6" : "size-5"} aria-hidden />
      <span>{label}</span>
      {size !== "sm" && (
        <ArrowRight
          weight="bold"
          aria-hidden
          className="size-4.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
        />
      )}
      <span className="sr-only"> (abre o WhatsApp)</span>
    </a>
  );
}
