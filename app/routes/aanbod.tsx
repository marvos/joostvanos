import type { Route } from "./+types/aanbod";

import { useFetch } from "~/utils/useFetch";
import type { Objecten, Resultaten } from "~/utils/object-types";
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
console.log(objecten?.resultaten);
return {resultaten: objecten?.resultaten};
}


export default function Aanbod({ loaderData }: Route.ComponentProps) {
  console.log(loaderData?.resultaten);

  return (
    <>
      <h1 className="text-4xl m-auto py-14">Aanbod</h1>
      <div className="flex gap-7 flex-wrap ">
        {loaderData?.resultaten?.map((huis) => (
          <div className="card min-[320px]:max-lg:card-side shadow-xl lg:w-96" key={huis.id}>
            <figure>
              <img
                src={`${huis.media[0].link}&resize=4`}

                className="w-full object-cover h-full min-w-64 "
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {new Intl.NumberFormat("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                })
                  .format(huis.financieel.overdracht.koopprijs)
                  .slice(0, -3)}

                <div className="badge badge-ghost whitespace-nowrap">
                  {huis.financieel.overdracht.status
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9 ]/g, " ")}
                </div>
              </h2>
              <h2 className="card-title">
                {huis.adres.straat} {huis.adres.huisnummer.hoofdnummer}
              </h2>
              <p>{huis.teksten.aanbiedingstekst.substring(0, 100)}</p>
              <div className="badge badge-outline">
                {huis.algemeen.woonoppervlakte}m2 oppervlakte
              </div>
              <div className="badge badge-outline capitalize">
                {huis.algemeen.woonhuistype
                  ?.toLowerCase()
                  ?.replace(/[^a-zA-Z0-9 ]/g, " ")}
              </div>
              <div className="badge badge-outline">
                {huis.algemeen.aantalKamers} kamers
              </div>
              <div className="badge badge-outline">
                {" "}
                bouwjaar {huis.algemeen.bouwjaar}
              </div>
              <div className="card-actions justify-end">
                <Link
                  to={`/huizen/${huis.id}`}
                  className="btn btn-secondary rounded-full"
                >
                  Lees meer
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
