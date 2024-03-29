import ModalForm from "@/components/modalForm"
import ErrorModal from "@/components/notifications/errorMessageModal";
import SuccessfulNotification from "@/components/notifications/successfulNotification"
import { useRouter } from "next/router";
import { useState } from "react"

export default function CrearProducto( {handleClose} : any) {
  const [modalSuccessful, setModalSuccessful] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [fields, setFields] = useState([
    {id: 'nombre', name: 'nombre', label: 'Nombre'},
    {id: 'precio', name: 'precio', label: 'Precio', type: 'number'},
    {id: 'stock', name: 'stock', label: 'Stock', type: 'number'},
    {id: 'preciopuntosDeConfianza', name: 'preciopuntosDeConfianza', label: 'Precio Puntos de confianza', type: 'number'},
    {id: 'puntosDeConfianza', name: 'puntosDeConfianza', label: 'Recompensa Puntos de confianza', type: 'number'},
  ])
  const router = useRouter();
  const { id } = router.query;


  function getParams() {
    let name = document.getElementById("nombre")
    let precio = document.getElementById("precio")
    let stock = document.getElementById("stock")
    let recompensaPuntosDeConfianza = document.getElementById("puntosDeConfianza")
    let precioPuntosDeConfianza = document.getElementById("preciopuntosDeConfianza")
    
    // @ts-ignore
    if (stock.value < 0) {
      setErrorMessage("El stock del producto no puede ser negativo.")
      return false;
    }

    // @ts-ignore
    if (stock.value.includes(".") || stock.value.includes(",")) {
      setErrorMessage("El stock del producto tiene que ser un numero entero.");
      return false;
    }

    // @ts-ignore
    if (precio.value <= 0) {
      setErrorMessage("El precio del producto no puede ser negativo o cero.")
      return false;

    }

    // @ts-ignore
    if (recompensaPuntosDeConfianza.value <= 0) {
      setErrorMessage("La recompensa de puntos de confianza del producto no puede ser negativa o cero.")
      return false;

    }

    // @ts-ignore
    if (precioPuntosDeConfianza.value <= 0) {
      setErrorMessage("La recompensa de puntos de confianza del producto no puede ser negativa o cero.")
      return false;
    }

    // @ts-ignore
    let params = `?nombreDelProducto=${name.value}&stock=${stock.value}&precio=${precio.value}&recompensaPuntosDeConfianza=${recompensaPuntosDeConfianza.value}&precioPdc=${precioPuntosDeConfianza.value}`
    return params
  }

  const handleGuardar = () => {
    let params = getParams()
    if (!params) {
      return
    }
    // @ts-ignore
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/productos/${params}`, {
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
    {modalSuccessful ? <SuccessfulNotification actionPage={() => router.reload()} message="El producto ha sido creado correctamente." /> : 
     errorMessage ? <ErrorModal value={errorMessage} action={() => setErrorMessage("")} /> :

      <ModalForm 
      handleSave={() => handleGuardar()} 
      handleClose={handleClose} title="Producto"
      fields={fields}
      /> 
    }
    </>
  )
}