import { useRouter } from "next/router";
import AddButton from "../addButton"
import HeaderItem from "../headerItem"
import ProductoGridRow from "../productoGridRow";
import { useState } from "react";
import ModalForm from "../modalForm";
import SuccessfulNotification from "../notifications/successfulNotification";

interface ProductoGridRowProps {
  productos: Array<any>
  negocioId: string | string[] | undefined
}

export default function ProductosOverView({productos, negocioId} : ProductoGridRowProps) {
  const router = useRouter();
  const { id } = router.query;
  const [form, setForm] = useState(false)
  const [modalSuccessful, setModalSuccessful] = useState(false)

  return (
    <>
    <div className="mb-4 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-black decoration-gray-400">Productos</h1>
      <AddButton className="" onClick={() => router.push(`/negocios/${id}/productos/create`)} />
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
                <ProductoGridRow key={producto['id']} producto={producto} negocioId={negocioId} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}