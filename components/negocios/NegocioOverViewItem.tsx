import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { INegocioOverViewItem } from "../types";

const card = (nombre: string, diaDeApertura: string, diaDeCierre: string, horarioDeApertura: string, horarioDeCierre: string) => (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {nombre} - Abierto de {diaDeApertura} a {diaDeCierre}.
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Abierto de {horarioDeApertura} a {horarioDeCierre}.
        </Typography>
      </CardContent>
    </React.Fragment>
);

export const NegocioOverViewItem = ({ id, nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre }: INegocioOverViewItem) => {
  return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card(nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre)}</Card>
      </Box>
  );
}

