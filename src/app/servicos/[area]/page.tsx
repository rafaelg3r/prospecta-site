import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/service/ServicePage";
import { serviceCategories, serviceHref } from "@/content/services";

// Static export: only the four areas exist, every other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ area: c.slug }));
}

const findArea = (slug: string) => serviceCategories.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/servicos/[area]">): Promise<Metadata> {
  const area = findArea((await params).area);
  if (!area) return {};
  const title = `${area.seoTitle} | Prospecta Studio`;
  return {
    title,
    description: area.intro,
    alternates: { canonical: serviceHref(area.slug) },
    openGraph: {
      title,
      description: area.intro,
      type: "website",
      locale: "pt_BR",
      url: serviceHref(area.slug),
      images: [{ url: "/og.jpg", width: 2000, height: 1000, alt: "Prospecta Studio" }],
    },
  };
}

export default async function Page({ params }: PageProps<"/servicos/[area]">) {
  const area = findArea((await params).area);
  if (!area) notFound();
  return <ServicePage area={area} />;
}
