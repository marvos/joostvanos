import type { Route } from "./+types/aanbod";

import { useFetch } from "~/utils/useFetch";
import type { Detail, Objecten, Resultaten } from "~/utils/object-types";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  // const objecten: Objecten = await context.cloudflare.env.OBJECTEN.get('huizen')

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
    <div className=" flex flex-col gap-6 pb-20 px-5">
      <h1 className="text-4xl m-auto py-14">Huizen</h1>
      <div className="grid lg:grid-cols-2 gap-7 m-auto items-center justify-center">
        {resultaten?.map((huis: Resultaten) => {
          const overdrachtStatus = huis.financieel.overdracht.status
            ?.toLowerCase()
            ?.replace(/[^a-zA-Z0-9 ]/g, " ");
          if (overdrachtStatus !== "ingetrokken") {
            return (
              <div
                className="card md:card-side bg-base-100 shadow-xl"
                key={huis.id}
              >
                <figure>
                  <img
                    src={`${huis.media[0].link}&resize=4`}
                    className="object-cover h-full sm:w-96"
                  />
                </figure>
                <div className="card-body p-6">
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
                  <h2 className="card-title">
                    {huis.adres.straat} {huis.adres.huisnummer.hoofdnummer}
                  </h2>
                  <p className="">
                    {huis.adres.postcode} {huis.adres.plaats}
                  </p>
                  <p>{huis.teksten.aanbiedingstekst.substring(0, 100)}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1 text-xs">
                      <img src="/icons/oppervlakte.svg" />
                      {huis.algemeen.woonoppervlakte}m2
                    </div>
                    {huis.detail.kadaster[0].kadastergegevens.oppervlakte && (
                      <div className="flex gap-1 text-xs">
                        <img src="/icons/perceel.svg" />
                        {huis.detail.kadaster[0].kadastergegevens.oppervlakte}m2
                        perceel
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
            );
          }
        })}
      </div>
    </div>
  );
}
