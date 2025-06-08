"use client";

import React from 'react';
import { FormControlLabel, Checkbox, CheckboxProps, FormHelperText, FormControl } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormCheckboxProps<T extends FieldValues> extends Omit<CheckboxProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  helperText?: string; // optionaler Hilfetext (z.B. Hinweis zur Auswahl)
}

export const FormCheckbox = <T extends FieldValues>({ name, control, label, required, helperText, ...rest }: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl error={!!error} required={required} component="fieldset">
          <FormControlLabel
            label={label}
            control={<Checkbox {...field} {...rest} />}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
          {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}; 