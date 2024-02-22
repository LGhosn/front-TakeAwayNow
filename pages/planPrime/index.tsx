import React, { use, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, createTheme, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { SideBar } from '@/components/sideBar';
import { clientesSideBarItems } from '@/utils/routes';
import ModalForm from '@/components/modalForm';
import ErrorModal from '@/components/notifications/errorMessageModal';
import SuccessfulNotification from '@/components/notifications/successfulNotification';

const style = {
  root: {
    marginTop: 4,
    marginBottom: 4,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: 3,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  media: {
    width: 150,
    height: 150,
    marginBottom: 2,
  },
};

const PrimeBenefitsPage = () => {
    const router = useRouter();
    const { idCliente } = router.query;
    const [formPrime, setFormPrime] = React.useState(false);
    const [formBirthday, setFormBirthday] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [plan, setPlan] = React.useState([]);
    const [infoCliente, setInfoCliente] = React.useState([])

    useEffect(() => {
      if (idCliente) {
        // Traemos la info del cliente.
        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${idCliente}`)
        .then((res) => {
            return res.json()
        }).then(async (res) => {
            setInfoCliente(await res)
        })
    }
    },[idCliente])

    useEffect(() => {
        fetch(`https://takeawaynow-dcnt.onrender.com/api/planes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) {
                setErrorMessage(await res.text());
            } else {
                setPlan(await res.json());
            }
        })
    }, [])
    
    function confirmarPrime() {
      // @ts-ignore
      if (infoCliente['fechaDeNacimiento'] === null) {
          setFormBirthday(true);
      } else {
          setFormPrime(true);
      }
    }

    function setFechaNacimiento() {
        const fechaNacimiento = (document.getElementById("fechaNacimiento") as HTMLInputElement).value.split('-');
        if (fechaNacimiento.length === 1) {
            setFormBirthday(false);
            setErrorMessage("La fecha de nacimiento no puede estar vacía")
            return
        }

        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${idCliente}/establecerFechaDeNacimiento?yyyy=${fechaNacimiento[0]}&mm=${fechaNacimiento[1]}&dd=${fechaNacimiento[2]}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) {
                setErrorMessage(await res.text());
            } else {
                setSuccessMessage(await res.text())
            }
        }).then(() => {
            setFormBirthday(false);
        })
    }

    function obtenerPrime() {
        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${idCliente}/obtenerPlanPrime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
          setFormBirthday(false);
          setFormPrime(false);  
          if (!res.ok) {
              setErrorMessage(await res.text());
          } else {
              setSuccessMessage(await res.text())
          }
        })
    }

  return (
    <>
    <div className="flex flex-row">
    <SideBar items={clientesSideBarItems(idCliente)}></SideBar>
    <Container maxWidth="lg" sx={style.root}>
      <Typography className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
        TakeAwayNow Prime
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={style.card}>
            <CardMedia
              sx={style.media}
              image="https://www.deptagency.com/wp-content/uploads/2021/04/takeaway4-scaled.jpg"
              title="Envío rápido y gratuito"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                %25 OFF en los pedidos y puntos dobles
              </Typography>
              <Typography variant="body1">
                Obtén un descuento del %25 en todos los pedidos que realices. 
                Además obtendrás el doble de puntos en cada pedido que realices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={style.card}>
            <CardMedia
              sx={style.media}
              image="https://comharlinnintocu.ie/media/4dxhd3pq/thumbnail-money-food.png?anchor=center&mode=crop&width=668&height=463"
              title="Prime Video"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Devolución de pedidos
              </Typography>
              <Typography variant="body1">
                En caso que no estés satisfecho con tu pedido, podrás devolverlo y obtener un reembolso completo.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={style.card}>
            <CardMedia
              sx={style.media}
              image="https://images.immediate.co.uk/production/volatile/sites/30/2023/02/layered-birthday-cake-a2248a3.jpg?quality=90&webp=true&resize=1000,900"
              title="Prime Music"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Beneficio por cumpleaños
              </Typography>
              <Typography variant="body1">
                Por ser Prime, obtendrás puntos extras y un descuento del %100 en uno de nuestros productos del día de tu cumpleaños.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        {
        //@ts-ignore 
        infoCliente['plan'] === null ? 
        <Grid item xs={12} sm={12} className="flex justify-center items-end">
            <Button variant="contained" color="success" className="w-full" onClick={confirmarPrime}>
            Obtener Prime
            </Button>
        </Grid>
        : 
        <Grid item xs={12} sm={12} className="flex justify-center items-end">
            <Typography color="success" className="w-full">
            Ya eres Prime!
            </Typography>
        </Grid>
        }
      </Grid>
    </Container>
    </div>
    {formBirthday && 
    <ModalForm handleSave={setFechaNacimiento} 
      handleClose={() => setFormBirthday(false)} title="Fecha de nacimiento"
      fields={[{id: 'fechaNacimiento', name: 'fechaNacimiento', label: '', type: 'date'}]}
    />
    }
    {formPrime && 
    <ModalForm handleSave={obtenerPrime} 
      // @ts-ignore
      handleClose={() => setFormPrime(false)} title={`Obtener Plan ${plan[0].nombre} por $${plan[0].precio.monto}`}
      fields={[]}
      titleAction='Obtener Prime'
    />
    }
    { errorMessage && <ErrorModal action= {() => {setErrorMessage("")}} value={errorMessage}/> }
    { successMessage && <SuccessfulNotification message={successMessage} actionPage={() => {setSuccessMessage(""); router.reload()}}/> }
    </>
  );
};

export default PrimeBenefitsPage;
