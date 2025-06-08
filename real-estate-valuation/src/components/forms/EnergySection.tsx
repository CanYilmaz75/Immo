import React from 'react';
import { Grid } from '@mui/material';
import { Control, useWatch } from 'react-hook-form';
import { FormSection } from '../ui/FormSection';
import { FormSelect } from '../ui/FormSelect';
import { FormTextField } from '../ui/FormTextField';
import { FormCheckbox } from '../ui/FormCheckbox';
import { FormRadioGroup } from '../ui/FormRadioGroup';
import { PropertyFormData } from '@/lib/types/property';

interface EnergySectionProps {
  control: Control<PropertyFormData, any, PropertyFormData>;
}

const objektzustandOptions = [
  { value: 'unsaniert', label: 'Unsaniert' },
  { value: 'modernisiert', label: 'Modernisiert' },
  { value: 'kernsaniert', label: 'Kernsaniert' },
  { value: 'neuwertig', label: 'Neuwertig' },
];

const heizungsartOptions = [
  { value: 'Gas', label: 'Gas' },
  { value: 'Öl', label: 'Öl' },
  { value: 'Fernwärme', label: 'Fernwärme' },
  { value: 'Wärmepumpe', label: 'Wärmepumpe' },
  { value: 'Holz', label: 'Holz' },
  { value: 'Solar', label: 'Solar' },
];

const energieausweisOptions = [
  { value: 'liegt vor', label: 'Liegt vor' },
  { value: 'liegt bei Besichtigung vor', label: 'Liegt bei Besichtigung vor' },
  { value: 'nicht GEG-pflichtig', label: 'Nicht GEG-pflichtig' },
];

export const EnergySection: React.FC<EnergySectionProps> = ({ control }) => {
  const baujahrUnbekannt = useWatch({
    control,
    name: 'baujahr_unbekannt',
  });

  return (
    <FormSection
      title="Bausubstanz & Energieausweis"
      hint="Energieausweise sind laut GEG bei Besichtigung vorzulegen und 10 Jahre gültig."
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="objektzustand"
            control={control}
            label="Objektzustand"
            options={objektzustandOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name="letzte_modernisierung"
            control={control}
            label="Letzte Modernisierung (Jahr)"
            type="number"
            inputProps={{
              min: 1800,
              max: new Date().getFullYear(),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="heizungsart"
            control={control}
            label="Heizungsart"
            options={heizungsartOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="energietraeger"
            control={control}
            label="Energieträger"
            options={heizungsartOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            name="baujahr_gebaeude"
            control={control}
            label="Baujahr Gebäude"
            type="number"
            disabled={baujahrUnbekannt}
            inputProps={{
              min: 1800,
              max: new Date().getFullYear(),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormCheckbox
            name="baujahr_unbekannt"
            control={control}
            label="Baujahr nicht bekannt"
          />
        </Grid>
        <Grid item xs={12}>
          <FormRadioGroup
            name="energieausweis"
            control={control}
            label="Energieausweis"
            options={energieausweisOptions}
            required
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}; 