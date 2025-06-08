"use client";

import React from 'react';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { Box, Typography, Stack, Chip } from '@mui/material';
import { FormSelect } from '../ui/FormSelect';
import type { PropertyFormData } from '@/lib/types/property';

type Ausstattungsmerkmal = PropertyFormData['ausstattungsmerkmale'][number];

interface StateAndEquipmentSectionProps {
  control: Control<PropertyFormData, any, PropertyFormData>;
}

const ausstattungsmerkmale: { value: Ausstattungsmerkmal; label: string }[] = [
  { value: 'Balkon', label: 'Balkon' },
  { value: 'Terrasse', label: 'Terrasse' },
  { value: 'Garten', label: 'Garten' },
  { value: 'Einbauküche', label: 'Einbauküche' },
  { value: 'Fußbodenheizung', label: 'Fußbodenheizung' },
  { value: 'Garage', label: 'Garage' },
  { value: 'Stellplatz', label: 'Stellplatz' },
  { value: 'Aufzug', label: 'Aufzug' },
  { value: 'Klimaanlage', label: 'Klimaanlage' },
  { value: 'Satellitenanschluss', label: 'Satellitenanschluss' },
  { value: 'Kabelanschluss', label: 'Kabelanschluss' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Alarmanlage', label: 'Alarmanlage' },
  { value: 'Rollstuhlgerecht', label: 'Rollstuhlgerecht' },
  { value: 'Haustier erlaubt', label: 'Haustier erlaubt' },
];

export const StateAndEquipmentSection: React.FC<StateAndEquipmentSectionProps> = ({ control }) => {
  const formContext = useFormContext<PropertyFormData>();
  const setValue = formContext?.setValue;
  
  const selectedMerkmale = useWatch({
    control,
    name: 'ausstattungsmerkmale',
  }) as Ausstattungsmerkmal[];

  const handleMerkmalClick = (merkmal: Ausstattungsmerkmal) => {
    const currentMerkmale = [...selectedMerkmale];
    const index = currentMerkmale.indexOf(merkmal);
    
    if (index === -1) {
      currentMerkmale.push(merkmal);
    } else {
      currentMerkmale.splice(index, 1);
    }
    
    setValue('ausstattungsmerkmale', currentMerkmale);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Zustand und Ausstattung
      </Typography>
      <Stack spacing={2}>
        <Box>
          <FormSelect
            name="objektzustand"
            control={control}
            label="Objektzustand"
            options={[
              { value: 'unsaniert', label: 'Unsaniert' },
              { value: 'renovierungsbedürftig', label: 'Renovierungsbedürftig' },
              { value: 'modernisiert', label: 'Modernisiert' },
              { value: 'neuwertig', label: 'Neuwertig' },
            ]}
            required
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Ausstattungsmerkmale
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ausstattungsmerkmale.map((merkmal) => {
              const isSelected = selectedMerkmale.includes(merkmal.value);
              return (
                <Chip
                  key={merkmal.value}
                  label={merkmal.label}
                  onClick={() => handleMerkmalClick(merkmal.value)}
                  color={isSelected ? 'primary' : 'default'}
                  variant={isSelected ? 'filled' : 'outlined'}
                />
              );
            })}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}; 