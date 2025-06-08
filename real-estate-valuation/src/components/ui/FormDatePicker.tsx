"use client";

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormDatePickerProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  helperText?: string; // optionaler Hilfetext (z.B. Hinweis zur Eingabe)
}

export const FormDatePicker = <T extends FieldValues>({ name, control, label, required, helperText, ...rest }: FormDatePickerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={field.value}
          onChange={(newValue) => field.onChange(newValue)}
          slotProps={{
            textField: {
              fullWidth: true,
              required,
              error: !!error,
              helperText: error?.message || helperText,
              ...rest
            }
          }}
        />
      )}
    />
  );
}; 