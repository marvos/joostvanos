import type { Route } from "./+types/huizen";
import { Link } from "react-router";
import { memo, useMemo } from "react";

/**
 * Enhanced metadata for the Makelaardij page
 * Provides comprehensive SEO optimization with structured data
 */
export function meta({}: Route.MetaArgs) {
  // Create list of services for metadata
  const services = [
    "Aankoopbegeleiding",
    "Verkoopbegeleiding",
    "Woning waarderingen",
    "Aanhuur",
    "Verhuur",
    "Kleinschalig VvE beheer",
    "Advies",
  ].join(", ");

  // Build comprehensive meta description using page content
  const metaDescription =
    `Met ruim 25 jaar ervaring en 850+ geslaagde transacties biedt Joost van Os deskundige makelaardij diensten. ` +
    `Persoonlijke benadering met uw wensen centraal. Onze diensten: ${services}. ` +
    `Heldere communicatie en uitgebreid netwerk voor effectieve vastgoedhulp.`;

  return [
    { title: "Makelaardij Diensten - Joost van Os Makelaardij & Mediation" },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content: `makelaardij, vastgoed, makelaar, ${services.toLowerCase()}, Amsterdam, woningmarkt`,
    },

    // Open Graph tags for better social media sharing
    { property: "og:title", content: "Makelaardij Diensten - Joost van Os" },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://joostvanos.nl/canals-night.webp",
    },
    { property: "og:url", content: "https://joostvanos.nl/makelaardij" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Makelaardij Diensten - Joost van Os" },
    { name: "twitter:description", content: metaDescription },
    {
      name: "twitter:image",
      content: "https://joostvanos.nl/canals-night.webp",
    },

    // Structured data for local business (as JSON-LD)
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Joost van Os Makelaardij & Mediation",
        description: metaDescription,
        image: "https://joostvanos.nl/logo.png",
        url: "https://joostvanos.nl/makelaardij",
        telephone: "+31622691573",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Amsterdam",
          addressRegion: "Noord-Holland",
          addressCountry: "NL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 52.3676,
          longitude: 4.9041,
        },
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        serviceType: services.split(", "),
        sameAs: [
          "https://www.linkedin.com/in/joost-van-os/",
          "https://www.funda.nl/makelaars/amsterdam/64369-joost-van-os-makelaardij/",
        ],
      }),
    },
  ];
}

/**
 * Service item component for consistent rendering
 * Displays a checkmark icon with service name
 */
const ServiceItem = memo(({ service }: { service: string }) => (
  <li className="flex gap-2 items-center" key={service}>
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
    <span className="text-lg">{service}</span>
  </li>
));
ServiceItem.displayName = "ServiceItem";

/**
 * Main Makelaardij page component
 * Displays information about real estate services
 */
export default function Makelaardij({ loaderData }: Route.ComponentProps) {
  // List of services offered - memoized to prevent unnecessary re-renders
  const diensten = useMemo(
    () => [
      "Aankoopbegeleiding",
      "Verkoopbegeleiding",
      "Woning waarderingen",
      "Aanhuur",
      "Verhuur",
      "Kleinschalig VvE beheer",
      "Advies",
    ],
    []
  );

  return (
    <>
      {/* Hero section with background image */}
      <div
        className="hero min-h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: "url(/canals-night.webp)",
        }}
      >
        {/* Semi-transparent dark overlay for better text readability */}
        <div className="hero-overlay bg-black/60"></div>

        {/* Hero content */}
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">Makelaardij</h1>
            <p className="mb-5">
              Met ruim 25 jaar ervaring in de makelaardij en 850+ geslaagde
              transacties zijn wij deskundig en hebben uitgebreide kennis van de
              lokale vastgoedmarkt.
            </p>
          </div>
        </div>
      </div>

      {/* Main content section */}
      <div className="container max-w-4xl flex flex-col gap-6 pb-20 px-4 sm:px-6">
        <div className="flex gap-7 flex-col pt-14">
          {/* Introduction section */}
          <section aria-labelledby="introduction-heading">
            <h2 id="introduction-heading" className="text-xl font-bold">
              Waarom kiezen voor Joost van Os Makelaardij & Mediation?
            </h2>
            <p className="mt-4">
              Wij geloven in een persoonlijke benadering. Uw wensen en behoeften
              staan bij ons centraal. Wij communiceren helder en eerlijk, zodat
              u altijd goed geïnformeerd bent. Mede dankzij ons uitgebreide
              netwerk kunnen wij u snel en effectief helpen bij al uw
              vastgoedvragen.
            </p>
            <p className="mt-4">
              Wij begrijpen dat het kopen of verkopen van een huis een van de
              belangrijkste beslissingen in uw leven is. Daarom staan wij klaar
              om u te begeleiden met ruim 25 jaar ervaring, gedegen
              deskundigheid, persoonlijke aandacht en een grote passie voor het
              vak.
            </p>
          </section>

          {/* Services section */}
          <section aria-labelledby="services-heading" className="mt-8">
            <h3 id="services-heading" className="font-bold text-lg">
              Onze Diensten:
            </h3>
            <ul className="flex flex-col gap-2 my-4">
              {diensten.map((dienst) => (
                <ServiceItem key={dienst} service={dienst} />
              ))}
            </ul>
          </section>

          {/* Call-to-action section */}
          <section className="mt-8">
            <h3 className="font-bold text-2xl text-center">
              We zien uit naar onze samenwerking!
            </h3>

            {/* Contact button */}
            {/* <div className="flex justify-center mt-6">
              <Link to="/contact" className="btn btn-primary">
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
              </Link>
            </div> */}
          </section>
        </div>
      </div>
    </>
  );
}
