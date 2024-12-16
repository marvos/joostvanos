import type { Route } from "./+types/ip";

import { useFetch } from "~/utils/useFetch";
import type { Objecten } from "~/utils/object-types";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}
export interface Root {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}
export async function loader({ request, context }: Route.LoaderArgs) {
  const response = await fetch("https://ipinfo.io/json?token=49ec06c5952f55");
  const data: Root = await response.json();
  return { ipify: data };
}
export default function Ip({ loaderData }: Route.ComponentProps) {
  console.log(loaderData?.ipify);
  return (
    <>
      <h1 className="text-4xl">IP {loaderData?.ipify?.ip}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.city}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.country}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.loc}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.org}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.region}</h1>
      <h1 className="text-xl">IP {loaderData?.ipify?.timezone}</h1>
    </>
  );
}
