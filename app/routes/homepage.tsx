import type { Route } from "./+types/homepage";
import { Navbar } from "~/components/Navbar";
import { JvoFooter } from "~/components/jvoFooter";
import type { Objecten } from "~/utils/object-types";
import { useFetch } from "~/utils/useFetch";
import { Link } from "react-router";
import { memo } from "react";

/**
 * Enhanced metadata for the homepage with comprehensive SEO optimization
 * Includes structured data, social media tags, and keyword-rich descriptions
 */
export function meta({}: Route.MetaArgs) {
  // Main services for metadata
  const services = [
    "Makelaardij",
    "Vastgoed Mediation",
    "Mediation",
    "Aan/verkoop begeleiding",
    "Waardebepaling",
  ].join(", ");

  // Build comprehensive meta description using page content
  const metaDescription =
    `Joost van Os Makelaardij & Mediation - Met ruim 25 jaar ervaring en 850+ geslaagde transacties ` +
    `bieden wij deskundige diensten in makelaardij, vastgoed mediation en conflictoplossing in Amsterdam. ` +
    `Onze diensten: ${services}. Persoonlijke aanpak, uitgebreide marktkennis en effectieve begeleiding.`;

  const scriptLdRealEstateAgent = {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Joost van Os Makelaardij & Mediation",
        image: "https://joostvanos.nl/logo.png",
        description: metaDescription,
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
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$",
        sameAs: [
          "https://www.linkedin.com/in/joost-van-os/",
          "https://www.funda.nl/makelaars/amsterdam/64369-joost-van-os-makelaardij/",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Makelaardij",
              description:
                "Met ruim 25 jaar ervaring in de makelaardij en 850+ geslaagde transacties zijn wij deskundig en hebben uitgebreide kennis van de lokale vastgoedmarkt.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vastgoed Mediation",
              description:
                "Wij begrijpen dat er in zowel persoonlijke als zakelijke relaties conflicten kunnen ontstaan. Het is onze missie om u te helpen deze conflicten op een constructieve en effectieve manier op te lossen.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mediation",
              description:
                "Met onze professionele begeleiding creëren we een onpartijdige en veilige omgeving waarin alle betrokken partijen hun zorgen en wensen kunnen uiten.",
            },
          },
        ],
      }),
    },
  };

  return [
    {
      title:
        "Joost van Os Makelaardij & Mediation | Ervaren Makelaar & Mediator Amsterdam",
    },
    { name: "description", content: metaDescription },
    {
      name: "keywords",
      content: `makelaardij, vastgoed mediation, mediation, makelaar amsterdam, conflictoplossing, woningmarkt, aan/verkoop, waardebepaling, amsterdam vastgoed`,
    },

    // Open Graph tags for better social media sharing
    {
      property: "og:title",
      content:
        "Joost van Os Makelaardij & Mediation | Ervaren Makelaar Amsterdam",
    },
    { property: "og:description", content: metaDescription },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://joostvanos.nl/canals.webp" },
    { property: "og:url", content: "https://joostvanos.nl" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Joost van Os Makelaardij & Mediation" },
    { name: "twitter:description", content: metaDescription },
    { name: "twitter:image", content: "https://joostvanos.nl/canals.webp" },

    { ...scriptLdRealEstateAgent },

    // Additional metadata for search ranking
    { name: "author", content: "Joost van Os" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#000000" },
    { name: "mobile-web-app-capable", content: "yes" },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ];
}

/**
 * Data loader for the homepage
 * Fetches property listings from the API
 */
export async function loader({ request, context }: Route.LoaderArgs) {
  // Fetch available properties from API
  const objecten: Objecten = await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "GET",
  });

  return {
    resultaten: objecten?.resultaten,
    message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE,
  };
}

// Arrow icon component for consistent usage throughout the page
const ArrowIcon = memo(() => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g clipPath="url(#clip0_6_13426)">
      <path
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"
        fill="currentColor"
      />
    </g>
  </svg>
));
ArrowIcon.displayName = "ArrowIcon";

/**
 * Section component for content blocks to reduce repetition
 */
const ContentSection = memo(
  ({
    imageUrl,
    imagePosition = "right",
    title,
    boldTitle,
    children,
    linkText,
    linkUrl,
  }: any) => {
    const isImageRight = imagePosition === "right";

    return (
      <div className="lg:h-[50vh] lg:grid lg:grid-cols-2">
        {!isImageRight && (
          <div
            className="h-[50vh] bg-cover bg-no-repeat bg-center relative hidden lg:block"
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-hidden="true"
          />
        )}

        <div className="p-8 lg:p-20 flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl font-medium w-full">
            {title} <span className="font-bold">{boldTitle}</span>
          </h2>
          <div className="text-xl text-mocha-900">
            <img
              src={imageUrl}
              alt=""
              className={`float-${
                isImageRight ? "right" : "left"
              } sm:max-w-80 sm:p${
                isImageRight ? "l" : "r"
              }-4 pb-4 lg:hidden w-full`}
            />
            {children}
          </div>
          <div className="w-full">
            <Link to={linkUrl} className="btn btn-primary w-auto">
              {linkText} <ArrowIcon />
            </Link>
          </div>
        </div>

        {isImageRight && (
          <div
            className="h-[50vh] bg-cover bg-no-repeat bg-center relative hidden lg:block"
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);
ContentSection.displayName = "ContentSection";

/**
 * Main homepage component
 */
export default function Homepage({ loaderData }: Route.ComponentProps) {
  const { resultaten } = loaderData;

  return (
    <>
      {/* Navigation with inverted colors for the hero section */}
      <Navbar inverted={true} />

      {/* Hero section with background image */}
      <div
        className="min-h-[calc(100vh_-_100px)] bg-cover bg-no-repeat relative"
        style={{ backgroundImage: "url(/canals.webp)" }}
      >
        <div className="container flex flex-col text-neutral-content text-center items-center justify-around h-full min-h-[calc(100vh_-_100px)] pt-[64px] gap-8">
          {/* Logo section */}
          <div className="flex items-center justify-between w-full space-y-4 p-4 max-w-[400px] mx-auto z-10">
            <svg
              width={1462}
              height={482}
              viewBox="0 0 1462 482"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-dark lg:w-full max-w-[500px] w-[260px] max-h-32 ml-auto lg:m-auto block"
              aria-label="Joost van Os logo"
            >
              {/* SVG path elements - truncated for brevity */}
              <rect
                x={5}
                y={5}
                width={459}
                height={459}
                rx={85}
                stroke="#fff"
                strokeWidth={10}
              />
              <mask id="a" fill="#fff">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M246.345 221.064c-3.305 8.504-15.338 8.504-18.642 0l-44.179-113.686c-3.304-8.504-15.337-8.504-18.642 0L70.688 349.77c-2.547 6.555 2.289 13.622 9.322 13.622h314.028c7.033 0 11.868-7.067 9.321-13.622l-94.194-242.392c-3.304-8.504-15.337-8.504-18.642 0l-44.178 113.686z"
                />
              </mask>
              <path
                d="M70.689 349.77l-9.321-3.622 9.32 3.622zm219.834-242.392l9.321 3.622-9.321-3.622zm-62.82 113.686l-9.321 3.622 9.321-3.622zm18.642 0l9.321 3.622-9.321-3.622zM403.359 349.77l9.321-3.622-9.321 3.622zM174.203 111l44.179 113.686 18.642-7.244-44.179-113.686L174.203 111zM80.009 353.392L174.204 111l-18.642-7.244-94.193 242.392 18.642 7.244zm111.027 0H80.01v20h111.026v-20zm91.976 0h-91.976v20h91.976v-20zm111.026 0H283.012v20h111.026v-20zM299.844 111l94.194 242.392 18.642-7.244-94.194-242.392L299.844 111zm-44.178 113.686L299.844 111l-18.642-7.244-44.178 113.686 18.642 7.244zM61.368 346.148c-5.095 13.11 4.576 27.244 18.642 27.244v-20a.173.173 0 01-.035-.002l.004.001.019.007a.083.083 0 01.029.015l-.008-.008-.01-.013-.008-.014a.059.059 0 01-.004-.01c-.002-.003 0 .001.002.012a.179.179 0 010 .041v.004c0-.003.003-.014.01-.033l-18.641-7.244zm257.118-242.392c-6.609-17.008-30.674-17.008-37.284 0L299.844 111a.904.904 0 01.027-.061c.006-.015.012-.024.014-.029l.003-.004-.008.011-.017.019-.022.021a.455.455 0 01-.047.036c-.028.018-.041.02-.029.016l.031-.006a.353.353 0 01.097 0l.03.006c.012.004 0 .002-.029-.016a.592.592 0 01-.085-.076.063.063 0 01-.008-.011l.002.004a.614.614 0 01.041.09l18.642-7.244zm-100.104 120.93c6.609 17.008 30.675 17.008 37.284 0l-18.642-7.244a.904.904 0 01-.041.09l-.003.004.008-.011.017-.019a.447.447 0 01.069-.057c.028-.018.041-.02.029-.016l-.031.006a.353.353 0 01-.097 0l-.03-.006c-.012-.004 0-.002.029.016a.592.592 0 01.085.076l.009.011-.003-.004a.614.614 0 01-.041-.09l-18.642 7.244zm175.656 148.706c14.065 0 23.737-14.134 18.642-27.244l-18.642 7.244.011.033v-.004l-.001-.02.001-.021.002-.012-.004.01-.009.014-.01.013-.007.008.01-.007a.084.084 0 01.019-.008l.019-.007.004-.001a.19.19 0 01-.035.002v20zM192.845 103.756c-6.609-17.008-30.674-17.008-37.284 0L174.203 111a.904.904 0 01.027-.061c.006-.015.012-.024.014-.029l.003-.004-.008.011-.017.019-.022.021a.455.455 0 01-.047.036c-.028.018-.041.02-.029.016l.031-.006a.353.353 0 01.097 0l.03.006c.012.004 0 .002-.029-.016a.592.592 0 01-.046-.036l-.022-.021a.238.238 0 01-.023-.026.614.614 0 01.041.09l18.642-7.244z"
                fill="#fff"
                mask="url(#a)"
              />
              <path
                d="M541.288 174.16v-14.72h5.248c2.731 0 4.651-.555 5.76-1.664 1.195-1.109 1.792-2.901 1.792-5.376V81.488h17.28v70.784c0 5.291-.939 9.515-2.816 12.672-1.792 3.243-4.352 5.589-7.68 7.04-3.328 1.451-7.253 2.176-11.776 2.176h-7.808zm21.504-101.504c-3.157 0-5.717-.896-7.68-2.688-1.963-1.877-2.944-4.224-2.944-7.04s.981-5.12 2.944-6.912c1.963-1.877 4.523-2.816 7.68-2.816s5.717.939 7.68 2.816c1.963 1.792 2.944 4.096 2.944 6.912s-.981 5.163-2.944 7.04c-1.963 1.792-4.523 2.688-7.68 2.688zm56.245 74.88c-6.144 0-11.691-1.408-16.64-4.224-4.864-2.901-8.747-6.869-11.648-11.904-2.816-5.12-4.224-10.965-4.224-17.536 0-6.741 1.408-12.629 4.224-17.664 2.901-5.12 6.827-9.088 11.776-11.904 4.949-2.901 10.496-4.352 16.64-4.352 6.229 0 11.776 1.45 16.64 4.352 4.949 2.816 8.832 6.784 11.648 11.904 2.901 5.035 4.352 10.88 4.352 17.536 0 6.656-1.451 12.544-4.352 17.664-2.816 5.035-6.699 9.003-11.648 11.904-4.949 2.816-10.539 4.224-16.768 4.224zm0-14.976c2.901 0 5.461-.683 7.68-2.048 2.304-1.365 4.096-3.456 5.376-6.272 1.365-2.816 2.048-6.315 2.048-10.496s-.683-7.637-2.048-10.368c-1.28-2.816-3.072-4.907-5.376-6.272-2.219-1.45-4.736-2.176-7.552-2.176-2.731 0-5.248.725-7.552 2.176-2.304 1.365-4.139 3.456-5.504 6.272-1.28 2.731-1.92 6.187-1.92 10.368s.64 7.68 1.92 10.496c1.365 2.816 3.157 4.907 5.376 6.272 2.304 1.365 4.821 2.048 7.552 2.048zm78.125 14.976c-6.144 0-11.691-1.408-16.64-4.224-4.864-2.901-8.747-6.869-11.648-11.904-2.816-5.12-4.224-10.965-4.224-17.536 0-6.741 1.408-12.629 4.224-17.664 2.901-5.12 6.827-9.088 11.776-11.904 4.949-2.901 10.496-4.352 16.64-4.352 6.229 0 11.776 1.45 16.64 4.352 4.949 2.816 8.832 6.784 11.648 11.904 2.901 5.035 4.352 10.88 4.352 17.536 0 6.656-1.451 12.544-4.352 17.664-2.816 5.035-6.699 9.003-11.648 11.904-4.949 2.816-10.539 4.224-16.768 4.224zm0-14.976c2.901 0 5.461-.683 7.68-2.048 2.304-1.365 4.096-3.456 5.376-6.272 1.365-2.816 2.048-6.315 2.048-10.496s-.683-7.637-2.048-10.368c-1.28-2.816-3.072-4.907-5.376-6.272-2.219-1.45-4.736-2.176-7.552-2.176-2.731 0-5.248.725-7.552 2.176-2.304 1.365-4.139 3.456-5.504 6.272-1.28 2.731-1.92 6.187-1.92 10.368s.64 7.68 1.92 10.496c1.365 2.816 3.157 4.907 5.376 6.272 2.304 1.365 4.821 2.048 7.552 2.048zm74.029 14.976c-5.888 0-11.008-.939-15.36-2.816-4.352-1.877-7.765-4.48-10.24-7.808-2.475-3.328-3.883-7.083-4.224-11.264h17.152a12.865 12.865 0 002.176 4.48c1.024 1.28 2.389 2.304 4.096 3.072 1.707.768 3.755 1.152 6.144 1.152 2.304 0 4.181-.299 5.632-.896 1.451-.683 2.517-1.579 3.2-2.688.768-1.109 1.152-2.261 1.152-3.456 0-1.792-.512-3.157-1.536-4.096-1.024-1.024-2.517-1.835-4.48-2.432-1.963-.597-4.352-1.195-7.168-1.792a108.36 108.36 0 01-9.088-2.176c-2.901-.939-5.504-2.091-7.808-3.456-2.304-1.365-4.139-3.115-5.504-5.248-1.365-2.133-2.048-4.779-2.048-7.936 0-3.84 1.024-7.253 3.072-10.24 2.048-3.072 5.035-5.504 8.96-7.296 3.925-1.792 8.661-2.688 14.208-2.688 7.765 0 13.909 1.75 18.432 5.248 4.523 3.499 7.211 8.32 8.064 14.464h-16.256c-.512-1.963-1.664-3.499-3.456-4.608-1.707-1.195-4.011-1.792-6.912-1.792-3.072 0-5.419.555-7.04 1.664-1.621 1.11-2.432 2.56-2.432 4.352 0 1.195.512 2.261 1.536 3.2 1.109.939 2.645 1.749 4.608 2.432 1.963.597 4.352 1.195 7.168 1.792 4.949 1.024 9.301 2.219 13.056 3.584 3.755 1.28 6.699 3.157 8.832 5.632 2.133 2.389 3.2 5.888 3.2 10.496 0 4.096-1.109 7.765-3.328 11.008-2.219 3.157-5.376 5.632-9.472 7.424-4.011 1.792-8.789 2.688-14.336 2.688zM840.004 146c-4.523 0-8.491-.683-11.904-2.048-3.328-1.451-5.931-3.797-7.808-7.04-1.877-3.328-2.816-7.851-2.816-13.568V95.952h-11.008V81.488h11.008l1.92-17.536h15.36v17.536h17.024v14.464h-17.024V123.6c0 2.901.64 4.907 1.92 6.016 1.28 1.109 3.456 1.664 6.528 1.664h8.448V146h-11.648zm73.724 0l-23.68-64.512h18.176l16 48.256 16-48.256h18.048L934.72 146h-20.992zm72.98 1.536c-5.376 0-9.813-.853-13.312-2.56-3.499-1.792-6.101-4.139-7.808-7.04-1.621-2.987-2.432-6.272-2.432-9.856 0-3.925.981-7.381 2.944-10.368 2.048-2.987 5.077-5.333 9.088-7.04 4.096-1.707 9.216-2.56 15.36-2.56h16.002c0-3.157-.43-5.76-1.28-7.808-.86-2.133-2.18-3.712-3.97-4.736-1.792-1.024-4.181-1.536-7.168-1.536-3.243 0-6.016.725-8.32 2.176-2.219 1.365-3.584 3.499-4.096 6.4h-16.768c.427-4.608 1.92-8.576 4.48-11.904 2.645-3.413 6.101-6.059 10.368-7.936 4.352-1.877 9.173-2.816 14.464-2.816 6.06 0 11.31 1.024 15.74 3.072 4.44 2.048 7.85 4.992 10.24 8.832 2.39 3.84 3.59 8.576 3.59 14.208V146h-14.59l-1.92-9.856a22.727 22.727 0 01-3.33 4.608c-1.28 1.365-2.78 2.56-4.482 3.584-1.707 1.024-3.627 1.792-5.76 2.304-2.133.597-4.48.896-7.04.896zm4.096-13.312c2.219 0 4.181-.384 5.888-1.152 1.792-.853 3.328-1.963 4.608-3.328a15.737 15.737 0 002.94-4.864c.77-1.877 1.28-3.883 1.54-6.016v-.128h-13.184c-2.645 0-4.821.341-6.528 1.024-1.621.597-2.816 1.493-3.584 2.688-.768 1.195-1.152 2.56-1.152 4.096 0 1.707.384 3.115 1.152 4.224.768 1.109 1.877 1.963 3.328 2.56 1.451.597 3.115.896 4.992.896zM1039.95 146V81.488h15.23l1.28 10.496c1.96-3.584 4.74-6.485 8.32-8.704 3.67-2.219 8.02-3.328 13.06-3.328 5.37 0 9.89 1.11 13.56 3.328 3.67 2.219 6.45 5.461 8.32 9.728 1.97 4.267 2.95 9.515 2.95 15.744V146h-17.15v-35.584c0-5.12-1.11-9.045-3.33-11.776-2.14-2.73-5.46-4.096-9.99-4.096-2.9 0-5.5.683-7.8 2.048-2.22 1.365-3.97 3.328-5.25 5.888-1.28 2.475-1.92 5.504-1.92 9.088V146h-17.28zm139.59 1.536c-6.15 0-11.69-1.408-16.64-4.224-4.87-2.901-8.75-6.869-11.65-11.904-2.82-5.12-4.22-10.965-4.22-17.536 0-6.741 1.4-12.629 4.22-17.664 2.9-5.12 6.83-9.088 11.78-11.904 4.94-2.901 10.49-4.352 16.64-4.352 6.22 0 11.77 1.45 16.64 4.352 4.94 2.816 8.83 6.784 11.64 11.904 2.9 5.035 4.36 10.88 4.36 17.536 0 6.656-1.46 12.544-4.36 17.664-2.81 5.035-6.7 9.003-11.64 11.904-4.95 2.816-10.54 4.224-16.77 4.224zm0-14.976c2.9 0 5.46-.683 7.68-2.048 2.3-1.365 4.09-3.456 5.37-6.272 1.37-2.816 2.05-6.315 2.05-10.496s-.68-7.637-2.05-10.368c-1.28-2.816-3.07-4.907-5.37-6.272-2.22-1.45-4.74-2.176-7.55-2.176-2.74 0-5.25.725-7.56 2.176-2.3 1.365-4.14 3.456-5.5 6.272-1.28 2.731-1.92 6.187-1.92 10.368s.64 7.68 1.92 10.496c1.36 2.816 3.16 4.907 5.38 6.272 2.3 1.365 4.82 2.048 7.55 2.048zm74.03 14.976c-5.89 0-11.01-.939-15.36-2.816-4.36-1.877-7.77-4.48-10.24-7.808-2.48-3.328-3.89-7.083-4.23-11.264h17.15a12.998 12.998 0 002.18 4.48c1.02 1.28 2.39 2.304 4.1 3.072 1.7.768 3.75 1.152 6.14 1.152 2.3 0 4.18-.299 5.63-.896 1.45-.683 2.52-1.579 3.2-2.688.77-1.109 1.15-2.261 1.15-3.456 0-1.792-.51-3.157-1.53-4.096-1.03-1.024-2.52-1.835-4.48-2.432-1.96-.597-4.35-1.195-7.17-1.792-3.07-.597-6.1-1.323-9.09-2.176-2.9-.939-5.5-2.091-7.81-3.456-2.3-1.365-4.13-3.115-5.5-5.248s-2.05-4.779-2.05-7.936c0-3.84 1.03-7.253 3.07-10.24 2.05-3.072 5.04-5.504 8.96-7.296 3.93-1.792 8.67-2.688 14.21-2.688 7.77 0 13.91 1.75 18.43 5.248 4.53 3.499 7.21 8.32 8.07 14.464h-16.26c-.51-1.963-1.66-3.499-3.45-4.608-1.71-1.195-4.01-1.792-6.92-1.792-3.07 0-5.41.555-7.04 1.664-1.62 1.11-2.43 2.56-2.43 4.352 0 1.195.51 2.261 1.54 3.2 1.11.939 2.64 1.749 4.61 2.432 1.96.597 4.35 1.195 7.16 1.792 4.95 1.024 9.31 2.219 13.06 3.584 3.75 1.28 6.7 3.157 8.83 5.632 2.14 2.389 3.2 5.888 3.2 10.496 0 4.096-1.11 7.765-3.33 11.008-2.21 3.157-5.37 5.632-9.47 7.424-4.01 1.792-8.79 2.688-14.33 2.688zM820.816 290v-48.384h3.84l.48 9.216c1.536-3.392 3.648-5.952 6.336-7.68 2.752-1.792 5.92-2.688 9.504-2.688 2.176 0 4.256.352 6.24 1.056 2.048.704 3.84 1.888 5.376 3.552 1.6 1.664 2.816 3.936 3.648 6.816 1.216-3.328 3.2-6.048 5.952-8.16 2.816-2.176 6.208-3.264 10.176-3.264 3.584 0 6.688.736 9.312 2.208 2.624 1.408 4.672 3.616 6.144 6.624 1.472 3.008 2.208 6.912 2.208 11.712V290h-4.32v-28.704c0-5.824-1.152-10.08-3.456-12.768-2.304-2.752-5.664-4.128-10.08-4.128-2.688 0-5.152.672-7.392 2.016-2.24 1.344-4.032 3.328-5.376 5.952-1.28 2.624-1.92 5.92-1.92 9.888V290h-4.32v-28.992c0-5.696-1.12-9.888-3.36-12.576-2.176-2.688-5.248-4.032-9.216-4.032-3.072 0-5.76.768-8.064 2.304-2.304 1.536-4.128 3.776-5.472 6.72-1.28 2.944-1.92 6.624-1.92 11.04V290h-4.32zm96.342 1.152c-3.648 0-6.72-.704-9.216-2.112-2.496-1.408-4.384-3.232-5.664-5.472a14.984 14.984 0 01-1.92-7.392c0-3.52.8-6.4 2.4-8.64 1.6-2.24 3.84-3.904 6.72-4.992 2.944-1.152 6.336-1.728 10.176-1.728h14.592c0-3.456-.512-6.4-1.536-8.832-.96-2.432-2.464-4.32-4.512-5.664-2.048-1.344-4.736-2.016-8.064-2.016-3.904 0-7.136.928-9.696 2.784-2.496 1.856-4.096 4.672-4.8 8.448h-4.416c.448-3.392 1.568-6.176 3.36-8.352a17.01 17.01 0 016.816-4.992c2.688-1.152 5.6-1.728 8.736-1.728 4.416 0 7.968.896 10.656 2.688 2.688 1.728 4.64 4.096 5.856 7.104 1.28 2.944 1.92 6.304 1.92 10.08V290h-3.84l-.48-9.696c-.512 1.024-1.216 2.176-2.112 3.456-.896 1.28-2.016 2.464-3.36 3.552-1.344 1.088-2.976 1.984-4.896 2.688-1.856.768-4.096 1.152-6.72 1.152zm.48-3.936c2.752 0 5.152-.512 7.2-1.536 2.048-1.088 3.776-2.496 5.184-4.224 1.408-1.792 2.464-3.712 3.168-5.76.704-2.048 1.056-4.064 1.056-6.048v-5.088h-14.304c-3.776 0-6.752.512-8.928 1.536-2.176.96-3.744 2.304-4.704 4.032-.896 1.728-1.344 3.712-1.344 5.952 0 2.048.48 3.936 1.44 5.664.96 1.664 2.4 3.008 4.32 4.032 1.92.96 4.224 1.44 6.912 1.44zM979.449 290l-24.864-26.496 22.944-21.888h5.664l-24.48 23.232v-2.688L985.305 290h-5.856zm-28.32 0v-69.12h4.32V290h-4.32zm59.621 1.152c-4.54 0-8.48-1.056-11.807-3.168-3.264-2.112-5.792-5.088-7.584-8.928-1.792-3.84-2.688-8.352-2.688-13.536 0-5.248.928-9.728 2.784-13.44 1.92-3.712 4.544-6.56 7.872-8.544 3.393-2.048 7.263-3.072 11.613-3.072 4.67 0 8.58 1.056 11.71 3.168 3.14 2.048 5.51 4.768 7.11 8.16 1.6 3.392 2.4 7.104 2.4 11.136v1.824c0 .576-.03 1.248-.1 2.016h-40.317v-3.744h36.187c-.06-6.208-1.69-10.88-4.89-14.016-3.2-3.136-7.3-4.704-12.29-4.704-3.07 0-5.95.704-8.64 2.112-2.687 1.408-4.895 3.584-6.623 6.528-1.664 2.944-2.496 6.688-2.496 11.232v1.728c0 4.864.832 8.896 2.496 12.096 1.664 3.136 3.84 5.472 6.523 7.008 2.69 1.536 5.6 2.304 8.74 2.304 4.03 0 7.36-.928 9.98-2.784 2.63-1.92 4.55-4.608 5.76-8.064h4.32c-.83 2.816-2.14 5.344-3.93 7.584-1.73 2.24-3.94 4-6.63 5.28-2.68 1.216-5.85 1.824-9.5 1.824zM1043 290v-69.12h4.32V290H1043zm32.41 1.152c-3.65 0-6.72-.704-9.22-2.112-2.49-1.408-4.38-3.232-5.66-5.472a14.984 14.984 0 01-1.92-7.392c0-3.52.8-6.4 2.4-8.64 1.6-2.24 3.84-3.904 6.72-4.992 2.94-1.152 6.33-1.728 10.17-1.728h14.6c0-3.456-.52-6.4-1.54-8.832-.96-2.432-2.46-4.32-4.51-5.664-2.05-1.344-4.74-2.016-8.07-2.016-3.9 0-7.13.928-9.69 2.784-2.5 1.856-4.1 4.672-4.8 8.448h-4.42c.45-3.392 1.57-6.176 3.36-8.352a17.037 17.037 0 016.82-4.992c2.69-1.152 5.6-1.728 8.73-1.728 4.42 0 7.97.896 10.66 2.688 2.69 1.728 4.64 4.096 5.86 7.104 1.28 2.944 1.92 6.304 1.92 10.08V290h-3.84l-.48-9.696c-.52 1.024-1.22 2.176-2.12 3.456-.89 1.28-2.01 2.464-3.36 3.552-1.34 1.088-2.97 1.984-4.89 2.688-1.86.768-4.1 1.152-6.72 1.152zm.48-3.936c2.75 0 5.15-.512 7.2-1.536 2.05-1.088 3.77-2.496 5.18-4.224 1.41-1.792 2.47-3.712 3.17-5.76.7-2.048 1.06-4.064 1.06-6.048v-5.088h-14.31c-3.77 0-6.75.512-8.93 1.536-2.17.96-3.74 2.304-4.7 4.032-.9 1.728-1.34 3.712-1.34 5.952 0 2.048.48 3.936 1.44 5.664.96 1.664 2.4 3.008 4.32 4.032 1.92.96 4.22 1.44 6.91 1.44zm48.08 3.936c-3.65 0-6.72-.704-9.22-2.112-2.49-1.408-4.38-3.232-5.66-5.472a14.984 14.984 0 01-1.92-7.392c0-3.52.8-6.4 2.4-8.64 1.6-2.24 3.84-3.904 6.72-4.992 2.94-1.152 6.34-1.728 10.18-1.728h14.59c0-3.456-.51-6.4-1.54-8.832-.96-2.432-2.46-4.32-4.51-5.664-2.05-1.344-4.74-2.016-8.06-2.016-3.91 0-7.14.928-9.7 2.784-2.5 1.856-4.1 4.672-4.8 8.448h-4.42c.45-3.392 1.57-6.176 3.36-8.352a17.037 17.037 0 016.82-4.992c2.69-1.152 5.6-1.728 8.74-1.728 4.41 0 7.96.896 10.65 2.688 2.69 1.728 4.64 4.096 5.86 7.104 1.28 2.944 1.92 6.304 1.92 10.08V290h-3.84l-.48-9.696c-.51 1.024-1.22 2.176-2.11 3.456-.9 1.28-2.02 2.464-3.36 3.552-1.35 1.088-2.98 1.984-4.9 2.688-1.86.768-4.1 1.152-6.72 1.152zm.48-3.936c2.75 0 5.15-.512 7.2-1.536 2.05-1.088 3.78-2.496 5.18-4.224 1.41-1.792 2.47-3.712 3.17-5.76.71-2.048 1.06-4.064 1.06-6.048v-5.088h-14.31c-3.77 0-6.75.512-8.92 1.536-2.18.96-3.75 2.304-4.71 4.032-.89 1.728-1.34 3.712-1.34 5.952 0 2.048.48 3.936 1.44 5.664.96 1.664 2.4 3.008 4.32 4.032 1.92.96 4.22 1.44 6.91 1.44zm33.49 2.784v-48.384h3.84l.48 9.792c1.09-2.56 2.5-4.64 4.23-6.24 1.79-1.6 3.9-2.784 6.33-3.552 2.43-.768 5.19-1.152 8.26-1.152v4.416h-1.73c-1.92 0-3.9.256-5.95.768-1.99.512-3.84 1.44-5.57 2.784-1.66 1.28-3.01 3.136-4.03 5.568-1.03 2.432-1.54 5.536-1.54 9.312V290h-4.32zm50.45 1.152c-4.67 0-8.73-1.088-12.19-3.264-3.39-2.24-6.01-5.248-7.87-9.024-1.86-3.84-2.78-8.192-2.78-13.056 0-4.864.92-9.184 2.78-12.96 1.86-3.84 4.51-6.848 7.97-9.024 3.45-2.24 7.52-3.36 12.19-3.36s8.67 1.216 12 3.648c3.39 2.368 5.86 5.632 7.39 9.792V220.88h4.32V290h-3.84l-.57-11.904c-.96 2.432-2.37 4.64-4.23 6.624-1.79 1.92-3.97 3.488-6.53 4.704-2.56 1.152-5.44 1.728-8.64 1.728zm.29-3.936c3.65 0 6.88-.896 9.7-2.688 2.81-1.856 4.99-4.384 6.53-7.584 1.6-3.264 2.4-6.976 2.4-11.136 0-4.224-.8-7.936-2.4-11.136-1.54-3.264-3.72-5.792-6.53-7.584-2.75-1.792-5.99-2.688-9.7-2.688-3.58 0-6.81.864-9.69 2.592-2.82 1.728-5.03 4.224-6.63 7.488-1.6 3.2-2.4 6.976-2.4 11.328 0 4.352.8 8.128 2.4 11.328 1.67 3.2 3.91 5.696 6.72 7.488 2.82 1.728 6.02 2.592 9.6 2.592zm37.77 2.784v-48.384h4.32V290h-4.32zm2.21-61.152c-.89 0-1.69-.32-2.4-.96a3.588 3.588 0 01-.96-2.496c0-.96.32-1.728.96-2.304.71-.64 1.51-.96 2.4-.96.9 0 1.67.32 2.31.96.7.576 1.05 1.344 1.05 2.304 0 .96-.35 1.792-1.05 2.496-.64.64-1.41.96-2.31.96zm6.94 82.272v-3.84h3.64c2.76 0 4.68-.576 5.76-1.728 1.16-1.152 1.73-3.072 1.73-5.76v-58.176h4.32v58.656c0 2.368-.38 4.352-1.15 5.952-.77 1.6-1.98 2.816-3.65 3.648-1.6.832-3.71 1.248-6.33 1.248h-4.32zm13.34-82.272c-.96 0-1.76-.32-2.4-.96a3.588 3.588 0 01-.96-2.496c0-.96.32-1.728.96-2.304.64-.64 1.41-.96 2.3-.96.96 0 1.76.32 2.4.96.64.576.96 1.344.96 2.304 0 .96-.32 1.792-.96 2.496-.64.64-1.4.96-2.3.96zM867.816 386v-48.384h3.84l.48 9.216c1.536-3.392 3.648-5.952 6.336-7.68 2.752-1.792 5.92-2.688 9.504-2.688 2.176 0 4.256.352 6.24 1.056 2.048.704 3.84 1.888 5.376 3.552 1.6 1.664 2.816 3.936 3.648 6.816 1.216-3.328 3.2-6.048 5.952-8.16 2.816-2.176 6.208-3.264 10.176-3.264 3.584 0 6.688.736 9.312 2.208 2.624 1.408 4.672 3.616 6.144 6.624 1.472 3.008 2.208 6.912 2.208 11.712V386h-4.32v-28.704c0-5.824-1.152-10.08-3.456-12.768-2.304-2.752-5.664-4.128-10.08-4.128-2.688 0-5.152.672-7.392 2.016-2.24 1.344-4.032 3.328-5.376 5.952-1.28 2.624-1.92 5.92-1.92 9.888V386h-4.32v-28.992c0-5.696-1.12-9.888-3.36-12.576-2.176-2.688-5.248-4.032-9.216-4.032-3.072 0-5.76.768-8.064 2.304-2.304 1.536-4.128 3.776-5.472 6.72-1.28 2.944-1.92 6.624-1.92 11.04V386h-4.32zm101.622 1.152c-4.544 0-8.48-1.056-11.808-3.168-3.264-2.112-5.792-5.088-7.584-8.928-1.792-3.84-2.688-8.352-2.688-13.536 0-5.248.928-9.728 2.784-13.44 1.92-3.712 4.544-6.56 7.872-8.544 3.392-2.048 7.264-3.072 11.616-3.072 4.672 0 8.576 1.056 11.712 3.168 3.136 2.048 5.504 4.768 7.104 8.16 1.6 3.392 2.4 7.104 2.4 11.136v1.824c0 .576-.032 1.248-.096 2.016h-40.32v-3.744h36.192c-.064-6.208-1.696-10.88-4.896-14.016-3.2-3.136-7.296-4.704-12.288-4.704-3.072 0-5.952.704-8.64 2.112-2.688 1.408-4.896 3.584-6.624 6.528-1.664 2.944-2.496 6.688-2.496 11.232v1.728c0 4.864.832 8.896 2.496 12.096 1.664 3.136 3.84 5.472 6.528 7.008 2.688 1.536 5.6 2.304 8.736 2.304 4.032 0 7.36-.928 9.984-2.784 2.624-1.92 4.544-4.608 5.76-8.064h4.32c-.832 2.816-2.144 5.344-3.936 7.584-1.728 2.24-3.936 4-6.624 5.28-2.688 1.216-5.856 1.824-9.504 1.824zm52.892 0c-4.67 0-8.73-1.088-12.19-3.264-3.39-2.24-6.02-5.248-7.87-9.024-1.86-3.84-2.787-8.192-2.787-13.056 0-4.864.927-9.184 2.787-12.96 1.85-3.84 4.51-6.848 7.97-9.024 3.45-2.24 7.52-3.36 12.19-3.36s8.67 1.216 12 3.648c3.39 2.368 5.85 5.632 7.39 9.792V316.88h4.32V386h-3.84l-.58-11.904c-.96 2.432-2.36 4.64-4.22 6.624-1.79 1.92-3.97 3.488-6.53 4.704-2.56 1.152-5.44 1.728-8.64 1.728zm.29-3.936c3.65 0 6.88-.896 9.7-2.688 2.81-1.856 4.99-4.384 6.52-7.584 1.6-3.264 2.4-6.976 2.4-11.136 0-4.224-.8-7.936-2.4-11.136-1.53-3.264-3.71-5.792-6.52-7.584-2.76-1.792-5.99-2.688-9.7-2.688-3.58 0-6.82.864-9.7 2.592-2.81 1.728-5.02 4.224-6.62 7.488-1.6 3.2-2.4 6.976-2.4 11.328 0 4.352.8 8.128 2.4 11.328 1.66 3.2 3.9 5.696 6.72 7.488 2.82 1.728 6.02 2.592 9.6 2.592zm37.77 2.784v-48.384h4.32V386h-4.32zm2.21-61.152c-.9 0-1.7-.32-2.4-.96a3.588 3.588 0 01-.96-2.496c0-.96.32-1.728.96-2.304.7-.64 1.5-.96 2.4-.96.9 0 1.66.32 2.3.96.71.576 1.06 1.344 1.06 2.304 0 .96-.35 1.792-1.06 2.496-.64.64-1.4.96-2.3.96zm30.93 62.304c-3.64 0-6.72-.704-9.21-2.112-2.5-1.408-4.39-3.232-5.67-5.472a14.984 14.984 0 01-1.92-7.392c0-3.52.8-6.4 2.4-8.64 1.6-2.24 3.84-3.904 6.72-4.992 2.95-1.152 6.34-1.728 10.18-1.728h14.59c0-3.456-.51-6.4-1.53-8.832-.96-2.432-2.47-4.32-4.52-5.664-2.04-1.344-4.73-2.016-8.06-2.016-3.9 0-7.14.928-9.7 2.784-2.49 1.856-4.09 4.672-4.8 8.448h-4.41c.45-3.392 1.57-6.176 3.36-8.352a17.005 17.005 0 016.81-4.992c2.69-1.152 5.6-1.728 8.74-1.728 4.42 0 7.97.896 10.66 2.688 2.68 1.728 4.64 4.096 5.85 7.104 1.28 2.944 1.92 6.304 1.92 10.08V386h-3.84l-.48-9.696c-.51 1.024-1.21 2.176-2.11 3.456-.9 1.28-2.02 2.464-3.36 3.552-1.34 1.088-2.98 1.984-4.9 2.688-1.85.768-4.09 1.152-6.72 1.152zm.48-3.936c2.76 0 5.16-.512 7.2-1.536 2.05-1.088 3.78-2.496 5.19-4.224a19.694 19.694 0 003.17-5.76c.7-2.048 1.05-4.064 1.05-6.048v-5.088h-14.3c-3.78 0-6.75.512-8.93 1.536-2.18.96-3.74 2.304-4.7 4.032-.9 1.728-1.35 3.712-1.35 5.952 0 2.048.48 3.936 1.44 5.664.96 1.664 2.4 3.008 4.32 4.032 1.92.96 4.23 1.44 6.91 1.44zm48.51 2.784c-2.56 0-4.73-.384-6.52-1.152-1.73-.768-3.08-2.08-4.04-3.936-.89-1.92-1.34-4.48-1.34-7.68V341.36h-8.45v-3.744h8.45l.67-10.56h3.65v10.56h15.17v3.744h-15.17v31.776c0 3.392.67 5.76 2.02 7.104 1.34 1.344 3.61 2.016 6.81 2.016h5.38V386h-6.63zm18.47 0v-48.384h4.32V386h-4.32zm2.2-61.152c-.89 0-1.69-.32-2.4-.96a3.588 3.588 0 01-.96-2.496c0-.96.32-1.728.96-2.304.71-.64 1.51-.96 2.4-.96.9 0 1.67.32 2.31.96.7.576 1.05 1.344 1.05 2.304 0 .96-.35 1.792-1.05 2.496-.64.64-1.41.96-2.31.96zm37.27 62.304c-4.41 0-8.38-1.024-11.9-3.072-3.46-2.048-6.21-4.96-8.26-8.736-1.98-3.84-2.97-8.32-2.97-13.44 0-5.312 1.02-9.856 3.07-13.632s4.83-6.688 8.35-8.736c3.52-2.048 7.49-3.072 11.9-3.072 4.48 0 8.45 1.024 11.91 3.072 3.52 2.048 6.27 4.96 8.25 8.736 2.05 3.776 3.08 8.32 3.08 13.632 0 5.12-1.03 9.6-3.08 13.44-2.04 3.776-4.83 6.688-8.35 8.736-3.52 2.048-7.52 3.072-12 3.072zm0-3.84c3.33 0 6.4-.8 9.22-2.4 2.88-1.6 5.21-4 7.01-7.2 1.79-3.2 2.68-7.168 2.68-11.904s-.89-8.704-2.68-11.904c-1.73-3.2-4.04-5.568-6.92-7.104-2.81-1.6-5.85-2.4-9.12-2.4-3.26 0-6.33.8-9.21 2.4-2.88 1.6-5.22 4-7.01 7.2-1.73 3.136-2.59 7.072-2.59 11.808s.86 8.704 2.59 11.904c1.79 3.2 4.1 5.6 6.91 7.2 2.82 1.6 5.86 2.4 9.12 2.4zm34.86 2.688v-48.384h3.84l.38 9.792c1.66-3.648 3.97-6.368 6.91-8.16 3.01-1.856 6.34-2.784 9.99-2.784 3.52 0 6.62.704 9.31 2.112 2.69 1.408 4.8 3.584 6.33 6.528 1.54 2.88 2.31 6.624 2.31 11.232V386h-4.32v-28.992c0-5.696-1.22-9.888-3.65-12.576-2.43-2.688-5.95-4.032-10.56-4.032-3.07 0-5.86.768-8.35 2.304-2.43 1.472-4.35 3.648-5.76 6.528-1.41 2.88-2.11 6.432-2.11 10.656V386h-4.32zM786.928 389l-48.64-49.28c-4.011-3.925-6.869-7.509-8.576-10.752-1.621-3.243-2.432-6.741-2.432-10.496 0-3.925.939-7.424 2.816-10.496 1.963-3.157 4.736-5.632 8.32-7.424 3.669-1.792 8.021-2.688 13.056-2.688 5.035 0 9.301.939 12.8 2.816 3.584 1.792 6.315 4.267 8.192 7.424 1.963 3.157 2.901 6.741 2.816 10.752h-12.544c0-3.584-1.109-6.272-3.328-8.064-2.219-1.877-4.864-2.816-7.936-2.816-3.669 0-6.571.981-8.704 2.944-2.048 1.877-3.072 4.352-3.072 7.424 0 2.475.725 4.992 2.176 7.552 1.451 2.475 3.627 5.248 6.528 8.32L802.672 389h-15.744zm-40.704 1.536c-6.144 0-11.563-1.109-16.256-3.328-4.693-2.304-8.32-5.504-10.88-9.6-2.56-4.181-3.84-9.003-3.84-14.464 0-4.352.896-8.32 2.688-11.904 1.792-3.669 4.437-6.869 7.936-9.6 3.499-2.816 7.808-5.077 12.928-6.784l4.864-1.664 6.272 8.192-5.248 1.792c-5.717 1.963-9.941 4.565-12.672 7.808-2.731 3.243-4.096 7.083-4.096 11.52 0 3.243.768 6.187 2.304 8.832 1.621 2.645 3.84 4.693 6.656 6.144 2.816 1.451 6.101 2.176 9.856 2.176 4.864 0 9.216-1.024 13.056-3.072 3.84-2.133 7.637-5.589 11.392-10.368 1.707-2.219 3.456-4.736 5.248-7.552 1.792-2.816 3.669-6.016 5.632-9.6l3.584-6.528h13.312l-5.376 9.856c-2.219 4.352-4.48 8.32-6.784 11.904-2.219 3.499-4.48 6.613-6.784 9.344-4.864 5.973-10.027 10.283-15.488 12.928-5.376 2.645-11.477 3.968-18.304 3.968z"
                fill="#fff"
              />
            </svg>
          </div>

          {/* Hero content and CTA */}
          <div className="max-w-xl z-10">
            <h1 className="mb-5 font-thin text-mocha-50 text-5xl tracking-wider">
              We zien uit naar
              <br /> een succesvolle samenwerking!
            </h1>
            <Link className="btn btn-secondary" to="/huizen">
              Bekijk ons huizen aanbod
              <ArrowIcon />
            </Link>
          </div>
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 min-h-[calc(100vh_-_100px)]"></div>
      </div>

      {/* Vastgoed Mediation section */}
      <ContentSection
        imageUrl="/IMG_2283.JPG"
        title="Waarom kiezen voor"
        boldTitle="Joost van Os Vastgoed Mediation?"
        linkText="Lees meer over Vastgoed Mediation"
        linkUrl="/vastgoed-mediation"
      >
        <p>
          Wij begrijpen dat er in zowel persoonlijke als zakelijke relaties
          conflicten kunnen ontstaan. Het is onze missie om u te helpen deze
          conflicten op een <span className="font-bold">constructieve</span> en{" "}
          <span className="font-bold">effectieve</span> manier op te lossen.
        </p>
      </ContentSection>

      <hr />

      {/* Makelaardij section */}
      <ContentSection
        imageUrl="/IMG_2279.JPG"
        imagePosition="left"
        title="Waarom kiezen voor"
        boldTitle="Joost van Os Makelaardij?"
        linkText="Lees meer over Makelaardij"
        linkUrl="/makelaardij"
      >
        Met ruim 25 jaar ervaring in de makelaardij en 850+ geslaagde
        transacties zijn wij deskundig en hebben uitgebreide kennis van de
        lokale vastgoedmarkt.
      </ContentSection>

      <hr />

      {/* Mediation section */}
      <ContentSection
        imageUrl="/mediator.jpg"
        title="Waarom kiezen voor"
        boldTitle="Joost van Os Mediation?"
        linkText="Lees meer over Mediation"
        linkUrl="/mediation"
      >
        <p>
          Met onze professionele begeleiding creëren we een onpartijdige en{" "}
          <span className="font-bold">veilige omgeving</span> waarin alle
          betrokken partijen hun zorgen en wensen kunnen uiten om zo meer{" "}
          <span className="font-bold">begrip </span> voor elkaars standpunten te
          krijgen en daarmee tot een{" "}
          <span className="font-bold">duurzame oplossing</span> te kunnen komen.
        </p>
      </ContentSection>

      {/* Footer component */}
      <JvoFooter />
    </>
  );
}
