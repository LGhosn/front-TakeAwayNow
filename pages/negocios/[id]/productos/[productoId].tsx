import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import ModalForm from "@/components/modalForm";
import SuccessfulNotification from "@/components/notifications/successfulNotification";

export default function Producto() {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const { id, productoId } = router.query;
  const [productForm, setProductForm] = useState([])
  const [modalSuccessful, setModalSuccessful] = useState(false)

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
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos/${productoId}${params}`, {
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
        {id: 'puntosDeConfianza', name: 'puntosDeConfianza', label: 'Puntos de Confianza', defaultValue: producto['recompensaPuntosDeConfianza']['cantidad']}
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
    { loading ? <Loading />
      : modalSuccessful ? (
        <SuccessfulNotification titleAction="guardado" actionPage={() => router.push(`/negocios/${id}`)}/>
      ) 
      : <ModalForm handleSave={handleGuardar} handleClose={() => router.back()} fields={productForm} title="Productos"/>
    }
    </>
  )
}
