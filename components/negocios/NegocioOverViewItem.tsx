import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { INegocioOverViewItem, DiaDeLaSemana } from "../types";
import {obtenerNombreDia, setFormatTime} from "../../utils/utils";
import { CardActionArea, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';

const card = (idCliente:number, router:any, id: number, nombre: string, diaDeApertura: DiaDeLaSemana, diaDeCierre: DiaDeLaSemana, horarioDeApertura: string, horarioDeCierre: string) => (
    <React.Fragment>
        <CardActionArea onClick={() => router.push(`/negocios/${id}/productos?idCliente=${idCliente}`)}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {nombre} - Abierto de { obtenerNombreDia(diaDeApertura) } a { obtenerNombreDia(diaDeCierre) }.
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Horario: { setFormatTime(horarioDeApertura) } a { setFormatTime(horarioDeCierre) }.
                </Typography>
            </CardContent>
        </CardActionArea>
    </React.Fragment>
);

export const NegocioOverViewItem = ({ id, nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre, idCliente }: INegocioOverViewItem & { idCliente: number }) => {
  const router = useRouter()
  return (
      <Box sx={{ minWidth: 650 }}>
        <Card variant="outlined">{card(idCliente, router, id, nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre)}</Card>
      </Box>
  );
}