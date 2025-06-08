"use client";

import React, { useRef } from 'react';
import { Button, FormHelperText, FormControl, Typography } from '@mui/material';
import { Controller, Control, FieldValues, Path, useController } from 'react-hook-form';

interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  accept?: string; // z.B. "image/*,application/pdf"
  multiple?: boolean; // true für Mehrfachauswahl (z.B. für Bilder), false für ein einzelnes File (z.B. Video)
  required?: boolean;
  helperText?: string; // optionaler Hilfetext (z.B. Hinweis zur Auswahl)
}

export const FormFileUpload = <T extends FieldValues>({ name, control, label, accept, multiple, required, helperText }: FormFileUploadProps<T>) => {
  const { field, fieldState: { error } } = useController({ name, control });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (multiple) {
       // Mehrfachauswahl (z.B. für Bilder) – erwartet ein Array von Files (File[])
       const fileArray = files ? Array.from(files) : [];
       field.onChange(fileArray);
    } else {
       // Einzelauswahl (z.B. für Video) – erwartet ein File oder null
       const file = files && files.length > 0 ? files[0] : null;
       field.onChange(file);
    }
  };

  return (
    <FormControl error={!!error} required={required} fullWidth>
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
      <Button variant="outlined" onClick={handleClick} fullWidth>
        {label}
      </Button>
      {field.value && (multiple ? (field.value as File[]).length > 0 : (field.value as File) !== null) && (
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {multiple ? (field.value as File[]).map((f, i) => (i === 0 ? f.name : (", " + f.name))).join("") : (field.value as File).name}
        </Typography>
      )}
      {error && <FormHelperText>{error.message}</FormHelperText>}
      {helperText && !error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}; 