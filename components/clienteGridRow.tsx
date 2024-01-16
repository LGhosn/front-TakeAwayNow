import { useRouter } from 'next/router'

export default function ClienteGridRow({ cliente }: {cliente: any}) {
    const router = useRouter()

    function openCliente() {
        router.push(`/clientes/${cliente['id']}`)
    }

  return (
      <tr key={`${cliente['id']}`} onClick={openCliente} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${cliente['id']}`}>
            <div className="flex items-center text-gray-900">{cliente['id']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nombre${cliente['id']}`}>
            <div className="flex items-center text-gray-900">{cliente['nombre']}</div>
        </td>
      </tr>
  )
}
