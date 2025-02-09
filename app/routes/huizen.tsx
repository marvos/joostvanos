import { useFetch } from "~/utils/useFetch";
import type { Objecten, Resultaten } from "~/utils/object-types";
import { Link } from "react-router";

import type { Route } from "./+types/huizen";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const objecten: Objecten = await useFetch({
    request,
    context,
    url: `${context.cloudflare.env.API_JOOST}/kv/values/huizen`,
    method: "GET",
  });
  return { resultaten: objecten?.resultaten };
}

export default function Huizen({ loaderData }: Route.ComponentProps) {
  const { resultaten } = loaderData;
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/interiors.webp)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">Huizen</h1>
            <p className="mb-5 ">Bekijk ons aanbod</p>
            {/*<button className="btn btn-primary">Get Started</button>*/}
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-6 pb-20 px-5 py-14">
        <div className="grid lg:grid-cols-2 gap-7 m-auto items-center justify-center">
          {resultaten?.map((huis: Resultaten) => {
            const overdrachtStatus = huis.financieel.overdracht.status
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9 ]/g, " ");
            const huisUrl = `/huizen/detail/${huis.adres.plaats
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9 ]/g, "")}/${huis.adres.straat
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              .replace(/\s+/g, "-")}${huis.adres.huisnummer.hoofdnummer
              ?.toLowerCase()
              ?.replace(/[^a-zA-Z0-9 ]/g, "")
              .replace(/\s+/g, "-")}${
              huis.adres.huisnummer.toevoeging
                ? huis.adres.huisnummer.toevoeging
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/\s+/g, "-")
                : ""
            }/${huis?.diversen.diversen.objectcode}`;

            if (overdrachtStatus !== "ingetrokken") {
              return (
                <Link to={huisUrl} key={huis.id}>
                  <div className="card md:card-side bg-white shadow-xl">
                    <figure>
                      <img
                        src={`${huis.media[0].link}&resize=4`}
                        className="object-fill w-full sm:h-full  sm:max-h-full sm:w-96"
                      />
                    </figure>

                    <div className="card-body px-6 py-4">
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

                      <h2 className="card-title">
                        {new Intl.NumberFormat("nl-NL", {
                          style: "currency",
                          currency: "EUR",
                        })
                          .format(huis.financieel.overdracht.koopprijs)
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
                      <p className=""></p>
                      <p>
                        {huis.teksten.aanbiedingstekst.substring(0, 130)}...
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex gap-1 text-xs">
                          <img src="/icons/oppervlakte.svg" />
                          {huis.algemeen.woonoppervlakte}m2
                        </div>
                        {huis.detail.kadaster[0].kadastergegevens
                          .oppervlakte && (
                          <div className="flex gap-1 text-xs">
                            <img src="/icons/perceel.svg" />
                            {
                              huis.detail.kadaster[0].kadastergegevens
                                .oppervlakte
                            }
                            m2 perceel
                          </div>
                        )}
                        {huis.algemeen.aantalKamers && (
                          <div className="flex gap-1 text-xs">
                            <img src="/icons/house-room.svg" />
                            {huis.algemeen.aantalKamers} kamers
                          </div>
                        )}
                        {huis.algemeen.energieklasse && (
                          <div className="flex gap-1 text-xs">
                            <img src="/icons/energy.svg" />
                            {huis.algemeen.energieklasse}
                          </div>
                        )}
                        {/*<div className="badge badge-outline capitalize">*/}
                        {/*  {huis.algemeen.woonhuistype*/}
                        {/*    ?.toLowerCase()*/}
                        {/*    ?.replace(/[^a-zA-Z0-9 ]/g, " ")}*/}
                        {/*</div>*/}

                        {/*<div className="badge"> bouwjaar {huis.algemeen.bouwjaar}</div>*/}
                      </div>
                      {/*<div className="card-actions justify-end">*/}
                      {/*  <Link*/}
                      {/*    to={`/huizen/${huis.id}`}*/}
                      {/*    className="btn btn-secondary rounded-full btn-outline"*/}
                      {/*  >*/}
                      {/*    Lees meer*/}
                      {/*  </Link>*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
