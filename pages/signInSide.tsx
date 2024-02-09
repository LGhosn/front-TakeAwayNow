import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import SuccessfulNotification from '@/components/notifications/successfulNotification'
import ErrorModal from '@/components/notifications/errorMessageModal';
import router from 'next/router';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import {formatearMinutos} from "@/utils/utils";
import { Divider } from '@mui/material';
import {borderTop} from "@mui/system";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  const [isClientePressed, setClientePressed] = useState(true);
  const [isNegocioPressed, setNegocioPressed] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");

  function closeErrorMessage() { setErrorMessage('') }
  function closeSuccessMessage() { setSuccessMessage('') }

  React.useEffect(() => {
    fetch("https://takeawaynow-dcnt.onrender.com/api/negocios/")
    .then((res) => {
        return res.json()
    }).then((res) => {
      setNegocios(res)
    })

    fetch("https://takeawaynow-dcnt.onrender.com/api/clientes/")
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

    if (!nombre) {
      setErrorMessage('El campo del nombre se encuentra incompleto.')
      return
    }
    
    let path
    if (isNegocioPressed) {
      path = '/negocios/'
          //@ts-ignore
      const negocio = negocios.find((negocio) => negocio.nombre === nombre);
      if (negocio) {
        localStorage.setItem('negocio', JSON.stringify(negocio))

        //@ts-ignore
        router.push(`${path}${negocio.id}`)
      } else {
        setErrorMessage('Verifique que el nombre del negocio esté bien escrito.')
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
        setErrorMessage('Verifique que el nombre del cliente esté bien escrito.')
      }
    }

  };

  const handleClienteSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const NombreDelCliente = formData.get('NombreNuevoCliente');

    if (!NombreDelCliente) {
      setErrorMessage('Ingrese su nombre de cliente para registrarse.')
      return
    }

    await fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/?nombreUsuario=${NombreDelCliente}`,
        {
          method: 'POST',
          body: JSON.stringify(NombreDelCliente),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(async (res) => {
          if (!res.ok) {
            setErrorMessage(await res.text())
          } else {
            setSuccessMessage(await res.text())
          }
        })
  };

  const handleNegocioSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const NombreDelNegocio = formData.get('NombreNuevoNegocio');
    const DiaDeApertura = formData.get('DiaDeApertura');
    const DiaDeCierre = formData.get('DiaDeCierre');
    const HoraDeApertura = formData.get('HoraDeApertura');
    const HoraDeCierre = formData.get('HoraDeCierre');
    const MinutoDeApertura = formData.get('MinutoDeApertura');
    const MinutoDeCierre = formData.get('MinutoDeCierre');

    // Verificamos si algún campo requerido está vacío
    if (!NombreDelNegocio || !DiaDeApertura ) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    await fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/?nombre=${NombreDelNegocio}&diaDeApertura=${DiaDeApertura}&diaDeCierre=${DiaDeCierre}&horaApertura=${HoraDeApertura}&minutoApertura=${MinutoDeApertura}&horaCierre=${HoraDeCierre}&minutoCierre=${MinutoDeCierre}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(async (res) => {
          if (!res.ok) {
            setErrorMessage(await res.text())
          } else {
            setSuccessMessage(await res.text())
          }
        })
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
                sx={{ mt: 1, mb: 1 }}
              >
                Iniciar Sesión
              </Button>
            </Box>
            <Box component="form" noValidate onSubmit={handleClienteSignUp} sx={{ mt: 3, borderTop: '1px solid black', width: '100%' }} >
              <Typography textAlign={"center"} component="h2" variant="h5" sx={{ mt: 1}}>
                Aún no estás registrad@ ?
              </Typography>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="NombreNuevoCliente"
                  label="Ingrese su nombre de cliente"
                  name="NombreNuevoCliente"
                  autoFocus
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Registrar cliente
              </Button>
            </Box>
            <Box component="form" noValidate onSubmit={handleNegocioSignUp} sx={{ mt: 1, borderTop: '1px solid black', width: '100%' }}>
              <Typography textAlign={"center"} component="h2" variant="h5" sx={{ mt: 1}}>
                Aún no registraste tu negocio ?
              </Typography>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="NombreNuevoNegocio"
                  label="Ingrese el nombre de su negocio"
                  name="NombreNuevoNegocio"
                  autoFocus
              />
              Abierto de
              <Select
                  id="DiaDeApertura"
                  name="DiaDeApertura"
                  label="Dia de apertura"
                  sx={{ ml: 1, mr: 1 }}
              >
                <MenuItem value={"MONDAY"}>Lunes</MenuItem>
                <MenuItem value={"TUESDAY"}>Martes</MenuItem>
                <MenuItem value={"WEDNESDAY"}>Miércoles</MenuItem>
                <MenuItem value={"THURSDAY"}>Jueves</MenuItem>
                <MenuItem value={"FRIDAY"}>Viernes</MenuItem>
                <MenuItem value={"SATURDAY"}>Sabado</MenuItem>
                <MenuItem value={"SUNDAY"}>Domingo</MenuItem>
              </Select>
              a
              <Select
                  id="DiaDeCierre"
                  name="DiaDeCierre"
                  label="Dia de cierre"
                  sx={{ ml: 1, mr: 1 }}
              >
                <MenuItem value={"MONDAY"}>Lunes</MenuItem>
                <MenuItem value={"TUESDAY"}>Martes</MenuItem>
                <MenuItem value={"WEDNESDAY"}>Miércoles</MenuItem>
                <MenuItem value={"THURSDAY"}>Jueves</MenuItem>
                <MenuItem value={"FRIDAY"}>Viernes</MenuItem>
                <MenuItem value={"SATURDAY"}>Sabado</MenuItem>
                <MenuItem value={"SUNDAY"}>Domingo</MenuItem>
              </Select>
              de
              <Select
                  id="HoraDeApertura"
                  name="HoraDeApertura"
                  label="Hora de apertura"
                  sx={{ ml: 1, mr: 1 }}
                  onChange={ () => {} }
              >
                {
                  Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={i}>{formatearMinutos(i)}</MenuItem>
                  ))
                }
              </Select>
              :
              <Select
                  id="MinutoDeApertura"
                  name="MinutoDeApertura"
                  label="Minuto de apertura"
                  sx={{ ml: 1, mr: 1 }}
              >
                {
                  Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i * 5} value={i * 5}> {formatearMinutos(i*5)}</MenuItem>
                  ))
                }
              </Select>hs a
              <Select
                  id="HoraDeCierre"
                  name="HoraDeCierre"
                  label="Hora de cierre"
                  sx={{ ml: 1, mr: 1 }}
              >
                {
                  Array.from({ length: 24 }, (_, i) => (
                      <MenuItem key={i} value={i}>{formatearMinutos(i)}</MenuItem>
                  ))
                }
              </Select>
              :
              <Select
                  id="MinutoDeCierre"
                  name="MinutoDeCierre"
                  label="Minuto de cierre"
                  sx={{ ml: 1, mr: 1 }}
              >
                {
                  Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i * 5} value={i * 5}> {formatearMinutos(i*5)}</MenuItem>
                  ))
                }
              </Select>
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
              >
                Registrar negocio
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    { errorMessage && <ErrorModal action= {closeErrorMessage} value={errorMessage}/> }
    { successMessage && <SuccessfulNotification message={successMessage} actionPage={closeSuccessMessage}/> }
    </>
  );
}
