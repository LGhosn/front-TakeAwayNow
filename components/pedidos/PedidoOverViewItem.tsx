import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IPedidoOverViewItem } from "../types";
import {obtenerNombreEstadoDelPedido, pedidoAplicarEstimulo, setFormatDateTime} from "@/utils/utils";
import {Button, ButtonGroup } from '@mui/material';
import {useState} from "react";
import SuccessfulNotification from '@/components/notifications/successfulNotification'
import ErrorModal from '@/components/notifications/errorMessageModal';

const card = (idPedido: number, negocio: string, monto: number, estado: string, fechaYHoraDeEntrega: string, codigoDeRetiro: string, fnMostrarResultadoEstimulo: Function) => (
    <div className="flex flex-row justify-between">
        <CardContent>
            <Typography variant="body2">
                {obtenerNombreEstadoDelPedido(estado)} - {fechaYHoraDeEntrega == null ? "Sin horario de retiro establecido" : setFormatDateTime(fechaYHoraDeEntrega)}
            </Typography>
            <Typography variant="h4">
                {negocio}
            </Typography>
            <Typography variant="h6">
                Código de retiro: {codigoDeRetiro}
            </Typography>
            <Typography variant="h6">
                Precio: ${monto}
            </Typography>
        </CardContent>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'marcarComienzoDePreparacion').then(r => fnMostrarResultadoEstimulo(r));} } >En Preparación</Button>
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'marcarPedidoListoParaRetirar').then(r => fnMostrarResultadoEstimulo(r));} } >Listo para retirar</Button>
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'confirmarRetiroDelPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Retirado</Button>
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'devolverPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Devolver</Button>
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'cancelarPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Cancelar</Button>
        </ButtonGroup>
    </div>
);

export const PedidoOverViewItem = ({idPedido, negocio, precioTotal, estado, fechaYHoraDeEntrega, codigoDeRetiro}: IPedidoOverViewItem) => {
    const { monto } = precioTotal
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errorMessage, setErrorMessage] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [successMessage, setSuccessMessage] = useState("");
    async function mostrarResultadoEstimulo(res: Response) {
        if (!res.ok) {
            setErrorMessage(await res.text())
        } else {
            setSuccessMessage(await res.text())
        }
    }
    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">{card(idPedido, negocio, monto, estado, fechaYHoraDeEntrega, codigoDeRetiro, mostrarResultadoEstimulo)}</Card>
            </Box>
            { errorMessage && <ErrorModal action= { () => {setErrorMessage("")} } value={errorMessage}/> }
            { successMessage && <SuccessfulNotification actionPage={ ()=> { setSuccessMessage("") }} message={successMessage} /> }
        </>
    );
}

