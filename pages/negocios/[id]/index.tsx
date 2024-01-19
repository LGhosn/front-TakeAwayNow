import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ProductoGridRow from "@/components/productoGridRow";
import OutlinedCard from "@/components/outlinedCard";
import { SideBar } from "@/components/sideBar";
import { negociosSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SaldoCard from "@/components/saldoCard";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import AddButton from "@/components/addButton";
import ProductosOverView from "@/components/productos/productosOverView";

export default function Negocio() {
  const router = useRouter();
  const { id } = router.query;
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [saldo, setSaldo] = useState(0)
  const [nombreNegocio, setNombreNegocio] = useState('')

  useEffect(() => {
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setProductos(res)
    })
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/pedidos/`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setPedidos(res)
    })


    const saldoFromLocalStorage = localStorage.getItem('saldo');
    if (saldoFromLocalStorage !== null) {
      setSaldo(JSON.parse(saldoFromLocalStorage));
    }
    const nombreNegocioFromLocalStorage = localStorage.getItem('nombre');
    if (nombreNegocioFromLocalStorage !== null) {
      setNombreNegocio(JSON.parse(nombreNegocioFromLocalStorage));
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
      <div className="flex flex-row">
      <SideBar items={negociosSideBarItems(id, nombreNegocio)}></SideBar>
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="flex flex-row items-center justify-between p-2 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-black decoration-gray-400">Pedidos</h1>
            <PedidosOverView pedidos={pedidos}></PedidosOverView>
          </div>
          <SaldoCard  saldo={saldo}/>
        </div>
        <ProductosOverView productos={productos} negocioId={id}></ProductosOverView>
      </div>
      </div>
    }
  </>
  )
}
