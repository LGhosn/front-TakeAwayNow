import { useEffect, useState } from "react";
import DetailForm from "./detail";
import Loading from "@/components/loading";
import { useRouter } from "next/router";
import ModalForm from "@/components/modalForm";

export default function Producto() {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const { negocioId, productoId } = router.query;
  const [productForm, setProductForm] = useState([])

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
      : <ModalForm initialOpen={true} handleClose={() => console.log('hola')} fields={productForm} title="Productos"/>
    }
    </>
  )
}
