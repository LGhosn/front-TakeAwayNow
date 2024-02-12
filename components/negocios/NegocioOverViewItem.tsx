import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { INegocioOverViewItem, DiaDeLaSemana } from "../types";
import {obtenerNombreDia, setFormatTime} from "../../utils/utils";
import { CardActionArea, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import ErrorModal from '../notifications/errorMessageModal';

const card = (idCliente:number, handleClick:any, id: number, nombre: string, diaDeApertura: DiaDeLaSemana, diaDeCierre: DiaDeLaSemana, horarioDeApertura: string, horarioDeCierre: string, cerrado:boolean, ) => (
    <React.Fragment>
        <CardActionArea onClick={handleClick}>            
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

export const NegocioOverViewItem = ({ id, nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre, idCliente, cerrado }: INegocioOverViewItem & { idCliente: number }) => {
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState("");
    const handleClick = () => {
        if (cerrado) {
            setErrorMessage("El negocio se encuentra cerrado.")
            return
        }
        router.push(`/negocios/${id}/productos?idCliente=${idCliente}`)
    }
    return (
        <>
        { errorMessage && <ErrorModal action= { () => {setErrorMessage("");} } value={errorMessage}/> }

        <Box sx={{ minWidth: 650 }}>
        <Card variant="outlined">{card(idCliente, handleClick, id, nombre, diaDeApertura, diaDeCierre, horarioDeApertura, horarioDeCierre, cerrado)}</Card>
        </Box>
        </>
    );
}