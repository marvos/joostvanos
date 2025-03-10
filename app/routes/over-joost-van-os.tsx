import { Link } from "react-router";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src="/joost-portrait.jpg"
            alt="Joost van Os"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold mb-8">Profiel Joost van Os</h1>
          <p>
            Met ruim 25 jaar ervaring in de makelaardij en 2000+ geslaagde
            transacties ben ik deskundig en heb ik uitgebreide kennis van de
            lokale vastgoedmarkt. Ik geloof in een persoonlijke benadering. De
            wensen en behoeften van mijn klanten staan bij mij centraal. Ik
            communiceer helder en eerlijk, zodat men altijd goed geïnformeerd
            is. Mede dankzij mijn uitgebreide netwerk kan ik mijn klanten snel
            en effectief helpen bij al hun vastgoedvragen.
          </p>

          <p>
            Sinds 2024 ben ik ook Vastgoed Mediator, mediation is een effectieve
            manier om alle mogelijke vastgoed conflicten op te lossen. Het
            mediationtraject biedt structuur waarmee partijen zelf, onder
            begeleiding van mij als neutrale mediator, tot een oplossing komen.
            Dit proces voorkomt niet alleen juridische stappen, maar verbetert
            ook de communicatie en de relatie tussen betrokkenen.
          </p>

          <div className="pt-6">
            <a
              href="/cv-joost-van-os.pdf"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
