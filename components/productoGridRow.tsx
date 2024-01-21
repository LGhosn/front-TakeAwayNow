import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'

interface ProductoGridRowProps {
    producto: any
    negocioId: any
    cliente ?: boolean
    customOnClick ?: (id: string, nombre: string) => void
}

export default function ProductoGridRow({customOnClick, cliente, producto, negocioId }: ProductoGridRowProps) {
    const router = useRouter()

    function openProducto() {
        if (cliente && customOnClick) {
            customOnClick(producto['id'], producto['nombre'])
            return
        }

        localStorage.setItem('producto', JSON.stringify(producto))
        router.push(`/negocios/${negocioId}/productos/${producto['id']}`)
    }

  return (
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
  )
}
