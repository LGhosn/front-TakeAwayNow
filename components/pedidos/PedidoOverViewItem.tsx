import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IPedidoOverViewItem } from "../types";
import {obtenerNombreEstadoDelPedido, setFormatTime} from "@/utils/utils";

const card = (negocio: string, monto: number, estado: string, fechaYHoraEntrega: string) => (
    <React.Fragment>
      <CardContent>
        <Typography variant="body2">
          {obtenerNombreEstadoDelPedido(estado)} - {fechaYHoraEntrega == null ? "Sin horario de retiro establecido" : setFormatTime(fechaYHoraEntrega)}
        </Typography>
        <Typography variant="h4">
          {negocio}
        </Typography>
        <Typography variant="h6">
          Precio: ${monto}
        </Typography>
      </CardContent>
    </React.Fragment>
);

export const PedidoOverViewItem = ({ id, negocio, precioTotal, estado, fechaYHoraEntrega }: IPedidoOverViewItem) => {
    const { monto } = precioTotal
      return (
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card(negocio, monto, estado, fechaYHoraEntrega)}</Card>
          </Box>
      );
}

