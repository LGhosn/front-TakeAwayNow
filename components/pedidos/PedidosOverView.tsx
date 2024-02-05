import { useRouter } from "next/router";
import React from "react";
import OutlinedCard from "../outlinedCard";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface PedidosOverViewProps {
    idNegocio? : any
    idCliente? : any
}

export const PedidosOverView = ({ idNegocio, idCliente }: PedidosOverViewProps) => {
    const router = useRouter();
    function handleClick() {
        router.push(`/pedidos?idNegocio=${idNegocio}&idCliente=${idCliente}`)
    }
  return (
    <div className="flex flex-col cursor-pointer" onClick={handleClick}>
        <OutlinedCard>
            <CardContent  className="flex flex-col items-center" >
                <Typography sx={{ mb: 2, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
                    Ver Todos los Pedidos
                </Typography>
            </CardContent>
        </OutlinedCard>
    </div>
  );
}

