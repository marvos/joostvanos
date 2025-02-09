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
  const diensten = [
    "Aankoopbegeleiding",
    "Verkoopbegeleiding",
    "Woning waarderingen",
    "Aanhuur",
    "Verhuur",
    "Kleinschalig VvE beheer",
    "Advies",
  ];
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/canals-night.webp)",
        }}
      >
        <div className="hero-overlay bg-black bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">Makelaardij</h1>
            <p className="mb-5 ">
              Met ruim 25 jaar ervaring in de makelaardij en 850+ geslaagde
              transacties zijn wij deskundig en hebben uitgebreide kennis van de
              lokale vastgoedmarkt.
            </p>
            {/*<button className="btn btn-primary">Get Started</button>*/}
          </div>
        </div>
      </div>
      <div className="container max-w-4xl flex flex-col gap-6 pb-20">
        {/*<h1 className="text-4xl m-auto pt-14 text-center">Makelaardij</h1>*/}
        <div className="flex gap-7 flex-col flex-wrap pt-14">
          <h2 className="text-xl font-bold">
            Waarom kiezen voor Joost van Os Makelaardij & Mediation?
          </h2>
          <p>
            Wij geloven in een persoonlijke benadering. Uw wensen en behoeften
            staan bij ons centraal. Wij communiceren helder en eerlijk, zodat u
            altijd goed geïnformeerd bent. Mede dankzij ons uitgebreide netwerk
            kunnen wij u snel en effectief helpen bij al uw vastgoedvragen.
          </p>
          <p>
            Wij begrijpen dat het kopen of verkopen van een huis een van de
            belangrijkste beslissingen in uw leven is. Daarom staan wij klaar om
            u te begeleiden met ruim 25 jaar ervaring, gedegen deskundigheid,
            persoonlijke aandacht en een grote passie voor het vak.
          </p>
          <div>
            <h3 className="font-bold text-lg">Onze Diensten:</h3>
            <ul className="flex flex-col gap-2 my-2">
              {diensten.map((item) => {
                return (
                  <li className="flex gap-2" key={item}>
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
                    <div className="text-lg ">{item}</div>
                  </li>
                );
              })}
            </ul>
          </div>
          <h3 className="font-bold text-2xl text-center">
            We zien uit naar onze samenwerking!
          </h3>
        </div>
      </div>
    </>
  );
}
