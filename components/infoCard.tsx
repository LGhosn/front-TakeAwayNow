import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import OutlinedCard from './outlinedCard';
import { useRouter } from 'next/router';
import ModalForm from './modalForm';
import ErrorModal from './notifications/errorMessageModal';
import SuccessfulNotification from './notifications/successfulNotification';

interface CardProps {
  info ?: {}
  router ?: any
  cliente ?: boolean
  abrirModalSaldo ?: any
}

const card = ({router, info, cliente, abrirModalSaldo} : CardProps) => (
  <>
  <CardContent  className="flex flex-col items-center" >
    {info && info.hasOwnProperty('nombre') && (
      <Typography sx={{ mb: 2, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        {/* @ts-ignore */}
        {info['nombre']}
      </Typography>
    )}
    {info && info.hasOwnProperty('usuario') && (
        <Typography sx={{ mb: 2, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
          {/* @ts-ignore */}
          {"Bienvenido nuevamente " + info['usuario']}
        </Typography>

    )}
    {info && info.hasOwnProperty('diaDeApertura') && (
      <Typography 
        className="cursor-pointer hover:text-blue-400" 
        sx={{ mb: 2, fontSize: 12, textAlign: 'center' }} 
        color="text.secondary" 
        variant="h1"
        onClick={() => {
          localStorage.setItem('negocio', JSON.stringify(info))
          // @ts-ignore
          router.push(`/negocios/${info['id']}/horarios`) 
        }}
        >
        {/* @ts-ignore */}
        {info['diaDeApertura']} - {info['diaDeCierre']} / {info['horarioDeApertura']} - {info['horarioDeCierre']}
      </Typography>
    )}
    {info && info.hasOwnProperty('saldo') && (
      <Typography 
      sx={{ mb: 1, fontSize: 24, textAlign: 'center' }} 
      color="text.primary" 
      variant="h1"
      className={cliente ? "cursor-pointer hover:text-blue-400" : ""}
      onClick = {abrirModalSaldo}
      id="saldo">
        {/* @ts-ignore */}
        Saldo: ${info['saldo']['monto']}
      </Typography>
    )}
    {info && info.hasOwnProperty('puntosDeConfianza') && (
      <Typography sx={{ mb: 3, fontSize: 24, textAlign: 'center' }} color="text.primary" variant="h1">
        {/* @ts-ignore */}
        Puntos de confianza: {info['puntosDeConfianza']['cantidad']}
      </Typography>
    )}
  </CardContent>
  </>
);

export default function InfoCard({info} : CardProps) {
  const router = useRouter()
  const [cliente, setCliente] = React.useState(router.pathname.includes('cliente'))
  const [openModalSaldo, setOpenModalSaldo] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function abrirModalSaldo() {
    if (!cliente) return
    setOpenModalSaldo(true)
  }

  async function mostrarResultadoEstimulo(res: Response) {
    if (!res.ok) {
        setErrorMessage(await res.text())
    } else {
        setSuccessMessage(await res.text())
    }
  }

  function cargarSaldo() {
    let montoElement = document.getElementById('monto');
    let monto = montoElement instanceof HTMLInputElement ? montoElement.value : null;
    // @ts-ignore
    fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${info['id']}/cargaDeSaldo/${monto}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        setErrorMessage(await res.text());
      } else {
        setSuccessMessage(await res.text())
      }
      setOpenModalSaldo(false);
    })
  }

  return (
    <>
    {openModalSaldo && 
      <ModalForm 
        title="Cargar Saldo" 
        fields={[{id: 'monto', name: 'monto', label: 'Monto', type: 'number'}]} 
        titleAction="Cargar"
        handleClose={() => setOpenModalSaldo(false)}
        handleSave={cargarSaldo}
      />
      }
    <OutlinedCard>
      {card({router, info, cliente, abrirModalSaldo})}
    </OutlinedCard>
    { errorMessage && <ErrorModal action= { () => {setErrorMessage(""); router.reload()} } value={errorMessage}/> }
    { successMessage && <SuccessfulNotification actionPage={ ()=> { setSuccessMessage(""); router.reload() }} message={successMessage} /> }
    </>
  );
}