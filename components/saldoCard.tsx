import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OutlinedCard from './outlinedCard';

interface CardProps {
  puntosDeConfianza ?: number
  saldo ?: number 
}

const card = ({puntosDeConfianza, saldo} : CardProps) => (
  <>
  <CardContent  className="flex flex-col items-center" >
    <Typography sx={{ mb: 3, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
      Saldo: {saldo}
    </Typography>
    {puntosDeConfianza && (
      <Typography sx={{ fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        Puntos de Confianza: {puntosDeConfianza}
      </Typography>
    )}
  </CardContent>
  </>
);

export default function SaldoCard({puntosDeConfianza, saldo} : CardProps) {
  return (
    <OutlinedCard>
      {card({puntosDeConfianza, saldo})}
    </OutlinedCard>
  );
}