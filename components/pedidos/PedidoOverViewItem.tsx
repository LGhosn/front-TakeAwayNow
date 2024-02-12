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
import ResumenCarrito from '../cart/resumenCarrito';
import { CartProvider } from '@/context/context';

const card = (idPedido: number, negocio: string, monto: number, estado: string, fechaYHoraDeEntrega: string, codigoDeRetiro: string, fnMostrarResultadoEstimulo: Function, verPedido: any) => (
    <div className="flex flex-row justify-between">
        <CardContent className="cursor-pointer hover:bg-gray-300" onClick={verPedido}>
            <Typography variant="body2">
                {estado} - {fechaYHoraDeEntrega == null ? "Sin horario de retiro establecido" : setFormatDateTime(fechaYHoraDeEntrega)}
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
            {estado == "Aguardando preparación" &&
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'marcarComienzoDePreparacion').then(r => fnMostrarResultadoEstimulo(r));} } >En Preparación
            </Button>
            }
            {estado == "En preparación" &&
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'marcarPedidoListoParaRetirar').then(r => fnMostrarResultadoEstimulo(r));} } >Listo para retirar
            </Button>
            }
            {estado == "Listo para retirar" &&
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'confirmarRetiroDelPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Retirado
            </Button>
            }
            {estado == "Retirado" &&
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'devolverPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Devolver
            </Button>
            }
            {estado != "Retirado" && estado != "Devuelto" &&
            <Button onClick={ () => { // @ts-ignore
                pedidoAplicarEstimulo(idPedido, 'cancelarPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Cancelar
            </Button>
            }
        </ButtonGroup>
    </div>
);

export const PedidoOverViewItem = ({idPedido, negocio, precioTotal, estado, fechaYHoraDeEntrega, codigoDeRetiro}: IPedidoOverViewItem) => {
    const { monto } = precioTotal
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errorMessage, setErrorMessage] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [successMessage, setSuccessMessage] = useState("");
    const [openResumenPedido, setOpenResumenPedido] = useState(false);
    const [resumePedido, setResumePedido] = useState([]);
    async function mostrarResultadoEstimulo(res: Response) {
        if (!res.ok) {
            setErrorMessage(await res.text())
        } else {
            setSuccessMessage(await res.text())
        }
    }
    
    function verPedido() {
        fetch(`https://takeawaynow-dcnt.onrender.com/api/pedidos/${idPedido}`)
            .then((res) => {
                return res.json()
            }).then((res) => {
                let auxResumen = res.map((item: any) => ({
                    nombre: item['producto']['nombre'],
                    cantidad: item.cantidad,
                    precio: item['producto']['precio']
                }));
                
            setResumePedido(auxResumen);
        })
    }

    React.useEffect(() => {
        if (Object.keys(resumePedido).length > 0) {
            console.log(resumePedido)
            setOpenResumenPedido(true)
        }
    } , [resumePedido])

    return (
        <>
            { openResumenPedido && 
            <CartProvider>
            <ResumenCarrito pedido={resumePedido} handleClose={() => setOpenResumenPedido(false)} handlePurchase={() => console.log('hola')} onlyView/>
            </CartProvider>
            }
            <Box sx={{ minWidth: 275 }} className="p-2">
                <Card variant="outlined">{card(idPedido, negocio, monto, obtenerNombreEstadoDelPedido(estado), fechaYHoraDeEntrega, codigoDeRetiro, mostrarResultadoEstimulo, verPedido)}</Card>
            </Box>
            { errorMessage && <ErrorModal action= { () => {setErrorMessage("")} } value={errorMessage}/> }
            { successMessage && <SuccessfulNotification actionPage={ ()=> { setSuccessMessage("") }} message={successMessage} /> }
        </>
    );
}

