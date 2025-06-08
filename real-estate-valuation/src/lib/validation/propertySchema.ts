import { z } from 'zod';
import type {
  Country,
  Immobilienart,
  Ausstattungsqualitaet,
  Haustyp,
  Bauphase,
  Bauweise,
  Objektzustand,
  StellplatzArt,
  Nutzungsart,
  Heizungsart,
  EnergieausweisStatus,
  Ausstattungsmerkmal,
  PropertyFormData,
} from '../types/property';

// Basis-Validierungsschemas
const plzSchema = z.string()
  .min(5, 'PLZ muss 5 Zeichen lang sein')
  .max(5, 'PLZ muss 5 Zeichen lang sein')
  .regex(/^\d{5}$/, 'PLZ muss aus 5 Ziffern bestehen');

const yearSchema = z.number()
  .int('Muss eine ganze Zahl sein')
  .min(1800, 'Jahr muss nach 1800 liegen')
  .max(new Date().getFullYear(), 'Jahr darf nicht in der Zukunft liegen');

const areaSchema = z.number()
  .positive('Fläche muss größer als 0 sein')
  .max(10000, 'Fläche darf nicht größer als 10.000 m² sein');

const priceSchema = z.number()
  .positive('Preis muss größer als 0 sein')
  .max(100000000, 'Preis darf nicht größer als 100.000.000 € sein');

// Hauptvalidierungsschema
export const propertySchema = z.object({
  // Adresse
  adresse: z.object({
    land: z.enum(['Deutschland', 'Österreich', 'Schweiz'] as const),
    strasse: z.string().min(1, 'Straße ist erforderlich'),
    hausnummer: z.string().min(1, 'Hausnummer ist erforderlich'),
    plz: plzSchema,
    ort: z.string().min(1, 'Ort ist erforderlich'),
    adresse_verbergen: z.boolean().default(false),
  }),

  // Grundlegende Immobiliendaten
  grunddaten: z.object({
    immobilienart: z.enum([
      'Wohnung', 'Einfamilienhaus', 'Reihenhaus', 'Doppelhaushälfte',
      'Mehrfamilienhaus', 'Büro', 'Gewerbe', 'Grundstück'
    ] as const),
    wohnflaeche: areaSchema,
    nutzflaeche: areaSchema.optional(),
    grundstuecksflaeche: areaSchema.optional(),
    zimmeranzahl: z.number()
      .int('Muss eine ganze Zahl sein')
      .positive('Muss größer als 0 sein')
      .max(20, 'Maximal 20 Zimmer'),
    schlafzimmer: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(0, 'Kann nicht negativ sein')
      .max(10, 'Maximal 10 Schlafzimmer'),
    badezimmer: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(0, 'Kann nicht negativ sein')
      .max(10, 'Maximal 10 Badezimmer'),
    etagenanzahl: z.number()
      .int('Muss eine ganze Zahl sein')
      .positive('Muss größer als 0 sein')
      .max(20, 'Maximal 20 Etagen')
      .optional(),
    etage: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(-5, 'Minimal 5 Untergeschosse')
      .max(100, 'Maximal 100 Etagen')
      .optional(),
    baujahr_gebaeude: yearSchema,
    baujahr_unbekannt: z.boolean().default(false),
    letzte_modernisierung: yearSchema.optional(),
  }).refine(
    (data) => !data.baujahr_unbekannt || !data.baujahr_gebaeude,
    'Baujahr kann nicht gleichzeitig unbekannt sein und angegeben werden'
  ),

  // Ausstattung & Zustand
  ausstattung: z.object({
    ausstattungsqualitaet: z.enum(['Einfach', 'Standard', 'Gehoben', 'Luxuriös'] as const),
    haustyp: z.enum([
      'Massivhaus', 'Fertighaus', 'Holzhaus', 'Fachwerkhaus', 'Bungalow', 'Villa'
    ] as const),
    bauphase: z.enum(['Baufertig', 'Rohbau', 'Bauplanung', 'Baugrund'] as const),
    bauweise: z.enum(['Massiv', 'Fertigbau', 'Holzständer', 'Fachwerk'] as const),
    objektzustand: z.enum([
      'Neubau', 'Erstbezug', 'Renoviert', 'Modernisiert',
      'Gepflegt', 'Renovierungsbedürftig', 'Sanierungsbedürftig'
    ] as const),
    ausstattungsmerkmale: z.array(z.enum([
      'Aufzug', 'Balkon', 'Terrasse', 'Garten', 'Einbauküche',
      'Keller', 'Gäste-WC', 'Stufenloser Zugang', 'Einliegerwohnung',
      'Ferienwohnung', 'Denkmalobjekt', 'Smart Home', 'Alarmanlage',
      'Klimaanlage', 'Sauna', 'Pool', 'Solaranlage', 'Ladestation',
      'Barrierefrei', 'Rollstuhlgerecht'
    ] as const)),
    anmerkungen_ausstattung: z.string().max(1000, 'Maximal 1000 Zeichen').optional(),
  }),

  // Parken & Stellplätze
  parken: z.object({
    stellplatz_art: z.enum(['Garage', 'Carport', 'Außenstellplatz', 'Tiefgarage'] as const).optional(),
    stellplatz_anzahl: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(0, 'Kann nicht negativ sein')
      .max(10, 'Maximal 10 Stellplätze')
      .optional(),
    stellplatz_preis: priceSchema.optional(),
    garage_anzahl: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(0, 'Kann nicht negativ sein')
      .max(5, 'Maximal 5 Garagen')
      .optional(),
    garage_preis: priceSchema.optional(),
    carport_anzahl: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(0, 'Kann nicht negativ sein')
      .max(5, 'Maximal 5 Carports')
      .optional(),
    carport_preis: priceSchema.optional(),
    anmerkungen_parken: z.string().max(500, 'Maximal 500 Zeichen').optional(),
  }).refine(
    (data) => {
      if (data.stellplatz_anzahl && !data.stellplatz_art) return false;
      if (data.stellplatz_preis && !data.stellplatz_anzahl) return false;
      if (data.garage_preis && !data.garage_anzahl) return false;
      if (data.carport_preis && !data.carport_anzahl) return false;
      return true;
    },
    'Preis und Anzahl müssen zusammen angegeben werden'
  ),

  // Vermietung & Nutzung
  vermietung: z.object({
    nutzungsart: z.enum(['Eigennutzung', 'Kapitalanlage', 'Gewerbe', 'Gemischt'] as const),
    vermietet: z.boolean().default(false),
    verfuegbar_ab: z.string().datetime('Muss ein gültiges Datum sein').optional(),
    kaltmiete: priceSchema.optional(),
    nebenkosten: priceSchema.optional(),
    heizkosten: priceSchema.optional(),
    kaution: priceSchema.optional(),
    provision: z.number()
      .min(0, 'Kann nicht negativ sein')
      .max(100, 'Maximal 100%')
      .optional(),
    mietdauer: z.number()
      .int('Muss eine ganze Zahl sein')
      .min(1, 'Mindestens 1 Monat')
      .max(120, 'Maximal 120 Monate')
      .optional(),
    anmerkungen_vermietung: z.string().max(1000, 'Maximal 1000 Zeichen').optional(),
  }).refine(
    (data) => {
      if (data.vermietet && !data.kaltmiete) return false;
      if (data.verfuegbar_ab && !data.kaltmiete) return false;
      return true;
    },
    'Bei Vermietung oder Verfügbarkeit muss die Kaltmiete angegeben werden'
  ),

  // Bilder & Dokumente
  medien: z.object({
    bilder: z.array(z.instanceof(File))
      .min(1, 'Mindestens ein Bild ist erforderlich')
      .max(20, 'Maximal 20 Bilder'),
    grundrisse: z.array(z.instanceof(File))
      .max(10, 'Maximal 10 Grundrisse')
      .optional(),
    dokumente: z.array(z.instanceof(File))
      .max(20, 'Maximal 20 Dokumente')
      .optional(),
    video: z.instanceof(File)
      .refine(
        (file) => file.size <= 1024 * 1024 * 1024, // 1GB
        'Video darf nicht größer als 1GB sein'
      )
      .optional(),
  }),

  // Energie & Technik
  energie: z.object({
    heizungsart: z.enum([
      'Gas', 'Öl', 'Fernwärme', 'Wärmepumpe', 'Holz', 'Solar', 'Elektro'
    ] as const),
    energietraeger: z.enum([
      'Gas', 'Öl', 'Fernwärme', 'Wärmepumpe', 'Holz', 'Solar', 'Elektro'
    ] as const),
    energieausweis: z.enum(['Bedarfsausweis', 'Verbrauchsausweis', 'Kein Ausweis'] as const),
    energiekennwert: z.number()
      .positive('Muss größer als 0 sein')
      .max(1000, 'Maximal 1000 kWh/(m²·a)')
      .optional(),
    energiekennwert_einheit: z.enum(['kWh/(m²·a)', 'kWh/(m³·a)'] as const).optional(),
    co2_emissionen: z.number()
      .positive('Muss größer als 0 sein')
      .max(100, 'Maximal 100 kg/(m²·a)')
      .optional(),
    co2_emissionen_einheit: z.enum(['kg/(m²·a)', 'kg/(m³·a)'] as const).optional(),
    anmerkungen_energie: z.string().max(500, 'Maximal 500 Zeichen').optional(),
  }).refine(
    (data) => {
      if (data.energiekennwert && !data.energiekennwert_einheit) return false;
      if (data.co2_emissionen && !data.co2_emissionen_einheit) return false;
      return true;
    },
    'Energie- und CO2-Werte müssen mit Einheit angegeben werden'
  ),

  // Beschreibung & Texte
  beschreibung: z.object({
    ueberschrift: z.string()
      .min(10, 'Mindestens 10 Zeichen')
      .max(100, 'Maximal 100 Zeichen'),
    immobilientext: z.string()
      .min(100, 'Mindestens 100 Zeichen')
      .max(2000, 'Maximal 2000 Zeichen'),
    lagebeschreibung: z.string()
      .max(1000, 'Maximal 1000 Zeichen')
      .optional(),
    additionalTexts: z.array(z.object({
      text: z.string()
        .min(50, 'Mindestens 50 Zeichen')
        .max(1000, 'Maximal 1000 Zeichen'),
      kategorie: z.string().max(50, 'Maximal 50 Zeichen').optional(),
    })).max(5, 'Maximal 5 zusätzliche Texte'),
  }),

  // KI-generierte Inhalte (optional)
  ki_inhalte: z.object({
    vorgeschlagene_ueberschrift: z.string().max(100, 'Maximal 100 Zeichen').optional(),
    vorgeschlagener_text: z.string().max(2000, 'Maximal 2000 Zeichen').optional(),
    vorgeschlagene_lagebeschreibung: z.string().max(1000, 'Maximal 1000 Zeichen').optional(),
    schluesselwoerter: z.array(z.string().max(50, 'Maximal 50 Zeichen')).optional(),
    marktanalyse: z.object({
      vergleichsobjekte: z.number().int().positive().optional(),
      durchschnittspreis: priceSchema.optional(),
      markttrend: z.enum(['steigend', 'fallend', 'stabil'] as const).optional(),
      empfehlung: z.string().max(500, 'Maximal 500 Zeichen').optional(),
    }).optional(),
  }).optional(),
});

// Typ-Inferenz für das Formular
export type PropertyFormSchemaType = z.infer<typeof propertySchema>;

// Validierungsfunktion für das Formular
export const validatePropertyForm = (data: unknown): PropertyFormData => {
  return propertySchema.parse(data);
}; 