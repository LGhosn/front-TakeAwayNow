import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OutlinedCard from './outlinedCard';
import { useRouter } from 'next/router';

interface CardProps {
  info ?: {}
  router ?: any
}

const card = ({router, info} : CardProps) => (
  <>
  <CardContent  className="flex flex-col items-center" >
    {info && info.hasOwnProperty('nombre') && (
      <Typography sx={{ mb: 2, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        {/* @ts-ignore */}
        {info['nombre']}
      </Typography>
    )}
    {info && info.hasOwnProperty('diaDeApertura') && (
      <Typography 
        className="cursor-pointer hover:text-blue-400" 
        sx={{ mb: 2, fontSize: 12, textAlign: 'center' }} 
        color="text.secondary" 
        variant="h1"
        onClick={() => {
          localStorage.setItem('negocio', JSON.stringify(info))
          // @ts-ignore
          router.push(`/negocios/${info['id']}/horarios`) 
        }}
        >
        {/* @ts-ignore */}
        {info['diaDeApertura']} - {info['diaDeCierre']} / {info['horarioDeApertura']} - {info['horarioDeCierre']}
      </Typography>
    )}
    {info && info.hasOwnProperty('saldo') && (
      <Typography sx={{ mb: 1, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        {/* @ts-ignore */}
        Saldo: ${info['saldo']['monto']}
      </Typography>
    )}
    {info && info.hasOwnProperty('puntosDeConfianza') && (
      <Typography sx={{ mb: 3, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        {/* @ts-ignore */}
        Saldo: {info['puntosDeConfianza']}
      </Typography>
    )}
  </CardContent>
  </>
);

export default function InfoCard({info} : CardProps) {
const router = useRouter()
  return (
    <OutlinedCard>
      {card({router, info})}
    </OutlinedCard>
  );
}