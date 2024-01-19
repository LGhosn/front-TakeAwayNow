import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function OutlinedCard({children} : any) {
  return (
    <Box sx={{ minWidth: 275, borderRadius: 8, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
              '&:hover': {backgroundColor: '#e0e0e0'}}}>
      <Card variant="outlined">{children}</Card>
    </Box>
  );
}