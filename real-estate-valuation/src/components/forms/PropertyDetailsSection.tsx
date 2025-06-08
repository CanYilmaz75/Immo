import { Grid } from '@mui/material';
import { Control } from 'react-hook-form';
import { FormSection } from '../ui/FormSection';
import { FormSelect } from '../ui/FormSelect';
import { FormTextField } from '../ui/FormTextField';
import { FormCheckbox } from '../ui/FormCheckbox';
import { FormDatePicker } from '../ui/FormDatePicker';
import { PropertyFormData } from '@/lib/types/property';

interface PropertyDetailsSectionProps {
  control: Control<PropertyFormData>;
}

const ausstattungsqualitaetOptions = [
  { value: 'Einfach', label: 'Einfach' },
  { value: 'Normal', label: 'Normal' },
  { value: 'Gehoben', label: 'Gehoben' },
  { value: 'Luxus', label: 'Luxus' },
];

const haustypOptions = [
  { value: 'Einfamilienhaus', label: 'Einfamilienhaus' },
  { value: 'Reihenhaus', label: 'Reihenhaus' },
  { value: 'Doppelhaushälfte', label: 'Doppelhaushälfte' },
  { value: 'Mehrfamilienhaus', label: 'Mehrfamilienhaus' },
  { value: 'Wohnung', label: 'Wohnung' },
];

const bauphaseOptions = [
  { value: 'In Planung', label: 'In Planung' },
  { value: 'Im Bau', label: 'Im Bau' },
  { value: 'Bezugsfertig', label: 'Bezugsfertig' },
];

const garageStellplatzOptions = [
  { value: 'Ja', label: 'Ja' },
  { value: 'Nein', label: 'Nein' },
  { value: 'Optional', label: 'Optional' },
];

export const PropertyDetailsSection = ({ control }: PropertyDetailsSectionProps) => {
  return (
    <FormSection title="Details">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="stufenloser_zugang"
                control={control}
                label="Stufenloser Zugang"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="gaeste_wc"
                control={control}
                label="Gäste-WC"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="keller"
                control={control}
                label="Keller"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="einliegerwohnung"
                control={control}
                label="Einliegerwohnung"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="ferienwohnung"
                control={control}
                label="Ferienwohnung"
              />
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <FormCheckbox
                name="denkmalobjekt"
                control={control}
                label="Denkmalobjekt"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormSelect
            name="ausstattungsqualitaet"
            control={control}
            label="Ausstattungsqualität"
            options={ausstattungsqualitaetOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="haustyp"
            control={control}
            label="Haustyp"
            options={haustypOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="bauphase"
            control={control}
            label="Bauphase"
            options={bauphaseOptions}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormSelect
            name="garage_stellplatz"
            control={control}
            label="Garage/Stellplatz"
            options={garageStellplatzOptions}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormTextField
            name="etagenanzahl"
            control={control}
            label="Etagenanzahl"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormTextField
            name="badezimmer"
            control={control}
            label="Badezimmer"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormTextField
            name="schlafzimmer"
            control={control}
            label="Schlafzimmer"
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormTextField
            name="nutzflaeche"
            control={control}
            label="Nutzfläche (m²)"
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormDatePicker
            name="verfuegbar_ab"
            control={control}
            label="Verfügbar ab"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormCheckbox
            name="vermietet"
            control={control}
            label="Vermietet"
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}; 