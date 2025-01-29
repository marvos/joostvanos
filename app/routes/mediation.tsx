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

export default function Mediation({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container max-w-4xl">
      <h1 className="text-4xl m-auto py-14">Mediation</h1>
      <div className="flex gap-7 flex-wrap ">
        <p>
          Wij begrijpen dat conflicten in zowel persoonlijke als zakelijke
          relaties kunnen ontstaan. Het is onze missie om u te helpen deze
          conflicten op een constructieve en effectieve manier op te lossen. Met
          onze professionele begeleiding creëren we een onpartijdige en veilige
          omgeving waarin alle betrokken partijen hun zorgen en wensen kunnen
          uiten om zo meer begrip voor elkaars standpunten te krijgen en daarmee
          tot een duurzame oplossing te kunnen komen.
        </p>
        Onze Diensten op het gebied van vastgoed mediation:
        <ul>
          <li>
            Aan- verkoop: begeleiding bij het oplossen van conflicten ontstaan
            tussen partijen bij aan- verkoop van alle soorten vastgoed.
          </li>
          <li>
            Woning waarderingen: begeleiding bij onenigheid over waarderingen
            van vastgoed.
          </li>
          <li>
            Aan- verhuur: begeleiden bij huurgeschillen tussen huurder en
            verhuurder.
          </li>
          <li>
            VvE beheer: begeleiden bij alle mogelijke conflicten binnen
            verenigingen van eigenaars.
          </li>
          <li>
            Advies: adviseren bij alle mogelijke conflicten op het gebied van
            vastgoed.
          </li>
        </ul>
        <p>
          Waarom kiezen voor Joost van Os Makelaadij & Mediation?
          <br />
          Met persoonlijke aandacht en neutrale begeleiding bieden wij volledige
          ondersteuning bij het oplossen van alle mogelijke vastgoedconflicten.
          Wij geloven in maatwerk. Iedere situatie is uniek en wij passen onze
          aanpak aan op uw specifieke behoeften. Ons doel is om niet alleen het
          huidige conflict op te lossen, maar ook om duurzame oplossingen te
          creëren die toekomstige problemen helpen voorkomen.
        </p>
        We zien uit naar onze samenwerking!
      </div>
    </div>
  );
}
