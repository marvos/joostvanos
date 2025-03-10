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
export function meta({ data }: Route.MetaArgs) {
  // Check if loaderData exists and has the huis property
  if (!data || !data.huis) {
    return [
      { title: "Woning details - Joost van Os Makelaardij" },
      {
        name: "description",
        content: "Details van deze woning worden geladen.",
      },
    ];
  }

  const { huis } = data;

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
 * Social media sharing component with hover color effects
 * @param props.url - URL to share
 * @param props.title - Title of the content to share
 * @param props.image - Image URL to include in social shares
 */
const SocialShareBar = ({
  url,
  title,
  image,
}: {
  url: string;
  title: string;
  image?: string;
}) => {
  // Encode share parameters
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = image ? encodeURIComponent(image) : "";

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start my-4 p-3 bg-gray-50 rounded-md">
      <span className="text-sm font-semibold flex items-center mr-2">
        Deel deze woning:
      </span>

      {/* Facebook - only colored on hover */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors duration-200"
        aria-label="Deel op Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
        </svg>
      </a>

      {/* Twitter/X - only colored on hover */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-black hover:text-white transition-colors duration-200"
        aria-label="Deel op Twitter/X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn - only colored on hover */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#0077b5] hover:text-white transition-colors duration-200"
        aria-label="Deel op LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* WhatsApp - only colored on hover */}
      <a
        href={`https://wa.me/?text=${encodedTitle} ${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#25D366] hover:text-white transition-colors duration-200"
        aria-label="Deel via WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Email - only colored on hover */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-gray-500 hover:text-white transition-colors duration-200"
        aria-label="Deel via Email"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>

      {/* Copy Link Button - only colored on hover */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          // You could add a toast notification here
          alert("Link gekopieerd!");
        }}
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        aria-label="Kopieer link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 11h8v2H8zm12.1-4.2C18.2 4.9 15.7 4 13 4H9c-3.6 0-6 2.6-6 7s2.4 7 6 7h4c2.7 0 5.2-.9 7.1-2.8l-1.4-1.4C17.2 15.2 15.2 16 13 16H9c-2.4 0-4-1.6-4-5s1.6-5 4-5h4c2.2 0 4.2.8 5.8 2.2l1.3-1.4z" />
        </svg>
      </button>
    </div>
  );
};
/**
 * Floating Social media sharing component with hover color effects
 * @param props.url - URL to share
 * @param props.title - Title of the content to share
 * @param props.image - Image URL to include in social shares
 */
const FloatingSocialShareBar = ({
  url,
  title,
  image,
}: {
  url: string;
  title: string;
  image?: string;
}) => {
  // Encode share parameters
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedImage = image ? encodeURIComponent(image) : "";

  return (
    <div className="hidden lg:flex absolute right-[-80px] top-0 flex-col gap-2 z-20 ml-2 bg-mocha-50 items-center p-2 rounded-md shadow-md">
      {/* Share label */}
      <div className=" px-2 py-1  text-xs font-semibold text-center">Delen</div>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Deel op Facebook"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" />
        </svg>
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-black hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Deel op Twitter/X"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#0077b5] hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Deel op LinkedIn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle} ${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-[#25D366] hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Deel via WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-gray-500 hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Deel via Email"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      </a>

      {/* Copy Link Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert("Link gekopieerd!");
        }}
        className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200 shadow-md"
        aria-label="Kopieer link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 11h8v2H8zm12.1-4.2C18.2 4.9 15.7 4 13 4H9c-3.6 0-6 2.6-6 7s2.4 7 6 7h4c2.7 0 5.2-.9 7.1-2.8l-1.4-1.4C17.2 15.2 15.2 16 13 16H9c-2.4 0-4-1.6-4-5s1.6-5 4-5h4c2.2 0 4.2.8 5.8 2.2l1.3-1.4z" />
        </svg>
      </button>
    </div>
  );
};

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
        return "badge-neutral text-black";
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
  // Create share URL for the current property
  const shareUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  }, []);

  // Create share title for the current property
  const shareTitle = useMemo(() => {
    if (!huis) return "";
    return `${huis.adres.straat} ${huis.adres.huisnummer.hoofdnummer}${
      huis.adres.huisnummer.toevoeging
        ? `-${huis.adres.huisnummer.toevoeging}`
        : ""
    }, ${huis.adres.plaats} | ${formattedPrice}`;
  }, [huis, formattedPrice]);
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
      <div className="container max-w-4xl my-2 relative">
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
      <div className="container max-w-2xl flex flex-col gap-6 pb-20 px-5 lg:px-16 py-8 bg-white shadow-lg rounded-md mt-4 relative">
        <FloatingSocialShareBar
          url={shareUrl}
          title={shareTitle}
          image={mainImage?.link ? `${mainImage.link}&resize=4` : undefined}
        />
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

        {/* Social Media Share Bar - Only shown on mobile */}
        <div className="lg:hidden">
          <SocialShareBar
            url={shareUrl}
            title={shareTitle}
            image={mainImage?.link ? `${mainImage.link}&resize=4` : undefined}
          />
        </div>

        {/* Property description */}
        <div className="relative">
          {/* Floating vertical social share bar - visible on desktop only */}

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
        {overdrachtStatus === "beschikbaar" && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Interesse?</h3>
            <p>
              Neem contact op voor meer informatie of voor het maken van een
              bezichtigingsafspraak.
            </p>
            <a href="tel:+31622691573" className="btn btn-primary mt-4">
              Bel: 0622 691573
            </a>
          </div>
        )}
      </div>
    </>
  );
}
