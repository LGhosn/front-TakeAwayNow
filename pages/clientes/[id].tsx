import { SideBar } from "@/components/sideBar";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import { NegociosOverView } from "@/components/negocios/NegociosOverView";
import {useEffect, useState} from "react";
import InfoCard from "@/components/infoCard";
import Loading from "@/components/loading";

export default function Cliente() {
      const router = useRouter();
      const { id } = router.query;
      const [negociosAbiertos, setNegociosAbiertos] = useState([]);
      const [negociosCerrados, setNegociosCerrados] = useState([]);
      const [infoCliente, setInfoCliente] = useState({})
      const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Traemos todos los negocios abiertos
        fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/negociosAbiertos`)
            .then((res) => {
                return res.json()
            }).then((res) => {
                setNegociosAbiertos(res)
        })

        // Traemos todos los negocios cerrados
        fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/negociosCerrados`)
        .then((res) => {
            return res.json()
        }).then((res) => {
            setNegociosCerrados(res)
        })
    

        // Traemos la info del cliente.
        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${id}`)
            .then((res) => {
                return res.json()
            }).then(async (res) => {
            setInfoCliente(await res)
        }).then(() => {
            setLoading(false);
        })

    }, [id])

      return (
        <>
        {loading ? <Loading/> :
          <div className="flex flex-row">
                {/* @ts-ignore */}
              <SideBar items={clientesSideBarItems(id, infoCliente['fechaDeNacimiento'], infoCliente['idPlanPrime'])}></SideBar>
              <div className="flex flex-col pl-16 pt-5">
                  <InfoCard  info={infoCliente}/>
                  <PedidosOverView idCliente={id}></PedidosOverView>
                  <NegociosOverView negociosAbiertos={negociosAbiertos} negociosCerrados={negociosCerrados} idCliente={id}></NegociosOverView>
              </div>
          </div>
        }
        </>
      )
}