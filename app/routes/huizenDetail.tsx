import { useFetch } from "~/utils/useFetch";
import type { Objecten, Resultaten } from "~/utils/object-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay, Navigation } from "swiper/modules";
import { useMemo, useState } from "react";
import type { Route } from "./+types/huizenDetail";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

// Import CSS styles for components
import swiper from "swiper/css?url";
import swipergrid from "swiper/css/grid?url";
import swiperpagination from "swiper/css/pagination?url";
import styles from "yet-another-react-lightbox/styles.css?url";
import thumbs from "yet-another-react-lightbox/plugins/thumbnails.css?url";

/**
 * Provides CSS styles for the component
 */
export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: swiper },
  { rel: "stylesheet", href: swipergrid },
  { rel: "stylesheet", href: swiperpagination },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: thumbs },
];

/**
 * Data loader that fetches property details based on URL parameters
 * @param request - Request object
 * @param context - Context object containing environment variables
 * @param params - URL parameters
 * @returns Property data for the selected house
 */
export async function loader({ request, context, params }: Route.LoaderArgs) {
  // Fetch all properties
  const objecten: Objecten = await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "GET",
  });

  // Find the specific property by its unique object code
  const huis = objecten?.resultaten.find(
    (obj) => obj.diversen.diversen.objectcode === params.objectcode
  );

  return { huis };
}

/**
 * Generates comprehensive metadata for SEO optimization
 * Includes property details, features, price and status information
 */
export function meta({ loaderData }: Route.MetaArgs) {
  // Check if loaderData exists and has the huis property
  if (!loaderData || !loaderData.huis) {
    return [
      { title: "Woning details - Joost van Os Makelaardij" },
      {
        name: "description",
        content: "Details van deze woning worden geladen.",
      },
    ];
  }

  const { huis } = loaderData;

  // Format the property status
  const status = huis.financieel?.overdracht?.status
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, " ");

  // Format the price for display
  const price = huis.financieel?.overdracht?.koopprijs
    ? new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      })
        .format(huis.financieel.overdracht.koopprijs)
        .slice(0, -3)
    : "";

  // Create full address for title
  const fullAddress = `${huis.adres?.straat || ""} ${
    huis.adres?.huisnummer?.hoofdnummer || ""
  }${
    huis.adres?.huisnummer?.toevoeging
      ? "-" + huis.adres.huisnummer.toevoeging
      : ""
  }`;

  // Build property features for description
  const features = [
    huis.algemeen?.woonoppervlakte
      ? `${huis.algemeen.woonoppervlakte}m² woonoppervlakte`
      : "",
    huis.detail?.kadaster?.[0]?.kadastergegevens?.oppervlakte
      ? `${huis.detail.kadaster[0].kadastergegevens.oppervlakte}m² perceeloppervlakte`
      : "",
    huis.algemeen?.aantalKamers ? `${huis.algemeen.aantalKamers} kamers` : "",
    huis.algemeen?.bouwjaar ? `bouwjaar ${huis.algemeen.bouwjaar}` : "",
    huis.algemeen?.energieklasse
      ? `energielabel ${huis.algemeen.energieklasse}`
      : "",
  ]
    .filter(Boolean)
    .join(", ");

  // Build meta description with key property information
  const metaDescription = `${fullAddress}, ${huis.adres?.postcode || ""} ${
    huis.adres?.plaats || ""
  }. 
    ${price}${status ? ` (${status})` : ""}. ${features}. 
    ${huis.teksten?.aanbiedingstekst?.substring(0, 100) || ""}...`;

  // Find the main image for the property
  const mainImage = huis.media?.find((item) => item.soort === "HOOFDFOTO");

  return [
    {
      title: `${fullAddress}, ${huis?.adres.plaats} - Joost van Os Makelaardij`,
    },
    {
      name: "description",
      content: metaDescription,
    },
    // Open Graph meta tags for rich social media sharing
    {
      property: "og:title",
      content: `${fullAddress}, ${huis?.adres.plaats}`,
    },
    {
      property: "og:description",
      content: metaDescription,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:price:amount",
      content: huis?.financieel?.overdracht?.koopprijs?.toString(),
    },
    {
      property: "og:price:currency",
      content: "EUR",
    },
    // Add main image for social media sharing if available
    ...(mainImage
      ? [
          {
            property: "og:image",
            content: `${mainImage?.link}&resize=4`,
          },
        ]
      : []),
  ];
}

/**
 * Component to display a property feature with icon
 */
const PropertyFeature = ({ icon, children, alt = "" }: any) => (
  <div className="flex gap-1 text-xs items-center">
    <img src={icon} alt={alt} />
    <span>{children}</span>
  </div>
);

/**
 * Main house detail component
 */
export default function HouseDetail({ loaderData }: Route.ComponentProps) {
  const { huis } = loaderData;

  // Find the main image for the property
  const mainImage = useMemo(
    () => huis?.media.find((item) => item.soort === "HOOFDFOTO"),
    [huis?.media]
  );

  // State for lightbox image gallery
  const [index, setIndex] = useState(-1);

  // Format property status for display
  const overdrachtStatus = useMemo(
    () =>
      huis?.financieel?.overdracht?.status
        ?.toLowerCase()
        ?.replace(/[^a-zA-Z0-9 ]/g, " "),
    [huis?.financieel?.overdracht?.status]
  );

  // Format price for display
  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      })
        .format(huis?.financieel?.overdracht?.koopprijs as number)
        .slice(0, -3),
    [huis?.financieel?.overdracht?.koopprijs]
  );

  // Determine status badge styling
  const statusBadgeClass = useMemo(() => {
    switch (overdrachtStatus) {
      case "beschikbaar":
        return "badge-success";
      case "verkocht":
        return "badge-neutral";
      case "verkocht onder voorbehoud":
        return "badge-warning";
      default:
        return "";
    }
  }, [overdrachtStatus]);

  // Prepare slides for the image lightbox
  const lightboxSlides = useMemo(
    () =>
      huis?.media?.map((media) => ({
        src: `${media.link}&resize=4`,
      })),
    [huis?.media]
  );

  // If no house data, show loading state
  if (!huis) {
    return (
      <div className="container py-20 text-center">Woning wordt geladen...</div>
    );
  }

  return (
    <>
      {/* Hero section with main property image */}
      <div
        className="hero min-h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainImage?.link}&resize=4)`,
        }}
      >
        <div className="hero-overlay bg-black/20"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end flex-col">
          <div className="max-w-md">
            {/* Property address */}
            <h1 className="mb-5 text-5xl font-bold mt-[30vh] backdrop-blur-sm bg-black/40 backdrop-opacity-95 p-2">
              {huis?.adres.straat} {huis?.adres.huisnummer.hoofdnummer}
              {huis?.adres.huisnummer.toevoeging && (
                <>
                  {"-"}
                  {huis.adres.huisnummer.toevoeging}
                </>
              )}
            </h1>
            {/* Postal code and city */}
            <span className="text-sm font-medium backdrop-blur-sm bg-black/40 backdrop-opacity-95 p-3">
              {huis?.adres.postcode} {huis?.adres.plaats}
            </span>
          </div>
        </div>
      </div>

      {/* Image gallery thumbnail slider */}
      <div className="container max-w-4xl my-2">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          navigation={false}
          modules={[Autoplay, Navigation]}
          className="swiper"
          breakpoints={{
            640: { slidesPerView: 5 },
            320: { slidesPerView: 3 },
          }}
        >
          {huis?.media?.map((media, imageIndex) => (
            <SwiperSlide key={media.link}>
              <figure>
                <img
                  src={`${media.link}`}
                  onClick={() => setIndex(imageIndex)}
                  className="w-full object-cover h-[95px] cursor-zoom-in"
                  alt={`Afbeelding ${imageIndex + 1} van ${huis.adres.straat}`}
                  loading="lazy"
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox for full-screen image gallery */}
      <Lightbox
        index={index}
        open={index >= 0}
        plugins={[Thumbnails]}
        close={() => setIndex(-1)}
        slides={lightboxSlides}
      />

      {/* Property details */}
      <div className="container max-w-2xl flex flex-col gap-6 pb-20 px-5 lg:px-16 py-8 bg-white shadow-lg rounded-md mt-4">
        {/* Property address header */}
        <h2 className="text-2xl font-bold">
          {huis?.adres.straat} {huis?.adres.huisnummer.hoofdnummer}
          {huis?.adres.huisnummer.toevoeging && (
            <>-{huis.adres.huisnummer.toevoeging}</>
          )}
          <div className="text-sm font-normal">
            {huis?.adres.postcode} {huis?.adres.plaats}
          </div>
        </h2>

        {/* Price and status */}
        <h2 className="card-title items-start flex-col md:flex-row md:items-center gap-2">
          <span>{formattedPrice}</span>
          <div className={`badge whitespace-nowrap ${statusBadgeClass}`}>
            {overdrachtStatus}
          </div>
        </h2>

        {/* Property features */}
        <div className="flex flex-wrap gap-4 bg-gray-50 p-3 rounded-md">
          {/* Living area */}
          <PropertyFeature icon="/icons/oppervlakte.svg" alt="Woonoppervlakte">
            {huis?.algemeen.woonoppervlakte}m²
          </PropertyFeature>

          {/* Plot size (if available) */}
          {huis?.detail.kadaster[0].kadastergegevens.oppervlakte && (
            <PropertyFeature icon="/icons/perceel.svg" alt="Perceeloppervlakte">
              {huis?.detail.kadaster[0].kadastergegevens.oppervlakte}m² perceel
            </PropertyFeature>
          )}

          {/* Number of rooms (if available) */}
          {huis?.algemeen.aantalKamers && (
            <PropertyFeature icon="/icons/house-room.svg" alt="Aantal kamers">
              {huis?.algemeen.aantalKamers} kamers
            </PropertyFeature>
          )}

          {/* Energy label (if available) */}
          {huis?.algemeen.energieklasse && (
            <PropertyFeature icon="/icons/energy.svg" alt="Energieklasse">
              {huis?.algemeen.energieklasse}
            </PropertyFeature>
          )}

          {/* Property type badge */}
          {huis?.algemeen.woonhuistype && (
            <div className="badge badge-outline capitalize">
              {huis?.algemeen.woonhuistype
                ?.toLowerCase()
                ?.replace(/[^a-zA-Z0-9 ]/g, " ")}
            </div>
          )}

          {/* Construction year badge */}
          {huis?.algemeen.bouwjaar && (
            <div className="badge"> bouwjaar {huis?.algemeen.bouwjaar}</div>
          )}
        </div>

        {/* Property description */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Omschrijving</h3>
          <p className="whitespace-pre-wrap">
            {huis?.teksten.aanbiedingstekst}
          </p>
        </div>

        {/* Thumbnail gallery at bottom for all photos */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Foto's</h3>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
            {huis?.media?.map((media, imageIndex) => (
              <figure key={media.link + "thumb"}>
                <img
                  src={`${media.link}`}
                  className="cursor-zoom-in hover:opacity-80 transition-opacity"
                  onClick={() => setIndex(imageIndex)}
                  alt={`Afbeelding ${imageIndex + 1} van ${huis.adres.straat}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Contact section */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-xl font-semibold mb-2">Interesse?</h3>
          <p>
            Neem contact op met Joost van Os voor meer informatie of voor het
            maken van een bezichtigingsafspraak.
          </p>
          <a href="tel:+31622691573" className="btn btn-primary mt-4">
            Bel direct: 0622 691573
          </a>
        </div>
      </div>
    </>
  );
}
