import React from 'react';
import { Control } from 'react-hook-form';
import { Box, Typography, Stack } from '@mui/material';
import { FormTextField } from '../ui/FormTextField';
import { FormSelect } from '../ui/FormSelect';
import { FormCheckbox } from '../ui/FormCheckbox';
import type { PropertyFormData } from '@/lib/types/property';

interface AddressSectionProps {
  control: Control<PropertyFormData, any, PropertyFormData>;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ control }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Adresse
      </Typography>
      <Stack spacing={2}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormSelect
            name="land"
            control={control}
            label="Land"
            options={[
              { value: 'Deutschland', label: 'Deutschland' }
            ]}
            disabled
          />
          <FormCheckbox
            name="adresse_verbergen"
            control={control}
            label="Adresse verbergen"
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormTextField
            name="strasse"
            control={control}
            label="Straße"
            disabled={control._formValues.adresse_verbergen}
          />
          <FormTextField
            name="hausnummer"
            control={control}
            label="Hausnummer"
            disabled={control._formValues.adresse_verbergen}
          />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
          <FormTextField
            name="plz"
            control={control}
            label="PLZ"
            disabled={control._formValues.adresse_verbergen}
          />
          <FormTextField
            name="ort"
            control={control}
            label="Ort"
            disabled={control._formValues.adresse_verbergen}
          />
        </Box>
      </Stack>
    </Box>
  );
}; 