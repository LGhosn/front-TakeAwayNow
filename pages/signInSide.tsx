import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import SuccessfulNotification from '@/components/notifications/successfulNotification';
import ErrorModal from '@/components/notifications/errorMessageModal';
import router from 'next/router';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [isClientePressed, setClientePressed] = useState(true);
  const [isNegocioPressed, setNegocioPressed] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  function closeErrorMessage() { setErrorMessage('') }

  React.useEffect(() => {
    fetch("https://dcnt-take-away-now.onrender.com/api/negocios/")
    .then((res) => {
        return res.json()
    }).then((res) => {
      setNegocios(res)
    })

    fetch("https://dcnt-take-away-now.onrender.com/api/clientes/")
    .then((res) => {
        return res.json()
    }).then((res) => {
      setClientes(res)
    })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nombre = data.get('Nombre');

    if (!isClientePressed && !isNegocioPressed) {
      setErrorMessage('Seleccione si es cliente o negocio')
      return
    }
    
    var path
    if (isNegocioPressed) {
      path = '/negocios/'
          //@ts-ignore
      const negocio = negocios.find((negocio) => negocio.nombre === nombre);
      if (negocio) {
        localStorage.setItem('saldo', JSON.stringify(negocio['saldo']['monto']))
        localStorage.setItem('nombre', JSON.stringify(negocio['nombre']))

        //@ts-ignore
        router.push(`${path}${negocio.id}`)
      } else {
        setErrorMessage('Verifique que el nombre esté bien escrito')
      }
    } else {
      path = '/clientes/'
      //@ts-ignore
      const cliente = clientes.find((cliente) => cliente.usuario === nombre);
      if (cliente) {
        localStorage.setItem('saldo', JSON.stringify(cliente['saldo']['monto']))
        //@ts-ignore
        router.push(`${path}${cliente.id}`)
      } else {
        setErrorMessage('Verifique que el nombre esté bien escrito')
      }
    }

  };

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.deptagency.com/wp-content/uploads/2021/04/takeaway4-scaled.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Bienvenid@!
            </Typography>
            <Grid container columns={1} rowSpacing={3}>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    type="button"
                    variant={isClientePressed ? 'outlined' : 'contained'}
                    onClick={() => {setClientePressed(!isClientePressed); setNegocioPressed(false)}}
                  >
                    Cliente
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    type="button"
                    variant={isNegocioPressed ? 'outlined' : 'contained'}
                    onClick={() => {setNegocioPressed(!isNegocioPressed); setClientePressed(false)}}
                  >
                    Negocio
                  </Button>
                </Grid>
              </Grid>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Nombre"
                label="Nombre"
                name="Nombre"
                autoComplete="Nombre"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

    {errorMessage &&
          <ErrorModal action= {closeErrorMessage} value={errorMessage}/>
    }
    </>
  );
}
