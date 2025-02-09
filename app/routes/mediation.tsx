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
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/mediator-canalview.jpg)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">
              Mediation Diensten
            </h1>
            <p className="mb-5 ">
              Wij begrijpen dat er in zowel persoonlijke als zakelijke relaties
              conflicten kunnen ontstaan. Het is onze missie om u te helpen deze
              conflicten op een <span className="font-bold">constructieve</span>{" "}
              en <span className="font-bold">effectieve</span> manier op te
              lossen.
            </p>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl flex flex-col gap-6 pb-20 pt-14">
        <div className="flex gap-7 flex-wrap ">
          <p>
            Met onze professionele begeleiding creëren we een onpartijdige en{" "}
            <span className="font-bold">veilige omgeving</span> waarin alle
            betrokken partijen hun zorgen en wensen kunnen uiten om zo meer{" "}
            <span className="font-bold">begrip </span> voor elkaars standpunten
            te krijgen en daarmee tot een{" "}
            <span className="font-bold">duurzame oplossing</span> te kunnen
            komen.
          </p>
          <h2 className="text-xl font-bold">
            Onze diensten op het gebied van vastgoed mediation:
          </h2>
          <ul className="flex flex-col gap-2 my-2">
            <li className="flex gap-2">
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-lg ">
                <span className="font-bold">Aan- en verkoop:</span> begeleiding
                bij het oplossen van conflicten ontstaan tussen partijen bij
                aan- verkoop van alle soorten vastgoed.
              </div>
            </li>
            <li className="flex gap-2">
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-lg ">
                <span className="font-bold"> Woning waarderingen:</span>{" "}
                begeleiding bij onenigheid over waarderingen van vastgoed.
              </div>
            </li>
            <li className="flex gap-2">
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-lg ">
                <span className="font-bold">Aan- en verhuur:</span> begeleiden
                bij huurgeschillen tussen huurder en verhuurder.
              </div>
            </li>
            <li className="flex gap-2">
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-lg ">
                <span className="font-bold"> VvE beheer:</span> begeleiden bij
                alle mogelijke conflicten binnen verenigingen van eigenaars.
              </div>
            </li>
            <li className="flex gap-2">
              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-lg ">
                <span className="font-bold">Advies: </span>adviseren bij alle
                mogelijke conflicten op het gebied van vastgoed.
              </div>
            </li>
          </ul>

          <h2 className="text-xl font-bold">
            Waarom kiezen voor Joost van Os Makelaardij & Mediation?
          </h2>

          <p>
            Met persoonlijke aandacht en neutrale begeleiding bieden wij
            volledige ondersteuning bij het oplossen van alle mogelijke
            vastgoedconflicten. Wij geloven in maatwerk. Iedere situatie is
            uniek en wij passen onze aanpak aan op uw specifieke behoeften. Ons
            doel is om niet alleen het huidige conflict op te lossen, maar ook
            om duurzame oplossingen te creëren die toekomstige problemen helpen
            voorkomen.
          </p>
          <h3 className="font-bold text-2xl text-center w-full">
            We zien uit naar onze samenwerking!
          </h3>
        </div>
      </div>
    </>
  );
}
