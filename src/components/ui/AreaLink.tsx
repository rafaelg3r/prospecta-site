import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SERVICE_ICONS } from "@/components/ui/service-icons";
import { serviceHref, type ServiceSlug } from "@/content/services";
import { cn } from "@/lib/cn";

type AreaLinkProps = {
  slug: ServiceSlug;
  label: string;
  size?: "sm" | "md";
  className?: string;
};

// Navigation pill to an area page, tinted with that area's accent. Not a CTA:
// quotes still go through WhatsAppButton.
export function AreaLink({ slug, label, size = "md", className }: AreaLinkProps) {
  const Icon = SERVICE_ICONS[slug];
  return (
    <Link
      href={serviceHref(slug)}
      data-area={slug}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-accent/45 bg-accent/12 font-semibold text-ink transition-[transform,background-color,border-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-accent hover:bg-accent/22",
        size === "md" ? "h-12 pl-1.5 pr-5 text-base" : "h-9 pl-1 pr-3.5 text-sm",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full bg-accent text-[#0a0526]",
          size === "md" ? "size-9" : "size-7",
        )}
      >
        <Icon weight="bold" className={size === "md" ? "size-4.5" : "size-3.5"} aria-hidden />
      </span>
      {label}
      <ArrowRight
        weight="bold"
        aria-hidden
        className="size-4 text-accent-light transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
      />
    </Link>
  );
}
