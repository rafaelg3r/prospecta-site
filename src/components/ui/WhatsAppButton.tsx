import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";
import { whatsappLink } from "@/lib/site";

type WhatsAppButtonProps = {
  label?: string;
  message?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function WhatsAppButton({
  label = "Falar no WhatsApp",
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
        "group relative inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-[transform,box-shadow,background-color] duration-300 ease-out-expo active:scale-[0.98]",
        size === "sm" && "h-11 px-5 text-[0.9rem]",
        size === "md" && "h-12 px-6 text-[0.95rem]",
        size === "lg" && "h-14 px-8 text-base md:h-16 md:px-10 md:text-lg",
        variant === "primary"
          ? "bg-[linear-gradient(135deg,#8452e6_0%,#6430c9_55%,#4a1aa6_100%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_10px_30px_-10px_rgb(119_68_219/0.7)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_16px_40px_-12px_rgb(119_68_219/0.85)]"
          : "border border-white/15 bg-white/[0.03] text-ink hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.07]",
        className,
      )}
    >
      <WhatsappLogo weight="fill" className={size === "lg" ? "size-6" : "size-5"} aria-hidden />
      <span>{label}</span>
    </a>
  );
}
