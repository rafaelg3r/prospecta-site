import { AreaLinks } from "@/components/sections/AreaLinks";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { Offerings } from "@/components/sections/Offerings";
import { Packages } from "@/components/sections/Packages";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Prospecta Studio",
  description: "Agência de design e presença digital: sites, conteúdo e estratégia para aquisição e conversão de clientes.",
  telephone: `+${WHATSAPP_NUMBER}`,
  sameAs: [INSTAGRAM_URL],
  areaServed: "BR",
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <AreaLinks />
        <Marquee />
        <Manifesto />
        <Offerings />
        <Services />
        <Packages />
        <Process />
        <Team />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
