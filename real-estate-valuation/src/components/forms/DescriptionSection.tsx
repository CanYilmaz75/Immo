import { Grid, Button } from '@mui/material';
import { Control, useFieldArray } from 'react-hook-form';
import { FormSection } from '../ui/FormSection';
import { FormTextField } from '../ui/FormTextField';
import { PropertyFormData } from '@/lib/types/property';

interface DescriptionSectionProps {
  control: Control<PropertyFormData>;
}

export const DescriptionSection = ({ control }: DescriptionSectionProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: 'additionalTexts',
  });

  return (
    <FormSection
      title="Beschreibung"
      hint="Basierend auf deinen bisherigen Angaben können automatisch Textvorschläge generiert werden."
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormTextField
            name="ueberschrift"
            control={control}
            label="Überschrift"
            required
            inputProps={{ maxLength: 100 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name="immobilientext"
            control={control}
            label="Immobilientext"
            required
            multiline
            rows={4}
            inputProps={{ maxLength: 2000 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name="lagebeschreibung"
            control={control}
            label="Lagebeschreibung"
            multiline
            rows={4}
            inputProps={{ maxLength: 2000 }}
          />
        </Grid>
        {fields.map((field, index) => (
          <Grid item xs={12} key={field.id}>
            <FormTextField
              name={`additionalTexts.${index}.text`}
              control={control}
              label={`Zusätzliches Textfeld ${index + 1}`}
              multiline
              rows={4}
              inputProps={{ maxLength: 2000 }}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => append({ text: '' })}
          >
            + weiteres Textfeld
          </Button>
        </Grid>
      </Grid>
    </FormSection>
  );
}; 