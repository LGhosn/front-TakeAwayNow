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
import { useRouter } from 'next/router';

const card = (idPedido: number, negocio: string, monto: number, estado: string, fechaYHoraDeEntrega: string, codigoDeRetiro: string, fnMostrarResultadoEstimulo: Function, verPedido: any, vistaCliente: boolean) => (
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
            {!vistaCliente && estado == "Aguardando preparación" &&
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'marcarComienzoDePreparacion').then(r => fnMostrarResultadoEstimulo(r));} } >En Preparación
            </Button>
            }
            {!vistaCliente && estado == "En preparación" &&
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'marcarPedidoListoParaRetirar').then(r => fnMostrarResultadoEstimulo(r));} } >Listo para retirar
            </Button>
            }
            {vistaCliente && estado == "Listo para retirar" &&
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'confirmarRetiroDelPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Retirado
            </Button>
            }
            {vistaCliente && estado == "Retirado" &&
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'devolverPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Pedir Devolucion
            </Button>
            }
            {vistaCliente && estado != "Retirado" && estado != "Devolución solicitada" && estado != "Cancelado" &&
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'cancelarPedido').then(r => fnMostrarResultadoEstimulo(r));} } >Cancelar
            </Button>
            }
            {!vistaCliente && estado == "Devolución solicitada" &&
            <>
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'aceptarDevolucion').then(r => fnMostrarResultadoEstimulo(r));} } >Aceptar Devolucion
            </Button>
            <Button onClick={ () => {
                pedidoAplicarEstimulo(idPedido, 'denegarDevolucion').then(r => fnMostrarResultadoEstimulo(r));} } >Denegar Devolucion
            </Button>
            </>
            }
        </ButtonGroup>
    </div>
);

export const PedidoOverViewItem = ({idPedido, negocio, precioTotal, estado, fechaYHoraDeEntrega, codigoDeRetiro, vistaCliente}: IPedidoOverViewItem) => {
    const { monto } = precioTotal
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errorMessage, setErrorMessage] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [successMessage, setSuccessMessage] = useState("");
    const [openResumenPedido, setOpenResumenPedido] = useState(false);
    const [resumePedido, setResumePedido] = useState([]);
    const router = useRouter()
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
                    precio: item['precio']['monto'],
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
                <Card variant="outlined">{card(idPedido, negocio, monto, obtenerNombreEstadoDelPedido(estado), fechaYHoraDeEntrega, codigoDeRetiro, mostrarResultadoEstimulo, verPedido, vistaCliente)}</Card>
            </Box>
            { errorMessage && <ErrorModal action= { () => {setErrorMessage(""); router.reload()} } value={errorMessage}/> }
            { successMessage && <SuccessfulNotification actionPage={ ()=> { setSuccessMessage(""); router.reload() }} message={successMessage} /> }
        </>
    );
}

