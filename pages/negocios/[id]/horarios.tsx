import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ModalForm from '@/components/modalForm';
import { useRouter } from 'next/router';
import Loading from '@/components/loading';
import SuccessfulNotification from '@/components/notifications/successfulNotification';
import {useState} from "react";
import ErrorModal from "@/components/notifications/errorMessageModal";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Horarios() {
  const router = useRouter()
  const { id } = router.query
  const [loading, setLoading] = React.useState(true)
  const [negocio, setNegocio] = React.useState({})
  const [open, setOpen] = React.useState(true);
  const [fields, setFields] = React.useState([])
  const [modalSuccessful, setModalSuccessful] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  
  React.useEffect(() => {
    const negocioFromLocalStorage = localStorage.getItem('negocio')
    if (negocioFromLocalStorage !== null) {
      setNegocio(JSON.parse(negocioFromLocalStorage))
    }
  }, [])

  React.useEffect(() => {
    if (Object.keys(negocio).length > 0) {
      const campos = [
        // @ts-ignore
        {id: 'diaDeApertura', name: 'diaDeApertura', label: 'Dia de Apertura', defaultValue: negocio['diaDeApertura']},
        // @ts-ignore
        {id: 'diaDeCierre', name: 'diaDeCierre', label: 'Dia de Cierre', defaultValue: negocio['diaDeCierre']},
        // @ts-ignore
        {id: 'horarioDeApertura', name: 'horarioDeApertura', label: 'Horario de Apertura',  defaultValue: negocio['horarioDeApertura']},
        // @ts-ignore
        {id: 'horarioDeCierre', name: 'horarioDeCierre', label: 'Horario de Cierre', defaultValue: negocio['horarioDeCierre']},
      ]
      // @ts-ignore
      setFields(campos)
      setLoading(false)
    }
  }, [negocio])
  
  const handleClose = () => router.back();

  function getParamsHorarios() {
    const horarioApertura = (document.getElementById('horarioDeApertura') as HTMLInputElement)?.value.split(':')
    const horarioCierre = (document.getElementById('horarioDeCierre') as HTMLInputElement)?.value.split(':')
    const params = `?horaApertura=${horarioApertura[0]}&minutoApertura=${horarioApertura[1]}&horaCierre=${horarioCierre[0]}&minutoCierre=${horarioCierre[1]}`
    return params;
  }

  function getParamsDias() {
    const diaApertura = (document.getElementById('diaDeApertura') as HTMLInputElement)?.value
    const diaCierre = (document.getElementById('diaDeCierre') as HTMLInputElement)?.value
    const params = `?diaDeApertura=${diaApertura}&diaDeCierre=${diaCierre}`
    return params;
  }

  function handleSave() {
    const paramsHorarios = getParamsHorarios();
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/horariosDeTrabajo${paramsHorarios}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (res) => {
      if (!res.ok) {
        setErrorMessage(await res.text())
        return;
      } else {
        setSuccessMessage(await res.text())
      }
    })
    .catch((error) => {
      console.error('Error:', error);
     })

    const paramsDias = getParamsDias();
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/diasDeTrabajo${paramsDias}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (res) => {
      if (!res.ok) {
        setErrorMessage(await res.text())
        return;
      } else {
        setSuccessMessage(await res.text())
      }
    })
    .then(() => {
      //@ts-ignore
      negocio['horarioDeApertura'] = (document.getElementById('horarioDeApertura') as HTMLInputElement)?.value
      //@ts-ignore
      negocio['horarioDeCierre'] = (document.getElementById('horarioDeCierre') as HTMLInputElement)?.value
      //@ts-ignore
      negocio['diaDeApertura'] = (document.getElementById('diaDeApertura') as HTMLInputElement)?.value
      //@ts-ignore
      negocio['diaDeCierre'] = (document.getElementById('diaDeCierre') as HTMLInputElement)?.value
      localStorage.setItem('negocio', JSON.stringify(negocio))
      //setModalSuccessful(true);
    })
    .catch((error) => {
      console.error('Error:', error);
     })
  }

  return (
    <>
    { loading ? <Loading /> :
        errorMessage ? <ErrorModal action= { () => setErrorMessage("")} value={errorMessage}/> :
            successMessage ? <SuccessfulNotification message={successMessage} actionPage={ () => { setSuccessMessage(""); router.push(`/negocios/${id}`) }}/> :
                              <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>
                                  <ModalForm handleSave={handleSave} handleClose={handleClose} fields={fields} title="Horarios"/>
                                </Box>
                              </Modal>
                              }
                            </>
  );
}
