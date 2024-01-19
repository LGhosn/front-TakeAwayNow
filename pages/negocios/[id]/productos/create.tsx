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

export default function CreateForm() {
  const [modalSuccessful, setModalSuccessful] = React.useState(false)
  const router = useRouter();
  const { id } = router.query;

  const handleCreateProducto = () => {
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Producto
          </Typography>
          
          <React.Fragment>
            <ProductoForm />
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
                onClick={handleCreateProducto}
                sx={{ mt: 3, ml: 1 }}
              >
                Guardar
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
      {modalSuccessful && (
        <SuccessfulNotification titleAction="guardado" actionPage={() => router.push(`/negocios/${id}`)}/>
      )}  
    </React.Fragment>
  );
}