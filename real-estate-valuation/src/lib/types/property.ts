export type Country = 'Deutschland' | 'Österreich' | 'Schweiz';

export type Immobilienart = 'Wohnung' | 'Einfamilienhaus' | 'Reihenhaus' | 'Doppelhaushälfte' | 'Mehrfamilienhaus' | 'Büro' | 'Gewerbe' | 'Grundstück';
export type Ausstattungsqualitaet = 'Einfach' | 'Standard' | 'Gehoben' | 'Luxuriös';
export type Haustyp = 'Massivhaus' | 'Fertighaus' | 'Holzhaus' | 'Fachwerkhaus' | 'Bungalow' | 'Villa';
export type Bauphase = 'Baufertig' | 'Rohbau' | 'Bauplanung' | 'Baugrund';
export type Bauweise = 'Massiv' | 'Fertigbau' | 'Holzständer' | 'Fachwerk';
export type Objektzustand = 'Neubau' | 'Erstbezug' | 'Renoviert' | 'Modernisiert' | 'Gepflegt' | 'Renovierungsbedürftig' | 'Sanierungsbedürftig';
export type StellplatzArt = 'Garage' | 'Carport' | 'Außenstellplatz' | 'Tiefgarage';
export type Nutzungsart = 'Eigennutzung' | 'Kapitalanlage' | 'Gewerbe' | 'Gemischt';
export type Heizungsart = 'Gas' | 'Öl' | 'Fernwärme' | 'Wärmepumpe' | 'Holz' | 'Solar' | 'Elektro';
export type EnergieausweisStatus = 'Bedarfsausweis' | 'Verbrauchsausweis' | 'Kein Ausweis';

export type Ausstattungsmerkmal =
  | 'Aufzug'
  | 'Balkon'
  | 'Terrasse'
  | 'Garten'
  | 'Einbauküche'
  | 'Keller'
  | 'Gäste-WC'
  | 'Stufenloser Zugang'
  | 'Einliegerwohnung'
  | 'Ferienwohnung'
  | 'Denkmalobjekt'
  | 'Smart Home'
  | 'Alarmanlage'
  | 'Klimaanlage'
  | 'Sauna'
  | 'Pool'
  | 'Solaranlage'
  | 'Ladestation'
  | 'Barrierefrei'
  | 'Rollstuhlgerecht';

export interface PropertyFormData {
  // Adresse
  adresse: {
    land: Country;
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    adresse_verbergen: boolean;
  };

  // Grundlegende Immobiliendaten
  grunddaten: {
    immobilienart: Immobilienart;
    wohnflaeche: number;
    nutzflaeche?: number;
    grundstuecksflaeche?: number;
    zimmeranzahl: number;
    schlafzimmer: number;
    badezimmer: number;
    etagenanzahl?: number;
    etage?: number;
    baujahr_gebaeude: number;
    baujahr_unbekannt: boolean;
    letzte_modernisierung?: number;
  };

  // Ausstattung & Zustand
  ausstattung: {
    ausstattungsqualitaet: Ausstattungsqualitaet;
    haustyp: Haustyp;
    bauphase: Bauphase;
    bauweise: Bauweise;
    objektzustand: Objektzustand;
    ausstattungsmerkmale: Ausstattungsmerkmal[];
    anmerkungen_ausstattung?: string;
  };

  // Parken & Stellplätze
  parken: {
    stellplatz_art?: StellplatzArt;
    stellplatz_anzahl?: number;
    stellplatz_preis?: number;
    garage_anzahl?: number;
    garage_preis?: number;
    carport_anzahl?: number;
    carport_preis?: number;
    anmerkungen_parken?: string;
  };

  // Vermietung & Nutzung
  vermietung: {
    nutzungsart: Nutzungsart;
    vermietet: boolean;
    verfuegbar_ab?: string; // ISO Date
    kaltmiete?: number;
    nebenkosten?: number;
    heizkosten?: number;
    kaution?: number;
    provision?: number;
    mietdauer?: number; // in Monaten
    anmerkungen_vermietung?: string;
  };

  // Bilder & Dokumente
  medien: {
    bilder: File[];
    grundrisse?: File[];
    dokumente?: File[];
    video?: File;
  };

  // Energie & Technik
  energie: {
    heizungsart: Heizungsart;
    energietraeger: Heizungsart;
    energieausweis: EnergieausweisStatus;
    energiekennwert?: number;
    energiekennwert_einheit?: 'kWh/(m²·a)' | 'kWh/(m³·a)';
    co2_emissionen?: number;
    co2_emissionen_einheit?: 'kg/(m²·a)' | 'kg/(m³·a)';
    anmerkungen_energie?: string;
  };

  // Beschreibung & Texte
  beschreibung: {
    ueberschrift: string;
    immobilientext: string;
    lagebeschreibung?: string;
    additionalTexts: Array<{
      text: string;
      kategorie?: string;
    }>;
  };

  // KI-generierte Inhalte (optional)
  ki_inhalte?: {
    vorgeschlagene_ueberschrift?: string;
    vorgeschlagener_text?: string;
    vorgeschlagene_lagebeschreibung?: string;
    schluesselwoerter?: string[];
    marktanalyse?: {
      vergleichsobjekte?: number;
      durchschnittspreis?: number;
      markttrend?: 'steigend' | 'fallend' | 'stabil';
      empfehlung?: string;
    };
  };
} 