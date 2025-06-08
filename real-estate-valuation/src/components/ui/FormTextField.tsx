"use client";

import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string; // z.B. "text", "number", "date"
  required?: boolean;
  helperText?: string; // optionaler Hilfetext (z.B. Hinweis zur Eingabe)
}

export const FormTextField = <T extends FieldValues>({ name, control, label, type = "text", required, helperText, ...rest }: FormTextFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          required={required}
          error={!!error}
          helperText={error?.message || helperText}
          fullWidth
          {...rest}
        />
      )}
    />
  );
}; 