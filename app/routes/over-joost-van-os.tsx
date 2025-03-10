import { Link } from "react-router";
import type { Route } from "./+types/huizen";

/**
 * Enhanced SEO metadata for the About Joost van Os page
 * Optimizes page visibility and social sharing
 */
export function meta({}: Route.MetaArgs) {
  // Build comprehensive meta description using page content
  const metaDescription =
    "Ontmoet Joost van Os - Ervaren makelaar met ruim 25 jaar ervaring en 2000+ geslaagde vastgoedtransacties. " +
    "Sinds 2024 ook Vastgoed Mediator. Persoonlijke aanpak, eerlijke communicatie en grondige kennis van de Amsterdamse woningmarkt.";
  const scriptLdRealEstateAgent = {
    "script:ld+json": {
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Joost van Os",
        jobTitle: "Makelaar & Vastgoed Mediator",
        description: metaDescription,
        image: "https://joostvanos.nl/joost-portrait.jpg",
        url: "https://joostvanos.nl/over-joost-van-os",
        telephone: "+31622691573",
        email: "makelaardij@joostvanos.nl",
        worksFor: {
          "@type": "RealEstateAgent",
          name: "Joost van Os Makelaardij & Mediation",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Amsterdam",
            addressRegion: "Noord-Holland",
            addressCountry: "NL",
          },
        },
        knowsAbout: [
          "Vastgoed",
          "Makelaardij",
          "Vastgoed Mediation",
          "Amsterdamse woningmarkt",
          "Conflictoplossing",
        ],
      }),
    },
  };
  return [
    { title: "Over Joost van Os | Makelaar & Vastgoed Mediator" },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content:
        "Joost van Os, makelaar Amsterdam, vastgoed mediator, persoonlijke aanpak, ervaren makelaar, vastgoed expertise",
    },

    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content: "Over Joost van Os | Makelaar & Vastgoed Mediator",
    },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "profile" },
    {
      property: "og:image",
      content: "https://joostvanos.nl/joost-portrait.jpg",
    },
    { property: "og:url", content: "https://joostvanos.nl/over-joost-van-os" },
    { property: "profile:first_name", content: "Joost" },
    { property: "profile:last_name", content: "van Os" },
    { property: "profile:username", content: "joost-van-os" },
    { property: "profile:gender", content: "male" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Over Joost van Os | Makelaar & Vastgoed Mediator",
    },
    { name: "twitter:description", content: metaDescription },
    {
      name: "twitter:image",
      content: "https://joostvanos.nl/joost-portrait.jpg",
    },

    // Structured data for person (as JSON-LD)
    { ...scriptLdRealEstateAgent },
  ];
}

/**
 * About Joost van Os page component
 * Displays professional profile and background information
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Profile image section */}
        <div>
          <img
            src="/joost-portrait.jpg"
            alt="Joost van Os - Makelaar & Vastgoed Mediator"
            className="rounded-lg shadow-lg w-full object-cover aspect-ratio-1"
            width="600"
            height="600"
          />
        </div>

        {/* Biography section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold mb-8">Profiel Joost van Os</h1>

          {/* Professional experience */}
          <p>
            Met ruim 25 jaar ervaring in de makelaardij en 2000+ geslaagde
            transacties ben ik deskundig en heb ik uitgebreide kennis van de
            lokale vastgoedmarkt. Ik geloof in een persoonlijke benadering. De
            wensen en behoeften van mijn klanten staan bij mij centraal. Ik
            communiceer helder en eerlijk, zodat men altijd goed geïnformeerd
            is. Mede dankzij mijn uitgebreide netwerk kan ik mijn klanten snel
            en effectief helpen bij al hun vastgoedvragen.
          </p>

          {/* Mediation expertise */}
          <p>
            Sinds 2024 ben ik ook Vastgoed Mediator, mediation is een effectieve
            manier om alle mogelijke vastgoed conflicten op te lossen. Het
            mediationtraject biedt structuur waarmee partijen zelf, onder
            begeleiding van mij als neutrale mediator, tot een oplossing komen.
            Dit proces voorkomt niet alleen juridische stappen, maar verbetert
            ook de communicatie en de relatie tussen betrokkenen.
          </p>

          {/* CV download button */}
          <div className="pt-6">
            <a
              href="/cv-joost-van-os.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
