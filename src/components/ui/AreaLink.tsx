import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { serviceHref, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

type AreaLinkProps = {
  slug: ServiceSlug;
  label: string;
  size?: "sm" | "md";
  /** "onAccent" for use on a card-accent surface, where the accent icon would vanish. */
  tone?: "default" | "onAccent";
  className?: string;
};

// Outlined navigation pill to an area page; the icon carries the area accent.
// Not a CTA: quotes still go through WhatsAppButton.
export function AreaLink({ slug, label, size = "md", tone = "default", className }: AreaLinkProps) {
  const Icon = SERVICE_ICONS[slug];
  const onAccent = tone === "onAccent";
  return (
    <Link
      href={serviceHref(slug)}
      data-area={slug}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 rounded-full border font-semibold transition-[border-color,background-color] duration-300 ease-out-expo",
        size === "md" ? "h-10 px-4 text-[0.9rem]" : "h-9 px-3.5 text-sm",
        onAccent
          ? "border-white/30 text-white hover:border-white/70 hover:bg-white/10"
          : "border-white/12 text-ink hover:border-accent/55 hover:bg-accent/[0.08]",
        className,
      )}
    >
      <Icon weight="bold" className={cn("size-4", onAccent ? "text-white" : "text-accent")} aria-hidden />
      <span className="roll">
        <span>{label}</span>
        <span aria-hidden>{label}</span>
      </span>
      <ArrowRight
        weight="bold"
        aria-hidden
        className={cn(
          "size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5",
          onAccent ? "text-white/80" : "text-accent-light",
        )}
      />
    </Link>
  );
}
