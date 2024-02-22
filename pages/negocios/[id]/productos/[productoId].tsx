import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import ModalForm from "@/components/modalForm";
import SuccessfulNotification from "@/components/notifications/successfulNotification";
import ErrorModal from "@/components/notifications/errorMessageModal";
import * as React from "react";

export default function Producto( {handleClose, productoId} : any) {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const { id, } = router.query;
  const [productForm, setProductForm] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
  function patchProducto () {
    let params = getParams()
    if (!params) {
      return
    }
    // @ts-ignore
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/productos/${productoId}${params}`, {
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
  }

  const handleGuardar = () => {
    if (producto && Object.keys(producto).length > 0) {
      patchProducto()
      return 
    }
    let params = getParams()
    // @ts-ignore
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/productos/${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async (res) => {
      if (!res.ok) {
        setErrorMessage(await res.text())
      } else {
        setSuccessMessage(await res.text())
      }
    })

  };

  useEffect(() => {
    const productoLocalStorage = localStorage.getItem('producto');
    if (productoLocalStorage !== null) {
      setProducto(JSON.parse(productoLocalStorage));
    }
  }, [])

  useEffect(() => {
    if (producto && Object.keys(producto).length > 0) {
      console.log(producto)
      const fields = [
        // @ts-ignore 
        {id: 'nombre', name: 'nombre', label: 'Nombre', defaultValue: producto['nombre']},
        // @ts-ignore 
        {id: 'precio', name: 'precio', label: 'Precio', type: 'number', defaultValue: producto['precio']['monto']},
        // @ts-ignore 
        {id: 'stock', name: 'stock', label: 'stock', defaultValue: producto['stock']},
        // @ts-ignore 
        {id: 'preciopuntosDeConfianza', name: 'preciopuntosDeConfianza', label: 'Precio Puntos de Confianza', defaultValue: producto['precioPdc']['cantidad']},
        // @ts-ignore 
        {id: 'puntosDeConfianza', name: 'puntosDeConfianza', label: 'Recompensa Puntos de Confianza', defaultValue: producto['recompensaPuntosDeConfianza']['cantidad']},
      ]
      // @ts-ignore
      setProductForm(fields)
    }
  }, [producto])

  useEffect(() => {
    if (productForm.length > 0) {
      setLoading(false)
    }
  }, [productForm])

  return (
    <>
    { loading ? <Loading /> :
        errorMessage ? <ErrorModal action= { () => setErrorMessage("")} value={errorMessage}/> :
          successMessage ? <SuccessfulNotification message={successMessage} actionPage={ () => { setSuccessMessage(""); router.reload() }}/> :
            <ModalForm handleSave={handleGuardar} handleClose={handleClose} fields={productForm} title="Productos"/>
    }
    </>
  )
}
