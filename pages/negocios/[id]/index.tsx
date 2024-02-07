import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ProductoGridRow from "@/components/productoGridRow";
import OutlinedCard from "@/components/outlinedCard";
import { SideBar } from "@/components/sideBar";
import { negociosSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfoCard from "@/components/infoCard";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import AddButton from "@/components/addButton";
import ProductosOverView from "@/components/productos/productosOverView";
import { CartProvider } from "@/context/context";

export default function Negocio() {
  const router = useRouter();
  const { id } = router.query;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [negocio, setNegocio] = useState({})

  useEffect(() => {
    fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${id}/productos`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setProductos(res)
    })

    const negocioFromLocalStorage = localStorage.getItem('negocio');
    if (negocioFromLocalStorage !== null) {
      console.log(negocioFromLocalStorage)
      setNegocio(JSON.parse(negocioFromLocalStorage));
    }

  }, [id])

  useEffect(() => {
    if (productos.length > 0) {
      setLoading(false)
    }
  }, [productos])

  // Función para aplicar filtros por columna
  const searchByTitulo = (columnIndex: string | number, filterValue: string) => {
    if (filterValue == "") {
      setProductos(productos);
      return;
    }
    const filtered = productos.filter((item: { [x: string]: any; }) => {
      //@ts-ignore
      const cellValue = item[Object.keys(item)[columnIndex]];
      return cellValue.toLowerCase().includes(filterValue.toLowerCase());
    });

    setProductos(filtered);
  };

  return (
    <>
    {
      loading ? <Loading /> :
      <CartProvider>
      <div className="flex flex-row">
      {/* @ts-ignore */}
      <SideBar items={negociosSideBarItems(id, negocio['nombre'])}></SideBar>
      <div className="container max-w-7xl mx-auto mt-8 ml-3">
        <div className="flex flex-row items-center justify-between p-2 mb-4">
          <div>
            <PedidosOverView idNegocio={id}></PedidosOverView>
          </div>
          {/* @ts-ignore */}
          <InfoCard  info={negocio}/>
        </div>
        <ProductosOverView productos={productos} negocioId={id}></ProductosOverView>
      </div>
      </div>
      </CartProvider>
    }
  </>
  )
}
