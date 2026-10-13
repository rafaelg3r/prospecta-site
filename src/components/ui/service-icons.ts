import { Browsers, FilmSlate, PenNib, Strategy } from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import type { ServiceSlug } from "@/content/services";

type IconType = ComponentType<{ className?: string; weight?: "light" | "regular" | "bold" | "fill" | "duotone" | "thin" }>;

// One icon per service area, shared by the home sections, the menu and the area pages.
export const SERVICE_ICONS: Record<ServiceSlug, IconType> = {
  web: Browsers,
  estrategia: Strategy,
  design: PenNib,
  video: FilmSlate,
};
