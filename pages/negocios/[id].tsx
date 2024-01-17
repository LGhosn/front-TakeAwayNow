import HeaderItem from "@/components/headerItem";
import Loading from "@/components/loading";
import ProductoGridRow from "@/components/productoGridRow";
import { SideBar } from "@/components/sideBar";
import { negociosSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Negocio() {
  const router = useRouter();
  const { id } = router.query;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [saldo, setSaldo] = useState(0)

  useEffect(() => {
    fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/${id}/productos`)
      .then((res) => {
          return res.json()
      }).then((res) => {
        setProductos(res)
    })
    const saldoFromLocalStorage = localStorage.getItem('saldo');
    if (saldoFromLocalStorage !== null) {
      setSaldo(JSON.parse(saldoFromLocalStorage));
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
    <div className="flex flex-row">
      <SideBar items={negociosSideBarItems}></SideBar>
      {
          loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
      <div className="container max-w-7xl mx-auto mt-8">
      <div className="flex flex-row justify-center items-center space-x-96 p-2">
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => searchByTitulo(1, e.target.value)}
          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-fit border border-gray-300 rounded-md text-gray-900"
        />

        {/* @ts-ignore */}
        <span id="spanSaldo" className="text-3xl italic font-bold text-black">Saldo: {saldo}</span>
      </div>

          <>
          <div className="mb-4">
              <h1 className="text-3xl font-bold text-black decoration-gray-400">Productos</h1>
          </div>
          <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                  <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                      <table className="min-w-full">
                          <thead>
                          <tr>
                              <HeaderItem title="Id" />
                              <HeaderItem title="Nombre" />
                              <HeaderItem title="Precio" />
                              <HeaderItem title="Stock" />
                              <HeaderItem title="Puntos de Confianza" />
                          </tr>
                          </thead>

                          <tbody>
                          {productos.map((producto) => (
                              <ProductoGridRow key={producto['id']} producto={producto}/>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          </>
      </div>
    }
    </div>
  )
}
