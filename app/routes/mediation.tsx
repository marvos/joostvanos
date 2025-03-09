import type { Route } from "./+types/huizen";
import { Link } from "react-router";
import { memo } from "react";

/**
 * Enhanced SEO metadata for the Mediation page
 * Contains comprehensive information about mediation services
 */
export function meta({}: Route.MetaArgs) {
  // Create list of services for metadata
  const services = [
    "Aan- en verkoop geschillen",
    "Woning waarderingen geschillen",
    "Huurgeschillen",
    "VvE conflicten",
    "Vastgoed advies",
  ].join(", ");

  // Build comprehensive meta description using page content
  const metaDescription =
    `Joost van Os biedt professionele mediation diensten voor vastgoedconflicten. ` +
    `Wij creëren een veilige omgeving voor constructieve en effectieve geschiloplossing. ` +
    `Onze diensten: ${services}. Persoonlijke aandacht en maatwerk voor duurzame oplossingen.`;

  return [
    { title: "Mediation Diensten - Joost van Os Makelaardij & Mediation" },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content: `mediation, vastgoed mediation, conflictoplossing, geschillen, VvE conflicten, huurgeschillen, bemiddeling, Amsterdam`,
    },

    // Open Graph tags for better social media sharing
    { property: "og:title", content: "Mediation Diensten - Joost van Os" },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://joostvanos.nl/mediator-canalview.jpg",
    },
    { property: "og:url", content: "https://joostvanos.nl/mediation" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Mediation Diensten - Joost van Os" },
    { name: "twitter:description", content: metaDescription },
    {
      name: "twitter:image",
      content: "https://joostvanos.nl/mediator-canalview.jpg",
    },

    // Structured data for service offering (as JSON-LD)
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Vastgoed Mediation Diensten",
        provider: {
          "@type": "ProfessionalService",
          name: "Joost van Os Makelaardij & Mediation",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Amsterdam",
            addressRegion: "Noord-Holland",
            addressCountry: "NL",
          },
        },
        description: metaDescription,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
        },
        serviceType: services.split(", "),
        areaServed: {
          "@type": "City",
          name: "Amsterdam",
        },
      }),
    },
  ];
}

/**
 * Service item component with checkmark icon
 * Creates consistent styling for all service items
 * @param props.title - Bold title of the service
 * @param props.children - Description of the service
 */
const ServiceItem = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <li className="flex gap-2 items-start">
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5 text-primary"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="text-lg">
        <span className="font-bold">{title}</span> {children}
      </div>
    </li>
  )
);
ServiceItem.displayName = "ServiceItem";

/**
 * Main Mediation page component
 * Displays information about mediation services offered
 */
export default function Mediation({ loaderData }: Route.ComponentProps) {
  return (
    <>
      {/* Hero section with background image */}
      <div
        className="hero min-h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: "url(/mediator-canalview.jpg)",
        }}
      >
        {/* Semi-transparent dark overlay for better text readability */}
        <div className="hero-overlay bg-black/60"></div>

        {/* Hero content */}
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">
              Mediation Diensten
            </h1>
            <p className="mb-5">
              Wij begrijpen dat er in zowel persoonlijke als zakelijke relaties
              conflicten kunnen ontstaan. Het is onze missie om u te helpen deze
              conflicten op een <span className="font-bold">constructieve</span>{" "}
              en <span className="font-bold">effectieve</span> manier op te
              lossen.
            </p>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="container max-w-4xl flex flex-col gap-6 pb-20 pt-14 px-4 sm:px-6">
        <div className="flex gap-7 flex-wrap">
          {/* Introduction section */}
          <section aria-labelledby="introduction">
            <p>
              Met onze professionele begeleiding creëren we een onpartijdige en{" "}
              <span className="font-bold">veilige omgeving</span> waarin alle
              betrokken partijen hun zorgen en wensen kunnen uiten om zo meer{" "}
              <span className="font-bold">begrip</span> voor elkaars standpunten
              te krijgen en daarmee tot een{" "}
              <span className="font-bold">duurzame oplossing</span> te kunnen
              komen.
            </p>
          </section>

          {/* Services section */}
          <section aria-labelledby="services-heading" className="w-full">
            <h2 id="services-heading" className="text-xl font-bold">
              Onze diensten op het gebied van vastgoed mediation:
            </h2>
            <ul className="flex flex-col gap-2 my-4">
              <ServiceItem title="Aan- en verkoop:">
                begeleiding bij het oplossen van conflicten ontstaan tussen
                partijen bij aan- verkoop van alle soorten vastgoed.
              </ServiceItem>
              <ServiceItem title="Woning waarderingen:">
                begeleiding bij onenigheid over waarderingen van vastgoed.
              </ServiceItem>
              <ServiceItem title="Aan- en verhuur:">
                begeleiden bij huurgeschillen tussen huurder en verhuurder.
              </ServiceItem>
              <ServiceItem title="VvE beheer:">
                begeleiden bij alle mogelijke conflicten binnen verenigingen van
                eigenaars.
              </ServiceItem>
              <ServiceItem title="Advies:">
                adviseren bij alle mogelijke conflicten op het gebied van
                vastgoed.
              </ServiceItem>
            </ul>
          </section>

          {/* Why choose us section */}
          <section aria-labelledby="why-us-heading" className="w-full">
            <h2 id="why-us-heading" className="text-xl font-bold">
              Waarom kiezen voor Joost van Os Makelaardij & Mediation?
            </h2>
            <p className="mt-4">
              Met persoonlijke aandacht en neutrale begeleiding bieden wij
              volledige ondersteuning bij het oplossen van alle mogelijke
              vastgoedconflicten. Wij geloven in maatwerk. Iedere situatie is
              uniek en wij passen onze aanpak aan op uw specifieke behoeften.
              Ons doel is om niet alleen het huidige conflict op te lossen, maar
              ook om duurzame oplossingen te creëren die toekomstige problemen
              helpen voorkomen.
            </p>
          </section>

          {/* Call to action section */}
          <section className="w-full text-center mt-6">
            <h3 className="font-bold text-2xl mb-6">
              We zien uit naar onze samenwerking!
            </h3>

            {/* Contact button */}
            {/* <Link to="/contact" className="btn btn-primary">
              Neem contact op
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link> */}
          </section>
        </div>
      </div>
    </>
  );
}
