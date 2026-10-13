import type { Metadata, Viewport } from "next";
import { Manrope, Urbanist } from "next/font/google";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Header } from "@/components/ui/Header";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Agência de design e presença digital. Transformamos presença online em aquisição e conversão de clientes, com sites, conteúdo e estratégia.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the real domain before deploying so share previews resolve.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Prospecta Studio | Design, sites e conteúdo que trazem clientes",
  description,
  openGraph: {
    title: "Prospecta Studio",
    description,
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.jpg", width: 2000, height: 1000, alt: "Prospecta Studio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#06020f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior: Next jumps (instead of smooth-scrolling) to the top or the hash on route
    // changes, so the new page is already in place when the PageTransition curtain lifts.
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${urbanist.variable} ${manrope.variable} antialiased`}>
      <body>
        <MotionProvider>
          <Header />
          {children}
          <FloatingWhatsApp />
          <PageTransition />
        </MotionProvider>
      </body>
    </html>
  );
}
