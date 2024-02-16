import Loading from "@/components/loading";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import ProductosOverView from "@/components/productos/productosOverView";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { SideBar } from "@/components/sideBar";
import ModalCarrito from "@/components/cart/modalCarrito";
import { CartProvider } from "@/context/context";

export default function Productos() {
  const router = useRouter();
  const { id, idCliente } = router.query;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    if (id) {
      fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/productos`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setProductos(res)
        if (productos.length == 0) {
          setLoading(false)
        }
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
          <CartProvider>
          <div className="flex flex-row">
            {/* @ts-ignore */}
            <SideBar items={clientesSideBarItems(idCliente)}></SideBar>
            <div className="container mx-auto mt-8 ml-6">
              <ProductosOverView cliente={true} productos={productos} negocioId={id}></ProductosOverView>
              <ModalCarrito/>
            </div>
          </div>
          </CartProvider>
    }
    </>
  )
}