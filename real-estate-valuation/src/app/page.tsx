import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Image from 'next/image';
import { PropertyForm } from '../components/forms/PropertyForm';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Immobilienbewertung
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Bitte füllen Sie das Formular aus, um eine professionelle Bewertung Ihrer Immobilie zu erhalten
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <PropertyForm />
        </Box>
      </Box>
    </Container>
  );
}
