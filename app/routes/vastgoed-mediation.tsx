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

export default function VastgoedMediation({
  loaderData,
}: Route.ComponentProps) {
  return (
    <>
      <div
        className="hero min-h-[50vh]"
        style={{
          backgroundImage: "url(/bgvastgoed-meidation.jpg)",
        }}
      >
        <div className="hero-overlay bg-black/60"></div>
        <div className="hero-content text-neutral-content text-center items-end justify-end">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold mt-[20vh]">
              Vastgoed Mediation
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
          <h2 className="text-xl font-bold">
            Wanneer een Vastgoed Mediator in plaats van een Vastgoed Makelaar
          </h2>
          <p>
            Vanzelfsprekend maakt men bij aan/verkoop van vastgoed gebruik van
            de diensten van een makelaar. Veelal wordt er ook een makelaar
            ingeschakeld bij andere vastgoed vraagstukken echter neemt de
            makelaar per definitie een partijdig standpunt in (hij/zij behartigt
            immers altijd de belangen van of de aankopende of de verkopende
            partij). Dit gegeven kan ertoe leiden dat vastgoed vraagstukken
            verzanden in vastgoed conflicten. Partijen zien dan alleen nog hun
            eigen belang en zijn daardoor niet meer gefocust op het oplossen van
            het conflict waardoor het conflict kan escaleren met alle
            (juridische) gevolgen van dien.
          </p>
          <p>
            Mediation is een effectieve manier om deze conflicten op te lossen.
            Het mediationtraject biedt structuur waarmee partijen zelf, onder
            begeleiding van een neutrale mediator, tot een oplossing komen. Dit
            proces voorkomt niet alleen juridische stappen, maar verbetert ook
            de communicatie tussen betrokkenen.
          </p>
          <p>
            Gedurende het traject doorlopen de partijen verschillende fasen, van
            een eerste intake tot het vastleggen van een bindende overeenkomst.
            De mediator speelt in elke fase een cruciale rol door het
            faciliteren van gesprekken en het bieden van een veilige omgeving
            waarin partijen hun standpunten kunnen delen.
          </p>
          <p>
            Mediation is doorgaans sneller en minder kostbaar dan een juridische
            procedure, wat het een aantrekkelijke optie maakt. Een goede
            voorbereiding verhoogt de kans op succes. Hoe duidelijker partijen
            hun doelen formuleren en het proces begrijpen, hoe effectiever de
            mediation zal verlopen.
          </p>
          <p>
            Mediation is een vorm van alternatieve geschiloplossing waarbij
            samenwerking en communicatie centraal staan. In plaats van een
            conflict te laten juridiseren of voor de rechter uit te vechten,
            zoeken de partijen onder begeleiding van een mediator naar een
            gezamenlijke oplossing. Dit proces is nuttig bij geschillen bij
            aan/verkoop, huurgeschillen, VvE kwesties, onenigheid of de waarde
            van vastgoed etc.
          </p>
          <p>
            Mediation biedt diverse voordelen ten opzichte van traditionele
            juridische procedures:
          </p>
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
                <span className="font-bold">Snel en kostenefficiënt:</span>{" "}
                Mediation kan vaak binnen enkele sessies worden afgerond, wat
                kosten en tijd bespaart.
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
                <span className="font-bold">Behouden van relaties:</span> Omdat
                de focus ligt op samenwerking, blijven relaties tussen partijen
                vaak beter intact. Dit is vooral van belang in situaties waar de
                partijen ook na het conflict samen verder moeten zoals bij
                huurgeschillen.
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
                <span className="font-bold">Flexibiliteit:</span> Het
                mediationproces is flexibel en kan worden aangepast aan de
                behoeften van de partijen, wat zorgt voor een oplossing op maat.
              </div>
            </li>
          </ul>
          <p>
            {" "}
            Een goede voorbereiding vergroot de kans op succes bij mediation.
            Het is belangrijk dat alle partijen hun doelen duidelijk formuleren
            en de relevante documentatie voorbereiden. Tijdens de pre-mediation
            fase verzamelt de mediator informatie en stelt een
            mediationovereenkomst op. Hierin worden de spelregels voor het
            traject vastgelegd.
          </p>
          <p>
            Ook bespreekt de mediator vertrouwelijkheid en gedragsregels, zodat
            iedereen zich veilig voelt om vrijuit te spreken.
          </p>
          <p>
            De mediation start met een eerste sessie waarin beide partijen hun
            standpunten toelichten. Dit helpt om misverstanden direct op te
            helderen en de basis te leggen voor constructieve gesprekken.
          </p>{" "}
          <p>
            Het mediationproces bestaat uit verschillende fasen, elk gericht op
            het (weder)opbouwen van vertrouwen en het zoeken naar een oplossing.
          </p>{" "}
          <p>
            De intakefase biedt de mogelijkheid voor beide partijen om
            individueel en vertrouwelijk hun standpunten te delen. De mediator
            benadrukt hierbij het belang van vertrouwelijkheid, wat zorgt voor
            een open en veilige communicatie.
          </p>{" "}
          <p>
            In de caucus-sessies, oftewel individuele gesprekken met de
            mediator, kunnen partijen hun zorgen en behoeften in vertrouwen
            bespreken. Dit stelt de mediator in staat om mogelijke blokkades in
            het proces te identificeren en te werken aan maatwerkoplossingen. Na
            de individuele gesprekken volgt een gezamenlijke afspraak. De
            mediator helpt de partijen bij het zoeken naar wederzijds
            acceptabele oplossingen en moedigt hen aan om compromissen te
            sluiten waar mogelijk.
          </p>{" "}
          <p>
            De mediator speelt een sleutelrol in het mediationproces. Naast het
            begeleiden van de gesprekken, is het opbouwen van vertrouwen en het
            waarborgen van neutraliteit essentieel. De mediator zorgt ervoor dat
            beide partijen zich gehoord en gerespecteerd voelen. Neutraliteit is
            hierbij van groot belang; de mediator neemt geen standpunt in, maar
            faciliteert het proces zodat de partijen samen tot een oplossing
            kunnen komen. De mediator helpt misverstanden te voorkomen door het
            gesprek helder te houden en de belangrijkste punten samen te vatten.
            Dit stelt partijen in staat om zich volledig te concentreren op het
            vinden van een oplossing.
          </p>{" "}
          <p>
            {" "}
            Na de mediation zijn er belangrijke stappen die moeten worden
            gevolgd om de gemaakte afspraken na te komen en de resultaten te
            evalueren. De afspraken die tijdens de mediation worden gemaakt,
            moeten goed worden vastgelegd in een bindend document oftewel de
            vaststellingsovereenkomst (VSO). Het naleven van deze afspraken is
            essentieel voor het succes van de mediation. De mediator helpt om
            alles duidelijk op papier te zetten.
          </p>
          <p>
            Met mediation kunnen conflicten snel, effectief en kostenefficiënt
            worden opgelost, zonder de tussenkomst van een jurist of rechter.
            Joost van Os Makelaardij & Mediation biedt mediation op maat,
            gericht op het vinden van duurzame oplossingen die voor alle
            partijen werken.
          </p>
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
