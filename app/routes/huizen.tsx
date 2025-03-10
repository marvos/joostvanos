import { useFetch } from "~/utils/useFetch";
import type { Objecten, Resultaten } from "~/utils/object-types";
import { Link } from "react-router";
import { useMemo } from "react";
import type { Route } from "./+types/huizen";

/**
 * Enhanced metadata for the houses overview page
 * Provides comprehensive SEO optimization for property listings
 */
export function meta({}: Route.MetaArgs) {
  // Build comprehensive meta description for property listings
  const metaDescription =
    "Bekijk ons actuele huizen aanbod bij Joost van Os Makelaardij. " +
    "Exclusieve woningen en appartementen in Amsterdam en omgeving, " +
    "zorgvuldig geselecteerd en professioneel begeleid door onze ervaren makelaars. " +
    "Vind uw droomhuis met uitgebreide foto's, details en specificaties.";

  const scriptLdRealEstateAgent = {
    "script:ld+json": {
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Joost van Os Makelaardij",
        description:
          "Ervaren makelaar met ruim 25 jaar ervaring in de Amsterdamse woningmarkt.",
        url: "https://joostvanos.nl",
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Woningen",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Woningaanbod",
              },
            },
          ],
        },
      }),
    },
  };
  const scriptLdItemList = {
    "script:ld+json": {
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "RealEstateListing",
              name: "Woningen bij Joost van Os Makelaardij",
              description:
                "Bekijk ons actuele aanbod van woningen en appartementen in Amsterdam en omgeving.",
              url: "https://joostvanos.nl/huizen",
            },
          },
        ],
      }),
    },
  };

  return [
    { title: "Huizen Aanbod - Actuele Woningen | Joost van Os Makelaardij" },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content:
        "huizen te koop, woningen amsterdam, appartementen, vastgoed, makelaardij, woning aanbod, huizen aanbod, huis kopen amsterdam",
    },

    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content: "Actuele Woningen & Appartementen - Joost van Os Makelaardij",
    },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://joostvanos.nl/interiors.webp" },
    { property: "og:url", content: "https://joostvanos.nl/huizen" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Actuele Woningen - Joost van Os Makelaardij",
    },
    { name: "twitter:description", content: metaDescription },
    { name: "twitter:image", content: "https://joostvanos.nl/interiors.webp" },

    { ...scriptLdRealEstateAgent },
    { ...scriptLdItemList },

    // Additional metadata for search optimization
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "application-name",
      content: "Joost van Os Makelaardij",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Huizen Aanbod",
    },
  ];
}

/**
 * Creates a URL-friendly slug from house address details
 * @param huis - House object containing address information
 * @returns Formatted URL path segment
 */
const createHuisUrl = (huis: Resultaten) => {
  // Format city name for URL
  const plaats = huis.adres.plaats
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, "");

  // Format street name for URL
  const straat = huis.adres.straat
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  // Format house number for URL
  const huisnummer = huis.adres.huisnummer.hoofdnummer
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-");

  // Format house number suffix for URL (if available)
  const toevoeging = huis.adres.huisnummer.toevoeging
    ? huis.adres.huisnummer.toevoeging
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-")
    : "";

  // Create full URL path
  return `/huizen/detail/${plaats}/${straat}${huisnummer}${toevoeging}/${huis?.diversen.diversen.objectcode}`;
};

/**
 * Data loader for houses overview page
 * Fetches and sorts property listings from the API
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  // Fetch available properties from API
  const objecten: Objecten = await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "GET",
  });

  // Sort properties by status (available first, then conditionally sold, then sold)
  return {
    resultaten: objecten?.resultaten.sort((a, b) => {
      const statusA = a.financieel.overdracht.status.toLowerCase();
      const statusB = b.financieel.overdracht.status.toLowerCase();
      if (statusA < statusB) return -1;
      if (statusA > statusB) return 1;
      return 0;
    }),
  };
}

/**
 * Property card component for displaying house information
 */
const PropertyCard = ({ huis }: { huis: Resultaten }) => {
  // Format the status text for display and styling
  const overdrachtStatus = huis.financieel.overdracht.status
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, " ");

  // Find the main image for this property
  const mainImage = huis.media.find((item) => item.soort === "HOOFDFOTO");

  // Generate URL for this property's detail page
  const huisUrl = createHuisUrl(huis);

  // Determine the badge color based on property status
  const getBadgeClass = () => {
    switch (overdrachtStatus) {
      case "beschikbaar":
        return "badge-success";
      case "verkocht":
        return "badge-neutral text-black";
      case "verkocht onder voorbehoud":
        return "badge-warning";
      default:
        return "";
    }
  };

  return (
    <Link
      to={huisUrl}
      className="block transition-transform hover:scale-[1.01]"
    >
      <div className="card md:card-side bg-white shadow-xl h-full">
        {/* Property image */}
        <figure className="md:w-1/2">
          <img
            src={`${mainImage?.link}&resize=4`}
            alt={`${huis.adres.straat} ${huis.adres.huisnummer.hoofdnummer}`}
            className="object-cover w-full h-full md:max-w-sm"
            loading="lazy"
          />
        </figure>

        {/* Property details */}
        <div className="card-body px-6 py-4">
          {/* Address information */}
          <h2 className="card-title flex-col gap-0 items-start">
            {huis.adres.straat} {huis.adres.huisnummer.hoofdnummer}
            {huis.adres.huisnummer.toevoeging && (
              <>
                {"-"}
                {huis.adres.huisnummer.toevoeging}
              </>
            )}
            <span className="text-sm font-normal">
              {huis.adres.postcode} {huis.adres.plaats}
            </span>
          </h2>

          {/* Price and status */}
          <h2 className="card-title">
            {new Intl.NumberFormat("nl-NL", {
              style: "currency",
              currency: "EUR",
            })
              .format(huis.financieel.overdracht.koopprijs)
              .slice(0, -3)}

            <div className={`badge whitespace-nowrap ${getBadgeClass()}`}>
              {overdrachtStatus}
            </div>
          </h2>

          {/* Property description preview */}
          <p className="mt-2">
            {huis.teksten.aanbiedingstekst.substring(0, 130)}...
          </p>

          {/* Property features */}
          <div className="flex flex-wrap gap-2 mt-2">
            {/* Living area */}
            <div className="flex gap-1 text-xs items-center">
              <img src="/icons/oppervlakte.svg" alt="Woonoppervlakte" />
              <span>{huis.algemeen.woonoppervlakte}m²</span>
            </div>

            {/* Plot size (if available) */}
            {huis.detail.kadaster[0].kadastergegevens.oppervlakte && (
              <div className="flex gap-1 text-xs items-center">
                <img src="/icons/perceel.svg" alt="Perceeloppervlakte" />
                <span>
                  {huis.detail.kadaster[0].kadastergegevens.oppervlakte}m²
                  perceel
                </span>
              </div>
            )}

            {/* Number of rooms (if available) */}
            {huis.algemeen.aantalKamers && (
              <div className="flex gap-1 text-xs items-center">
                <img src="/icons/house-room.svg" alt="Aantal kamers" />
                <span>{huis.algemeen.aantalKamers} kamers</span>
              </div>
            )}

            {/* Energy label (if available) */}
            {huis.algemeen.energieklasse && (
              <div className="flex gap-1 text-xs items-center">
                <img src="/icons/energy.svg" alt="Energieklasse" />
                <span>{huis.algemeen.energieklasse}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

/**
 * Main houses overview component
 */
export default function Huizen({ loaderData }: Route.ComponentProps) {
  const { resultaten } = loaderData;

  // Filter out withdrawn properties
  const availableProperties = useMemo(
    () =>
      resultaten?.filter(
        (huis) =>
          huis.financieel.overdracht.status
            ?.toLowerCase()
            ?.replace(/[^a-zA-Z0-9 ]/g, " ") !== "ingetrokken"
      ),
    [resultaten]
  );

  return (
    <>
      {/* Hero section */}
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/interiors.webp)",
        }}
      >
        <div className="hero-overlay bg-black/60"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">Huizen</h1>
            <p className="mb-5">Bekijk ons aanbod</p>
          </div>
        </div>
      </div>

      {/* Property listings section */}
      <div className="container flex flex-col gap-6 pb-20 px-5 py-14">
        {availableProperties?.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-7 m-auto items-stretch justify-center">
            {availableProperties.map((huis: Resultaten) => (
              <PropertyCard key={huis.id} huis={huis} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium">Geen huizen beschikbaar</h2>
            <p className="mt-4">
              Er zijn momenteel geen huizen in ons aanbod. Neem contact met ons
              op voor meer informatie.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
