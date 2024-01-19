import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IPedidoOverViewItem} from "../types";

const card = (nombreNegocio: string, monto: number, estado: string, fechaYHoraEntrega: string) => (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          {estado} - {fechaYHoraEntrega}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {nombreNegocio}
        </Typography>
        <Typography variant="body2">
          {monto}
        </Typography>
      </CardContent>
    </React.Fragment>
);

export const PedidoOverViewItem = ({ id, nombreNegocio, precioTotal, estado, fechaYHoraEntrega }: IPedidoOverViewItem) => {
    const { monto } = precioTotal
      return (
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{card(nombreNegocio, monto, estado, fechaYHoraEntrega)}</Card>
          </Box>
      );
}

