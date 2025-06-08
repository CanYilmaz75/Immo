import { Box, Paper, Typography, Tooltip, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  hint?: string;
  children: ReactNode;
  tooltip?: string;
}

export const FormSection = ({ title, hint, children, tooltip }: FormSectionProps) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
        {tooltip && (
          <Tooltip title={tooltip}>
            <IconButton size="small" sx={{ ml: 1 }}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {hint && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {hint}
        </Typography>
      )}
      <Box sx={{ display: 'grid', gap: 2 }}>
        {children}
      </Box>
    </Paper>
  );
}; 