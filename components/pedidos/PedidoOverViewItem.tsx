import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IPedidoOverViewItem } from "../types";
import {obtenerNombreEstadoDelPedido, setFormatTime, pedidoAplicarEstimulo} from "@/utils/utils";
import {Button, ButtonGroup } from '@mui/material';

const card = (idPedido: number, negocio: string, monto: number, estado: string, fechaYHoraEntrega: string) => (
    <div className="flex flex-row justify-between">
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
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={ () => { pedidoAplicarEstimulo(idPedido, 'marcarComienzoDePreparacion');} } >En Preparación</Button>
            <Button onClick={ () => { pedidoAplicarEstimulo(idPedido, 'marcarPedidoListoParaRetirar');} } >Listo para retirar</Button>
            <Button onClick={ () => { pedidoAplicarEstimulo(idPedido, 'confirmarRetiroDelPedido');} } >Retirado</Button>
            <Button onClick={ () => { pedidoAplicarEstimulo(idPedido, 'devolverPedido');} } >Devolver</Button>
            <Button onClick={ () => { pedidoAplicarEstimulo(idPedido, 'cancelarPedido');} } >Cancelar</Button>
        </ButtonGroup>
    </div>
);

export const PedidoOverViewItem = ({idPedido, negocio, precioTotal, estado, fechaYHoraEntrega}: IPedidoOverViewItem) => {
    const { monto } = precioTotal
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card(idPedido, negocio, monto, estado, fechaYHoraEntrega)}</Card>
      </Box>
    );
}

