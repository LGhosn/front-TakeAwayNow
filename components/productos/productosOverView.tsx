import { useRouter } from "next/router";
import AddButton from "../addButton"
import HeaderItem from "../headerItem"
import ProductoGridRow from "../productoGridRow";
import { useState } from "react";
import CrearProducto from "@/pages/negocios/[id]/productos/create";

interface ProductoGridRowProps {
  productos: Array<any>
  negocioId: string | string[] | undefined
  cliente ?: boolean
}

export default function ProductosOverView({cliente, productos, negocioId} : ProductoGridRowProps) {
  const router = useRouter();
  const { id } = router.query;
  const [modalSuccessful, setModalSuccessful] = useState(false)
  const [crearProducto, setCrearProducto] = useState(false)

  return (
    <>
    {crearProducto &&
    <CrearProducto handleClose={() => setCrearProducto(false)} />
    }
    <div className="mb-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-black decoration-gray-400">Productos</h1>
      {cliente ? <></>
        : 
        <AddButton className="" onClick={() => setCrearProducto(true)} />
      }
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
                <HeaderItem title="Recompensa Puntos de Confianza" />
                <HeaderItem title="Precio Puntos de Confianza" />
                {!cliente && <HeaderItem title="Acciones" />}
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <ProductoGridRow cliente={cliente ? true : false} key={producto['id']} producto={producto} negocioId={negocioId} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}