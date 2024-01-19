import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ProductoForm from './formProducto';
import SuccessfulNotification from '@/components/notifications/successfulNotification';
import { useRouter } from 'next/router';

interface Props {
  producto ?: {}
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function DetailForm({producto} : Props) {
  const [modalSuccessful, setModalSuccessful] = React.useState(false)
  const router = useRouter();
  const { id } = router.query;

  function getParams() {
    let name = document.getElementById("nombre")
    let precio = document.getElementById("precio")
    let stock = document.getElementById("stock")
    let recompensaPuntosDeConfianza = document.getElementById("puntosDeConfianza")
    
    // @ts-ignore
    let params = `?nombreDelProducto=${name.value}&stock=${stock.value}&precio=${precio.value}&recompensaPuntosDeConfianza=${recompensaPuntosDeConfianza.value}`
    return params
  }

  function patchProducto () {
    let params = getParams()
    // @ts-ignore
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos/${producto['id']}${params}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error en la creación del recurso');
      }
    })
    .then(() => {
      setModalSuccessful(true);
    })
    // @ts-ignore
    .catch((error) => {
      console.error('Error:', error);
      // setErrorMessage('No se pudo crear la tarea. Ingreso de valor inválido');
     })
  }

  const handleGuardar = () => {
    if (producto && Object.keys(producto).length > 0) {
      patchProducto()
      return 
    }
    let params = getParams()
    // @ts-ignore
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos/${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error en la creación del recurso');
      }
    })
    .then(() => {
      setModalSuccessful(true);
    })
    // @ts-ignore
    .catch((error) => {
      console.error('Error:', error);
      // setErrorMessage('No se pudo crear la tarea. Ingreso de valor inválido');
     })

  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container id="containerForm" component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Producto
          </Typography>
          
            <ProductoForm producto={producto}/>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
                variant="contained"
                onClick={() => router.back()}
                sx={{ mt: 3, ml: 1 }}
              >
                Volver
              </Button>
              <Button
                variant="contained"
                onClick={handleGuardar}
                sx={{ mt: 3, ml: 1 }}
              >
                Guardar
              </Button>
            </Box>
        </Paper>
        <Copyright />
      </Container>
      {modalSuccessful && (
        <SuccessfulNotification titleAction="guardado" actionPage={() => router.push(`/negocios/${id}`)}/>
      )}  
    </React.Fragment>
  );
}