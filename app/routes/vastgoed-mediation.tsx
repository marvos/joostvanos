import type { Route } from "./+types/huizen";
import { Link } from "react-router";
import { memo } from "react";

/**
 * Enhanced SEO metadata for the Vastgoed Mediation page
 * Extracts key information from page content for better search visibility
 */
export function meta({}: Route.MetaArgs) {
  // Key benefits of mediation for metadata
  const benefits = [
    "Snel en kostenefficiënt",
    "Behouden van relaties",
    "Flexibiliteit",
  ].join(", ");

  // Service areas for metadata
  const serviceAreas = [
    "aan/verkoop geschillen",
    "huurgeschillen",
    "VvE kwesties",
    "waardebepaling conflicts",
  ].join(", ");

  // Build comprehensive meta description using page content
  const metaDescription =
    `Joost van Os biedt professionele vastgoed mediation bij vastgoed conflicten. ` +
    `Een vastgoed mediator is neutraal, in tegenstelling tot een makelaar die partijdig is. ` +
    `Voordelen: ${benefits}. Geschikt voor: ${serviceAreas}. ` +
    `Duurzame oplossingen zonder juridische procedures.`;

  return [
    { title: "Vastgoed Mediation - Joost van Os Makelaardij & Mediation" },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content: `vastgoed mediation, mediator, vastgoed conflict, vastgoed geschil, vastgoedmediator, alternatieve geschiloplossing, VvE conflicten, huurgeschillen, aan/verkoop geschillen, Amsterdam`,
    },

    // Open Graph tags for better social media sharing
    { property: "og:title", content: "Vastgoed Mediation - Joost van Os" },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://joostvanos.nl/bgvastgoed-mediation.jpg",
    },
    { property: "og:url", content: "https://joostvanos.nl/vastgoed-mediation" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Vastgoed Mediation - Joost van Os" },
    { name: "twitter:description", content: metaDescription },
    {
      name: "twitter:image",
      content: "https://joostvanos.nl/bgvastgoed-mediation.jpg",
    },

    // Structured data for service offering (as JSON-LD)
    {
      tagName: "script",
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Vastgoed Mediation",
        serviceType: "Vastgoed Mediation",
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
        areaServed: {
          "@type": "City",
          name: "Amsterdam",
        },
        serviceOutput: "Vaststellingsovereenkomst (VSO)",
      }),
    },
  ];
}

/**
 * Benefit item component for displaying mediation benefits
 * @param props.title - Bold title of the benefit
 * @param props.children - Description of the benefit
 */
const BenefitItem = memo(
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
BenefitItem.displayName = "BenefitItem";

/**
 * Main Vastgoed Mediation component
 * Provides detailed information about real estate mediation services
 */
export default function VastgoedMediation({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      {/* Hero section with background image */}
      <div
        className="hero min-h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: "url(/bgvastgoed-mediation.jpg)",
        }}
      >
        {/* Semi-transparent dark overlay for better text readability */}
        <div className="hero-overlay bg-black/60"></div>

        {/* Hero content */}
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">
              Vastgoed Mediation
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
          {/* Introduction section: when to use a mediator */}
          <section aria-labelledby="when-mediator-heading">
            <h2 id="when-mediator-heading" className="text-xl font-bold w-full">
              Wanneer een Vastgoed Mediator in plaats van een Vastgoed Makelaar
            </h2>
            <p className="mt-4">
              Vanzelfsprekend maakt men bij aan/verkoop van vastgoed gebruik van
              de diensten van een makelaar. Veelal wordt er ook een makelaar
              ingeschakeld bij andere vastgoed vraagstukken echter neemt de
              makelaar per definitie een partijdig standpunt in (hij/zij
              behartigt immers altijd de belangen van of de aankopende of de
              verkopende partij). Dit gegeven kan ertoe leiden dat vastgoed
              vraagstukken verzanden in vastgoed conflicten. Partijen zien dan
              alleen nog hun eigen belang en zijn daardoor niet meer gefocust op
              het oplossen van het conflict waardoor het conflict kan escaleren
              met alle (juridische) gevolgen van dien.
            </p>
            <p className="mt-4">
              Mediation is een effectieve manier om deze conflicten op te
              lossen. Het mediationtraject biedt structuur waarmee partijen
              zelf, onder begeleiding van een neutrale mediator, tot een
              oplossing komen. Dit proces voorkomt niet alleen juridische
              stappen, maar verbetert ook de communicatie tussen betrokkenen.
            </p>
          </section>

          {/* Mediation process section */}
          <section
            aria-labelledby="mediation-process-heading"
            className="mt-6 w-full"
          >
            <h2
              id="mediation-process-heading"
              className="text-xl font-bold sr-only"
            >
              Het mediationproces
            </h2>
            <p>
              Gedurende het traject doorlopen de partijen verschillende fasen,
              van een eerste intake tot het vastleggen van een bindende
              overeenkomst. De mediator speelt in elke fase een cruciale rol
              door het faciliteren van gesprekken en het bieden van een veilige
              omgeving waarin partijen hun standpunten kunnen delen.
            </p>
            <p className="mt-4">
              Mediation is doorgaans sneller en minder kostbaar dan een
              juridische procedure, wat het een aantrekkelijke optie maakt. Een
              goede voorbereiding verhoogt de kans op succes. Hoe duidelijker
              partijen hun doelen formuleren en het proces begrijpen, hoe
              effectiever de mediation zal verlopen.
            </p>
            <p className="mt-4">
              Mediation is een vorm van alternatieve geschiloplossing waarbij
              samenwerking en communicatie centraal staan. In plaats van een
              conflict te laten juridiseren of voor de rechter uit te vechten,
              zoeken de partijen onder begeleiding van een mediator naar een
              gezamenlijke oplossing. Dit proces is nuttig bij geschillen bij
              aan/verkoop, huurgeschillen, VvE kwesties, onenigheid of de waarde
              van vastgoed etc.
            </p>
          </section>

          {/* Benefits section */}
          <section aria-labelledby="benefits-heading" className="mt-6 w-full">
            <h3 id="benefits-heading" className="text-lg font-bold">
              Mediation biedt diverse voordelen ten opzichte van traditionele
              juridische procedures:
            </h3>
            <ul className="flex flex-col gap-2 my-4">
              <BenefitItem title="Snel en kostenefficiënt:">
                Mediation kan vaak binnen enkele sessies worden afgerond, wat
                kosten en tijd bespaart.
              </BenefitItem>
              <BenefitItem title="Behouden van relaties:">
                Omdat de focus ligt op samenwerking, blijven relaties tussen
                partijen vaak beter intact. Dit is vooral van belang in
                situaties waar de partijen ook na het conflict samen verder
                moeten zoals bij huurgeschillen.
              </BenefitItem>
              <BenefitItem title="Flexibiliteit:">
                Het mediationproces is flexibel en kan worden aangepast aan de
                behoeften van de partijen, wat zorgt voor een oplossing op maat.
              </BenefitItem>
            </ul>
          </section>

          {/* Preparation and phases section */}
          <section aria-labelledby="phases-heading" className="mt-6 w-full">
            <h3 id="phases-heading" className="text-lg font-bold sr-only">
              Fases van het mediationproces
            </h3>
            <p>
              Een goede voorbereiding vergroot de kans op succes bij mediation.
              Het is belangrijk dat alle partijen hun doelen duidelijk
              formuleren en de relevante documentatie voorbereiden. Tijdens de
              pre-mediation fase verzamelt de mediator informatie en stelt een
              mediationovereenkomst op. Hierin worden de spelregels voor het
              traject vastgelegd.
            </p>
            <p className="mt-4">
              Ook bespreekt de mediator vertrouwelijkheid en gedragsregels,
              zodat iedereen zich veilig voelt om vrijuit te spreken.
            </p>
            <p className="mt-4">
              De mediation start met een eerste sessie waarin beide partijen hun
              standpunten toelichten. Dit helpt om misverstanden direct op te
              helderen en de basis te leggen voor constructieve gesprekken.
            </p>
            <p className="mt-4">
              Het mediationproces bestaat uit verschillende fasen, elk gericht
              op het (weder)opbouwen van vertrouwen en het zoeken naar een
              oplossing.
            </p>
            <p className="mt-4">
              De intakefase biedt de mogelijkheid voor beide partijen om
              individueel en vertrouwelijk hun standpunten te delen. De mediator
              benadrukt hierbij het belang van vertrouwelijkheid, wat zorgt voor
              een open en veilige communicatie.
            </p>
            <p className="mt-4">
              In de caucus-sessies, oftewel individuele gesprekken met de
              mediator, kunnen partijen hun zorgen en behoeften in vertrouwen
              bespreken. Dit stelt de mediator in staat om mogelijke blokkades
              in het proces te identificeren en te werken aan
              maatwerkoplossingen. Na de individuele gesprekken volgt een
              gezamenlijke afspraak. De mediator helpt de partijen bij het
              zoeken naar wederzijds acceptabele oplossingen en moedigt hen aan
              om compromissen te sluiten waar mogelijk.
            </p>
          </section>

          {/* Mediator role section */}
          <section
            aria-labelledby="mediator-role-heading"
            className="mt-6 w-full"
          >
            <h3
              id="mediator-role-heading"
              className="text-lg font-bold sr-only"
            >
              De rol van de mediator
            </h3>
            <p>
              De mediator speelt een sleutelrol in het mediationproces. Naast
              het begeleiden van de gesprekken, is het opbouwen van vertrouwen
              en het waarborgen van neutraliteit essentieel. De mediator zorgt
              ervoor dat beide partijen zich gehoord en gerespecteerd voelen.
              Neutraliteit is hierbij van groot belang; de mediator neemt geen
              standpunt in, maar faciliteert het proces zodat de partijen samen
              tot een oplossing kunnen komen. De mediator helpt misverstanden te
              voorkomen door het gesprek helder te houden en de belangrijkste
              punten samen te vatten. Dit stelt partijen in staat om zich
              volledig te concentreren op het vinden van een oplossing.
            </p>
          </section>

          {/* After mediation section */}
          <section
            aria-labelledby="after-mediation-heading"
            className="mt-6 w-full"
          >
            <h3
              id="after-mediation-heading"
              className="text-lg font-bold sr-only"
            >
              Na de mediation
            </h3>
            <p>
              Na de mediation zijn er belangrijke stappen die moeten worden
              gevolgd om de gemaakte afspraken na te komen en de resultaten te
              evalueren. De afspraken die tijdens de mediation worden gemaakt,
              moeten goed worden vastgelegd in een bindend document oftewel de
              vaststellingsovereenkomst (VSO). Het naleven van deze afspraken is
              essentieel voor het succes van de mediation. De mediator helpt om
              alles duidelijk op papier te zetten.
            </p>
            <p className="mt-4">
              Met mediation kunnen conflicten snel, effectief en kostenefficiënt
              worden opgelost, zonder de tussenkomst van een jurist of rechter.
              Joost van Os Makelaardij & Mediation biedt mediation op maat,
              gericht op het vinden van duurzame oplossingen die voor alle
              partijen werken.
            </p>
          </section>

          {/* Why choose us section */}
          <section aria-labelledby="why-us-heading" className="mt-8 w-full">
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

          {/* Call-to-action section */}
          <section className="w-full text-center mt-8">
            <h3 className="font-bold text-2xl mb-6">
              We zien uit naar onze samenwerking!
            </h3>

            {/* Contact button
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
            </Link> */}
          </section>
        </div>
      </div>
    </>
  );
}
