import ModalForm from "@/components/modalForm"
import SuccessfulNotification from "@/components/notifications/successfulNotification"
import { useRouter } from "next/router";
import { useState } from "react"

export default function CrearProducto() {
  const [modalSuccessful, setModalSuccessful] = useState(false)
  const [fields, setFields] = useState([
    {id: 'nombre', name: 'nombre', label: 'Nombre'},
    {id: 'precio', name: 'precio', label: 'Precio', type: 'number'},
    {id: 'stock', name: 'stock', label: 'Stock', type: 'number'},
    {id: 'puntosDeConfianza', name: 'puntosDeConfianza', label: 'Puntos de confianza', type: 'number'},
  ])
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

  const handleGuardar = () => {
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
    <>
    {
      modalSuccessful ? (
      <SuccessfulNotification actionPage={() => router.back()} titleAction="guardado" /> )
      :
      <ModalForm 
      handleSave={() => handleGuardar()} 
      handleClose={() => router.reload()} title="Producto"
      fields={fields}
      /> 
    }
    </>
  )
}