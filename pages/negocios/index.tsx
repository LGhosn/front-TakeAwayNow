import Filter from '@/components/filter'
import HeaderItem from '@/components/headerItem'
import Loading from '@/components/loading'
import NegocioGridRow from '@/components/negocioGridRow'
import { SideBar } from '@/components/sideBar'
import { negociosSideBarItems } from '@/utils/routes'
import { use, useEffect, useState } from 'react'

export default function Negocios() {
  const [negocios, setNegocios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch("https://psa-support-management.onrender.com/products/")
    //     .then((res) => {
    //         return res.json()
    //     }).then((res) => {
    //       setNegocios(res)
    // })
    const negocios = [
      {
        id: 1,
        nombre: "Negocio 1"
      },
      {
        id: 2,
        nombre: "Negocio 2"
      },
      {
        id: 3,
        nombre: "Negocio 3"
      },
      {
        id: 4,
        nombre: "Negocio 4"
      },
      {
        id: 5,
        nombre: "Negocio 5"
      }
    ]
    setNegocios(negocios);

  }, [])

  useEffect(() => {
    if (negocios.length > 0) {
      setLoading(false)
    }
  }
  , [negocios])

    // Función para aplicar filtros por columna
    const searchByTitulo = (columnIndex: string | number, filterValue: string) => {
      if (filterValue == "") {
        setNegocios(negocios);
        return;
      }
      const filtered = negocios.filter((item: { [x: string]: any; }) => {
        //@ts-ignore
        const cellValue = item[Object.keys(item)[columnIndex]];
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      });
  
      setNegocios(filtered);
    };

  return (
    <div className="flex flex-row">
      <SideBar items={negociosSideBarItems}></SideBar>

      <div className="container max-w-7xl mx-auto mt-8">
      <div className="flex flex-row justify-start items-center space-x-5 p-2">
        <input
          id="searchBar"
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => searchByTitulo(1, e.target.value)}
          className="shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-fit border border-gray-300 rounded-md text-gray-900"
        />
      </div>
                {
                loading ? <div className="flex flex-row justify-center"> <Loading /> </div> :
                <>
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-black decoration-gray-400">Negocios</h1>
                </div>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Id" />
                                    <HeaderItem title="Nombre" />
                                </tr>
                                </thead>

                                <tbody>
                                {negocios.map((negocio) => (
                                    <NegocioGridRow key={negocio['id']} negocio={negocio}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                </>
                }
            </div>
    </div>
  )
}
