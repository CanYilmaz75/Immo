import React from 'react';
import { Grid } from '@mui/material';
import { Control, useWatch } from 'react-hook-form';
import { FormSection } from '../ui/FormSection';
import { FormFileUpload } from '../ui/FormFileUpload';
import type { PropertyFormData } from '@/lib/types/property';

interface MediaSectionProps {
  control: Control<PropertyFormData, any, PropertyFormData>;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ control }) => {
  const requiredFieldsFilled = useWatch({
    control,
    name: ['ueberschrift', 'immobilientext', 'wohnflaeche'],
  }).every(Boolean);

  return (
    <FormSection
      title="Bilder & Dokumente"
      hint="Gute Bilder erhöhen das Interesse und Vertrauen potenzieller Käufer"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormFileUpload
            name="bilder"
            control={control}
            label="Bilder hochladen"
            accept="image/jpeg,image/png,image/gif"
            multiple
          />
        </Grid>
        <Grid item xs={12}>
          <FormFileUpload
            name="grundrisse"
            control={control}
            label="Grundrisse hochladen"
            accept="image/jpeg,image/png,application/pdf"
            multiple
          />
        </Grid>
        <Grid item xs={12}>
          <FormFileUpload
            name="dokumente"
            control={control}
            label="Dokumente hochladen (z.B. Energieausweis)"
            accept="application/pdf"
            multiple
          />
        </Grid>
        <Grid item xs={12}>
          <FormFileUpload
            name="video"
            control={control}
            label="Video hochladen"
            accept="video/mp4,video/avi,video/quicktime,video/x-matroska"
            maxSize={1024 * 1024 * 1024} // 1GB
            disabled={!requiredFieldsFilled}
          />
        </Grid>
      </Grid>
    </FormSection>
  );
}; 