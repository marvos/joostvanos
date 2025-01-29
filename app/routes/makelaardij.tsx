import type { Route } from "./+types/huizen";

import { useFetch, useFetchRealWorks } from "~/utils/useFetch";
import type { Objecten } from "~/utils/object-types";
import { Form, Link, useSubmit } from "react-router";
import { useEffect, useRef } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Joost van Os Makelaardij & Mediation" },
    { name: "description", content: "Welcome to joostvanos.nl!" },
  ];
}

export default function Makelaardij({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container max-w-4xl">
      <h1 className="text-4xl m-auto py-14">Makelaardij</h1>
      <div className="flex gap-7 flex-wrap ">
        <p>
          Wij begrijpen we dat het kopen of verkopen van een huis een van de
          belangrijkste beslissingen in uw leven is. Daarom staan wij klaar om u
          te begeleiden met ruim 25 jaar ervaring, gedegen deskundigheid,
          persoonlijke aandacht en een grote passie voor het vak.
        </p>
        Onze Diensten:
        <ul>
          <li>Aankoopbegeleiding.</li>
          <li>Verkoopbegeleiding.</li>
          <li>Woning waarderingen.</li>
          <li> Aanhuur.</li>
          <li>Verhuur.</li>
          <li>Kleinschalig VvE beheer.</li>
          <li> Advies.</li>
        </ul>
        <p>
          Waarom kiezen voor Joost van Os Makelaardij & Mediation?
          <br />
          Met ruim 25 jaar ervaring in de makelaardij en 850+ geslaagde
          transacties zijn wij deskundig en hebben uitgebreide kennis van de
          lokale vastgoedmarkt. Wij geloven in een persoonlijke benadering. Uw
          wensen en behoeften staan bij ons centraal. Wij communiceren helder en
          eerlijk, zodat u altijd goed geïnformeerd bent. Mede dankzij ons
          uitgebreide netwerk kunnen wij u snel en effectief helpen bij al uw
          vastgoedvragen.
        </p>
        We zien uit naar onze samenwerking!
      </div>
    </div>
  );
}
