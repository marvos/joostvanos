export interface Objecten {
  resultaten: Resultaten[];
  paginering: Paginering;
}

export interface Resultaten {
  algemeen: Algemeen;
  detail: Detail;
  media: Medum[];
  marketing: Marketing;
  financieel: Financieel;
  adres: Adres;
  relaties: Relaties;
  diversen: Diversen;
  teksten: Teksten;
  tijdstipLaatsteWijziging: string;
  actief: boolean;
  vertrouwelijk: boolean;
  id: number;
  object: Object;
}

export interface Algemeen {
  energieKenmerken: any[];
  appartementsoort: any;
  onderhoudswaarderingBinnen: string;
  woonhuissoort: string;
  woonhuistype: string;
  onderhoudswaarderingBinnenMemo: string;
  onderhoudswaarderingBuiten: string;
  onderhoudswaarderingBuitenMemo: string;
  isolatievormen: string[];
  dakmaterialen: any;
  verwarmingsoorten: string[];
  cvKetelBrandstof: string;
  warmwatersoorten: string[];
  voorzieningenWonen: any[];
  cvKetelBouwjaar: string;
  cvKetelEigendom: string;
  cvCombiketel: boolean;
  woonhuiskenmerk: any;
  liggingen: string[];
  appartementkenmerk: any;
  totaleWoonkameroppervlakte: number;
  totaleKadestraleOppervlakte: number;
  gekoppeldeMakelaar: string;
  bestemmingHuidig: string;
  gebruikHuidig: string;
  bouwvorm: string;
  inAanbouw: boolean;
  inhoud: number;
  bijzonderheden: any[];
  bouwperiode: any;
  bouwjaar: string;
  bestemmingPermanenteBewoning: boolean;
  bestemmingRecreatiewoning: boolean;
  bouwgrondoppervlakte: number;
  bouwgrondBouwrijp: any;
  bouwjaartoelichting: string;
  gebruiksoppervlakteOverig: number;
  appartementWoonlaag: any;
  appartementWoonlagenAantal: any;
  woonoppervlakte: number;
  cvKetelType: string;
  energieklasse: any;
  energiedatum: any;
  energieindex: any;
  epc: any;
  aantalKamers: string;
  appartementOpenPortiek: any;
}

export interface Detail {
  overigOnroerendGoed: OverigOnroerendGoed;
  kadaster: Kadaster[];
  buitenruimte: Buitenruimte;
  etages: Etage[];
}

export interface OverigOnroerendGoed {
  capaciteit: number;
  toelichting: any;
  isolatie: any;
  voorziening: any;
  lengte: number;
  breedte: number;
  oppervlakte: number;
  type: string;
}

export interface Kadaster {
  kadastergegevens: Kadastergegevens;
}

export interface Kadastergegevens {
  perceel: string;
  erfpachtprijsvorm: string;
  einddatum: any;
  afkoopoptie: any;
  afgekochtTot: any;
  erfpachtPerJaar: any;
  gemeente: string;
  gemeentecode: string;
  sectie: string;
  erfpachtduur: any;
  indexnummer: string;
  aandeel: string;
  omvang: string;
  eigendomssoort: string;
  eeuwigAfgekocht: boolean;
  erfpachtgever: any;
  oppervlakte: number;
  wijzigingsdatum: string;
  invoerdatum: string;
}

export interface Buitenruimte {
  garagecapiciteit: string;
  oppervlakteGebouwgebondenBuitenruimte: number;
  parkeerfaciliteiten: string[];
  parkeercapaciteit: any;
  parkeertoelichting: string;
  garageoppervlakte: any;
  daktoelichting: string;
  hoofdtuintype: string;
  schuurBergingSoort: any;
  schuurBergingVoorzieningen: any;
  schuurBergingIsolatievormen: any;
  aantalSchurenBergingen: any;
  hoofdtuinAchterom: boolean;
  hoofdtuinbreedte: number;
  hoofdtuinoppervlakte: number;
  hoofdtuinlengte: number;
  daktype: any;
  garagevoorzieningen: string[];
  garagesoorten: string[];
  garagelengte: any;
  garagebreedte: any;
  hoofdtuinlocatie: string;
  tuinTotaleOppervlakte: any;
  oppervlakteExterneBergruimte: number;
  garageisolatievorm: any;
  totaalAantalGarages: number;
  tuinkwaliteit: string;
  tuintypes: string[];
}

export interface Etage {
  etagegegevens: Etagegegevens;
  etagesoort: string;
  etageomschrijving: string;
  aantalSlaapkamers: number;
  etageligging: any;
  badkamers: Badkamer[];
  aantalKamers: number;
}

export interface Etagegegevens {
  overigeRuimtes: string[];
  vasteTrap: boolean;
  kamerMogelijk: boolean;
  trapInKamer: boolean;
  keukenjaar: string;
  keukenoppervlakte: number;
  woonkamerbreedte: any;
  keukenlengte: any;
  keukenbreedte: any;
  woonkamertypes?: string[];
  keukentypes?: string[];
  woonkamerlengte: any;
  woonkameroppervlakte: number;
}

export interface Badkamer {
  lengte: any;
  breedte: any;
  oppervlakte: any;
  voorzieningen: string[];
}

export interface Medum {
  soort: string;
  vrijgave: boolean;
  wijzigingstijdstip: string;
  mimetype: string;
  volgnummer: number;
  omschrijving: any;
  titel: any;
  link: string;
}

export interface Marketing {
  publicatiedatum: string;
  website: Website;
}

export interface Website {
  openhuisdagen: any[];
}

export interface Financieel {
  overdracht: Overdracht;
}

export interface Overdracht {
  huurbeschikbaarheid: string;
  transactietoelichting: string;
  huurwaarborgsom: any;
  koopprijs: number;
  huurprijs: any;
  aanmeldingsreden: string;
  koopspecificatie: any;
  koopprijsvoorvoegsel: string;
  appartementVveBijdrage: number;
  onderVoorbehoudTot: any;
  aanvaardingsdatum: any;
  aanvaardingstoelichting: string;
  transactieprijsParkeerplaats: any;
  koopconditie: string;
  huurconditie: any;
  servicekosten: any;
  transactiedatum: any;
  transactieprijs: any;
  transportdatum: any;
  aanvaarding: string;
  vveReservefonds: boolean;
  huurprijsvoorvoegsel: any;
  huurspecificaties: any[];
  vvePeriodiekeBijdrage: boolean;
  vveOnderhoudsverwachting: boolean;
  vveOpstalverzekering: boolean;
  vveKvkInschrijving: boolean;
  onderVoorbehoudVanaf: any;
  wozWaardePeildatum: any;
  vveVergadering: boolean;
  wozWaarde: any;
  status: string;
}

export interface Adres {
  postcode: string;
  land: string;
  straat: string;
  huisnummer: Huisnummer;
  plaats: string;
  provincie: string;
}

export interface Huisnummer {
  toevoeging: any;
  hoofdnummer: string;
}

export interface Relaties {
  relaties: Relaty[];
  medeaanmelders: any[];
}

export interface Relaty {
  id?: number;
  type: string;
}

export interface Diversen {
  diversen: Diversen2;
}

export interface Diversen2 {
  tiaraObjectGuid: string;
  bedrijfscode: string;
  afdelingscode: string;
  wijzigingsdatum: string;
  objectcode: string;
  invoerdatum: string;
  mengvormtoelichting: string;
  mengvormKoopprijsafwijking: any;
  combinatieobjecttype: any;
  mengvorm: any;
  bogType: any;
  bogStatus: any;
  bogSituatie: any;
  combinatieobjectoppervlakte: any;
}

export interface Teksten {
  aanbiedingstekst: string;
  aanbiedingstekstEngels: string;
  eigenSiteTekst: any;
  a4Tekst: string;
  flyertekst: string;
}

export interface Object {
  type: Type;
}

export interface Type {
  objecttype: string;
}

export interface Paginering {
  volgende: string;
  totaalAantal: number;
}
