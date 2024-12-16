import type { Route } from "./+types/aanbod";

import { useFetch } from "~/utils/useFetch";
import type { Objecten } from "~/utils/object-types";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const huizen: Objecten = await useFetch({
    request,
    context,
    url: "wonen/v3/objecten?actief=true&aantal=100",
    method: "GET",
  });

  return { objecten: huizen.resultaten };
}
export default function Aanbod({ loaderData }: Route.ComponentProps) {
  console.log(loaderData?.objecten);

  return (
    <>
      <h1 className="text-4xl m-auto py-14">Aanbod</h1>
      <div className="flex gap-7 flex-wrap ">
        {loaderData?.objecten.map((huis) => (
          <div className="card   w-96 shadow-xl" key={huis.id}>
            <figure>
              <img
                src={`${huis.media[0].link}&resize=4`}
                alt="Shoes"
                className="w-full"
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
