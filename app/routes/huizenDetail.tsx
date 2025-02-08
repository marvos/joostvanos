import { useFetch } from "~/utils/useFetch";
import type { Detail, Objecten, Resultaten } from "~/utils/object-types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Autoplay, Navigation } from "swiper/modules";
import swiper from "swiper/css?url";
import swipergrid from "swiper/css/grid?url";
import swiperpagination from "swiper/css/pagination?url";
import styles from "yet-another-react-lightbox/styles.css?url";
import thumbs from "yet-another-react-lightbox/plugins/thumbnails.css?url";

import type { Route } from "./+types/huizenDetail";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { useState } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: swiper },
  { rel: "stylesheet", href: swipergrid },
  { rel: "stylesheet", href: swiperpagination },
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: thumbs },
];

export async function loader({ request, context, params }: Route.LoaderArgs) {
  const objecten: Objecten = await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "GET",
  });
  const huis = objecten?.resultaten.find(
    (obj) => obj.diversen.diversen.objectcode === params.objectcode
  );
  return { huis };
}
// export async function clientLoader({ params }: Route.LoaderArgs) {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append(
//     "Authorization",
//     "rwauth 9d24c72c-38e6-4715-acef-45fa273c5e9c"
//   );
//
//   return fetch(
//     `https://api.realworks.nl/wonen/v3/objecten/12070/${params.objectcode}`,
//     {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     }
//   ).then((response) => response.json());
//   // .then((result) => console.log(result))
//   // .catch((error) => console.error(error));
// }
// clientLoader.hydrate = true;
// export function HydrateFallback() {
//   return <p>Laden van huis ...</p>;
// }

// export function meta({ loaderData }: Route.ComponentProps) {
//   const { huis } = loaderData;
//   return [
//     { title: "Joost van Os Makelaardij & Mediation" },
//     {
//       name: "description",
//       content: `${huis?.adres.straat} ${huis?.adres.huisnummer.hoofdnummer}`,
//     },
//   ];
// }

export default function Huizen({ loaderData }: Route.ComponentProps) {
  // const huis: Resultaten = useLoaderData<typeof clientLoader>();
  const { huis } = loaderData;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const overdrachtStatus = huis?.financieel?.overdracht?.status
    ?.toLowerCase()
    ?.replace(/[^a-zA-Z0-9 ]/g, " ");
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: `url(${huis?.media[0].link}&resize=4)`,
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-20"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end flex-col">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[30vh] backdrop-blur bg-black/40 backdrop-opacity-95 ">
              {huis?.adres.straat} {huis?.adres.huisnummer.hoofdnummer}
            </h1>
            <span className="text-sm font-medium backdrop-blur bg-black/40 backdrop-opacity-95 p-3">
              {huis?.adres.postcode} {huis?.adres.plaats}
            </span>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl  my-2">
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
        >
          {huis?.media?.map((media, imageIndex) => {
            return (
              <SwiperSlide>
                <figure>
                  <img
                    src={`${media.link}`}
                    onClick={() => setIndex(imageIndex)}
                    className="w-full object-cover h-[95px] cursor-zoom-in"
                  />
                </figure>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        plugins={[Thumbnails]}
        close={() => setIndex(-1)}
        slides={huis?.media?.map((media) => {
          return { src: `${media.link}&resize=4` };
        })}
      />
      {/*<div className="grid grid-cols-3 lg:grid-cols-5 gap-2 my-2">*/}
      {/*  {huis?.media?.map((media, imageIndex) => {*/}
      {/*    if (index > 4) return;*/}
      {/*    return (*/}
      {/*      <figure>*/}
      {/*        <img*/}
      {/*          src={`${media.link}`}*/}
      {/*          // className="w-full object-cover h-[50px]"*/}
      {/*          onClick={() => setIndex(imageIndex)}*/}
      {/*        />*/}
      {/*      </figure>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      <div className="container max-w-2xl flex flex-col gap-6 pb-20 px-5 lg:px-16 py-8 bg-white">
        <h2 className="flex-col gap-0 items-start">
          {huis?.adres.straat} {huis?.adres.huisnummer.hoofdnummer}
          <div className="text-sm font-normal">
            {huis?.adres.postcode} {huis?.adres.plaats}
          </div>
        </h2>
        <h2 className="card-title">
          {new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: "EUR",
          })
            .format(huis?.financieel?.overdracht?.koopprijs as number)
            .slice(0, -3)}

          <div
            className={`badge whitespace-nowrap ${
              overdrachtStatus === "beschikbaar"
                ? " badge-success"
                : overdrachtStatus === "verkocht"
                ? "badge-neutral"
                : overdrachtStatus === "verkocht onder voorbehoud"
                ? "badge-warning"
                : ""
            }`}
          >
            {overdrachtStatus}
          </div>
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 text-xs">
            <img src="/icons/oppervlakte.svg" />
            {huis?.algemeen.woonoppervlakte}m2
          </div>
          {huis?.detail.kadaster[0].kadastergegevens.oppervlakte && (
            <div className="flex gap-1 text-xs">
              <img src="/icons/perceel.svg" />
              {huis?.detail.kadaster[0].kadastergegevens.oppervlakte}
              m2 perceel
            </div>
          )}
          {huis?.algemeen.aantalKamers && (
            <div className="flex gap-1 text-xs">
              <img src="/icons/house-room.svg" />
              {huis?.algemeen.aantalKamers} kamers
            </div>
          )}
          {huis?.algemeen.energieklasse && (
            <div className="flex gap-1 text-xs">
              <img src="/icons/energy.svg" />
              {huis?.algemeen.energieklasse}
            </div>
          )}
          {/*<div className="badge badge-outline capitalize">*/}
          {/*  {huis?.algemeen.woonhuistype*/}
          {/*    ?.toLowerCase()*/}
          {/*    ?.replace(/[^a-zA-Z0-9 ]/g, " ")}*/}
          {/*</div>*/}

          {/*<div className="badge"> bouwjaar {huis?.algemeen.bouwjaar}</div>*/}
        </div>
        <p className="whitespace-pre-wrap">{huis?.teksten.aanbiedingstekst}</p>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 ">
          {huis?.media?.map((media, imageIndex) => {
            return (
              <figure>
                <img
                  src={`${media.link}`}
                  className="cursor-zoom-in"
                  onClick={() => setIndex(imageIndex)}
                  // className="w-full object-cover h-[50px]"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </>
  );
}
