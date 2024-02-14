import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import ModalForm from './modalForm'
import { CartItem, PedidoContext, PedidoContextType } from '@/context/context'
import SuccessfulNotification from './notifications/successfulNotification'
import ErrorModal from './notifications/errorMessageModal'

interface ProductoGridRowProps {
    producto: any
    negocioId: any
    cliente ?: boolean
}

export default function ProductoGridRow({cliente, producto, negocioId }: ProductoGridRowProps) {
    const router = useRouter()
    const [askBorrarProducto, setAskBorrarProducto] = useState(false)
    const [modalSuccessful, setModalSuccessful] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [form, setForm] = useState(false)
    const fields = [
        {id: 'cantidad', name: 'cantidad', label: 'Cantidad', type: 'number'},
      ]
    const {addNewItem} = useContext(PedidoContext) as PedidoContextType;

    function agregarProducto() {
        const cantidad = document.getElementById('cantidad') as HTMLInputElement
        if (cantidad.valueAsNumber <= 0) {
            setForm(false)
            setErrorMessage('La cantidad debe ser mayor a 0')
            return
        } else if (cantidad.valueAsNumber > producto['stock']) {
            setForm(false)
            setErrorMessage('La cantidad no puede ser mayor al stock')
            return
        }
        const newItem = {id: producto['id'], cantidad: cantidad.valueAsNumber, nombre: producto['nombre'], precio: producto['precio']['monto'], pdc: producto['recompensaPuntosDeConfianza']['cantidad']}
        const productoPedido : CartItem = newItem
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

    function borrarProducto () {
      fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${negocioId}/productos/${producto['id']}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        setAskBorrarProducto(false)
        setModalSuccessful(true)
      })
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
        {!cliente &&
        //armo el boton para borrar producto
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`borrar${producto['id']}`}>
            <div className="flex items-center text-gray-900">
                <button className="hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) => {
                            e.stopPropagation()
                            setAskBorrarProducto(true)
                        }}>
                    Borrar
                </button>
            </div>
        </td>
        }
      </tr>
      {form &&
        <ModalForm
          title={`Agregar al carrito ${producto['nombre']}`}
          fields={fields}
          handleClose={() => setForm(false)}
          handleSave={agregarProducto}
        />
      }
      {askBorrarProducto &&
        <ModalForm
          title={`¿Desea borrar el producto: ${producto['nombre']}?`}
          fields={[]}
          handleClose={() => setAskBorrarProducto(false)}
          handleSave={borrarProducto}
          titleAction='Borrar'
        />
      }
      {modalSuccessful &&
        <SuccessfulNotification message='Producto borrado' actionPage={() => {setModalSuccessful(false); router.reload()}} />
      }
      { errorMessage && <ErrorModal action= {() => {setErrorMessage("")}} value={errorMessage}/> }
    </>
  )
}
