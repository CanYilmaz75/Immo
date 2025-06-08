"use client";

import React from 'react';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Stack } from '@mui/material';
import { AddressSection } from './AddressSection';
import { BasicDetailsSection } from './BasicDetailsSection';
import { StateAndEquipmentSection } from './StateAndEquipmentSection';
import { MediaSection } from './MediaSection';
import { EnergySection } from './EnergySection';
import type { PropertyFormData } from '@/lib/types/property';
import { propertySchema } from '@/lib/validation/propertySchema';
import type { z } from 'zod';

type PropertyFormSchemaType = z.infer<typeof propertySchema>;
const resolver: Resolver<PropertyFormData> = zodResolver(propertySchema);

export const PropertyForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver,
    defaultValues: {
      // Adresse
      land: 'Deutschland',
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      adresse_verbergen: false,

      // Eckdaten
      zimmeranzahl: undefined,
      wohnflaeche: 0,
      grundstuecksflaeche: undefined,
      preis_auf_anfrage: false,

      // Details
      stufenloser_zugang: false,
      gaeste_wc: false,
      keller: false,
      einliegerwohnung: false,
      ferienwohnung: false,
      denkmalobjekt: false,
      vermietet: false,
      ausstattungsqualitaet: undefined,
      haustyp: undefined,
      bauphase: undefined,
      garage_stellplatz: undefined,
      etagenanzahl: undefined,
      badezimmer: undefined,
      schlafzimmer: undefined,
      nutzflaeche: undefined,
      verfuegbar_ab: null,

      // Zustand und Ausstattung
      objektzustand: 'modernisiert',
      ausstattungsmerkmale: [],

      // Bilder & Dokumente
      bilder: [],
      grundrisse: [],
      dokumente: [],
      video: null,

      // Bausubstanz & Energieausweis
      letzte_modernisierung: undefined,
      heizungsart: undefined,
      energietraeger: undefined,
      baujahr_gebaeude: null,
      baujahr_unbekannt: false,
      energieausweis: 'liegt vor',
    },
  });

  const onSubmit: SubmitHandler<PropertyFormData> = async (data) => {
    console.log('Form data:', data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={4}>
        <AddressSection control={control} />
        <BasicDetailsSection control={control} />
        <StateAndEquipmentSection control={control} />
        <MediaSection control={control} />
        <EnergySection control={control} />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
        </Button>
      </Stack>
    </Box>
  );
};

export default PropertyForm; 