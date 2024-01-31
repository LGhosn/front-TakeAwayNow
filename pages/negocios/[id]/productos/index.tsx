import Loading from "@/components/loading";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import ProductosOverView from "@/components/productos/productosOverView";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { SideBar } from "@/components/sideBar";
import Carrito from "@/components/carrito";
import { CartProvider } from "@/context/context";

export default function Productos() {
  const router = useRouter();
  const { id, idCliente } = router.query;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    if (id) {
      fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setProductos(res)
      })
    }
  }, [id])

  useEffect(() => {
    if (productos.length > 0) {
      setLoading(false)
    }
  }, [productos])
  
  return (
    <>
    {loading ? <Loading/>: 
          loading ? <Loading /> :
          <CartProvider>
          <div className="flex flex-row">
            {/* @ts-ignore */}
            <SideBar items={clientesSideBarItems(id)}></SideBar>
            <div className="container mx-auto mt-8 ml-6">
              <ProductosOverView cliente={true} productos={productos} negocioId={id}></ProductosOverView>
              <Carrito idCliente={idCliente}/>
            </div>
          </div>
          </CartProvider>
    }
    </>
  )
}