import { setFormatDate } from '@/utils/utils'
import { useRouter } from 'next/router'

export default function NegocioGridRow({ negocio }: {negocio: any}) {
    const router = useRouter()

    function openNegocio() {
        router.push(`/negocios/${negocio['id']}`)
    }

  return (
      <tr key={`${negocio['id']}`} onClick={openNegocio} className="dark:hover:bg-gray-300 cursor-pointer">
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`id${negocio['id']}`}>
            <div className="flex items-center text-gray-900">{negocio['id']}</div>
        </td>
        
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200" key={`nombre${negocio['id']}`}>
            <div className="flex items-center text-gray-900">{negocio['nombre']}</div>
        </td>
      </tr>
  )
}
