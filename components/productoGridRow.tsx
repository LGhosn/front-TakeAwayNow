import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import ModalForm from './modalForm'
import { CartItem, PedidoContext, PedidoContextType } from '@/context/context'

interface ProductoGridRowProps {
    producto: any
    negocioId: any
    cliente ?: boolean
}

export default function ProductoGridRow({cliente, producto, negocioId }: ProductoGridRowProps) {
    const router = useRouter()
    const [form, setForm] = useState(false)
    const fields = [
        {id: 'cantidad', name: 'cantidad', label: 'Cantidad', type: 'number'},
      ]
    const {addNewItem} = useContext(PedidoContext) as PedidoContextType;

    function agregarProducto() {
        const cantidad = document.getElementById('cantidad') as HTMLInputElement
        console.log(cantidad.valueAsNumber)
        console.log(producto['id'])
        const productoPedido : CartItem = {id: producto['id'], cantidad: cantidad.valueAsNumber}
        addNewItem(productoPedido)
        setForm(false)
    }

    function openProducto() {
        if (cliente) {
            setForm(true)
            return
        }

        localStorage.setItem('producto', JSON.stringify(producto))
        router.push(`/negocios/${negocioId}/productos/${producto['id']}`)
    }

  return (
    <>
      <tr key={`${producto['id']}`} onClick={openProducto} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${producto['id']}`}>
            <div className="flex items-center text-gray-900">{producto['id']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nombre${producto['id']}`}>
            <div className="flex items-center text-gray-900">{producto['nombre']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`precio${producto['id']}`}>
            <div className="flex items-center text-gray-900">{producto['precio']['monto']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`stock${producto['id']}`}>
            <div className="flex items-center text-gray-900">{producto['stock']}</div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`recompensaPuntosDeConfianza${producto['id']}`}>
            <div className="flex items-center text-gray-900">{producto['recompensaPuntosDeConfianza']['cantidad']}</div>
        </td>
      </tr>
      {form &&
        <ModalForm
          title={`Agregar al carrito ${producto['nombre']}`}
          fields={fields}
          handleClose={() => setForm(false)}
          handleSave={agregarProducto}
        />
      }
    </>
  )
}
