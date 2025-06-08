import React from 'react';
import { Control } from 'react-hook-form';
import { Box, Typography, Stack, Tooltip, IconButton } from '@mui/material';
import { Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { FormTextField } from '../ui/FormTextField';
import { FormSelect } from '../ui/FormSelect';
import { FormCheckbox } from '../ui/FormCheckbox';
import type { PropertyFormData } from '@/lib/types/property';

interface BasicDetailsSectionProps {
  control: Control<PropertyFormData>;
}

const immobilienartOptions = [
  { value: 'Wohnung', label: 'Wohnung' },
  { value: 'Einfamilienhaus', label: 'Einfamilienhaus' },
  { value: 'Reihenhaus', label: 'Reihenhaus' },
  { value: 'Doppelhaushälfte', label: 'Doppelhaushälfte' },
  { value: 'Mehrfamilienhaus', label: 'Mehrfamilienhaus' },
  { value: 'Büro', label: 'Büro' },
  { value: 'Gewerbe', label: 'Gewerbe' },
  { value: 'Grundstück', label: 'Grundstück' },
];

export const BasicDetailsSection: React.FC<BasicDetailsSectionProps> = ({ control }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Grundlegende Immobiliendaten
        </Typography>
        <Tooltip title="Hier erfassen Sie die wichtigsten Merkmale Ihrer Immobilie. Diese Angaben sind entscheidend für die Bewertung und Vermarktung.">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormSelect
              name="grunddaten.immobilienart"
              control={control}
              label="Immobilienart"
              options={immobilienartOptions}
              required
              helperText="Wählen Sie die Art der Immobilie aus"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.wohnflaeche"
              control={control}
              label="Wohnfläche (m²)"
              type="number"
              required
              helperText="Gesamte Wohnfläche in Quadratmetern"
              inputProps={{ min: 1, max: 10000 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.nutzflaeche"
              control={control}
              label="Nutzfläche (m²)"
              type="number"
              helperText="Gesamte Nutzfläche inkl. Keller, Dachboden etc."
              inputProps={{ min: 1, max: 10000 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.grundstuecksflaeche"
              control={control}
              label="Grundstücksfläche (m²)"
              type="number"
              helperText="Gesamte Grundstücksfläche bei Eigentum"
              inputProps={{ min: 1, max: 10000 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              name="grunddaten.zimmeranzahl"
              control={control}
              label="Zimmeranzahl"
              type="number"
              required
              helperText="Gesamtzahl der Zimmer"
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              name="grunddaten.schlafzimmer"
              control={control}
              label="Schlafzimmer"
              type="number"
              required
              helperText="Anzahl der Schlafzimmer"
              inputProps={{ min: 0, max: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              name="grunddaten.badezimmer"
              control={control}
              label="Badezimmer"
              type="number"
              required
              helperText="Anzahl der Badezimmer"
              inputProps={{ min: 0, max: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormTextField
              name="grunddaten.etagenanzahl"
              control={control}
              label="Etagenanzahl"
              type="number"
              helperText="Gesamtzahl der Etagen"
              inputProps={{ min: 1, max: 20 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.etage"
              control={control}
              label="Etage"
              type="number"
              helperText="Aktuelle Etage (0 = Erdgeschoss, -1 = 1. UG, etc.)"
              inputProps={{ min: -5, max: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.baujahr_gebaeude"
              control={control}
              label="Baujahr"
              type="number"
              required
              helperText="Jahr der Fertigstellung"
              inputProps={{ min: 1800, max: new Date().getFullYear() }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormCheckbox
              name="grunddaten.baujahr_unbekannt"
              control={control}
              label="Baujahr unbekannt"
              helperText="Aktivieren Sie diese Option, wenn das Baujahr nicht bekannt ist"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              name="grunddaten.letzte_modernisierung"
              control={control}
              label="Letzte Modernisierung"
              type="number"
              helperText="Jahr der letzten größeren Modernisierung"
              inputProps={{ min: 1800, max: new Date().getFullYear() }}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}; 