import { useRouter } from "next/router";
import React, { useState } from "react";
import { PedidoOverViewItem } from "@/components/pedidos/PedidoOverViewItem";
import { IPedidoOverViewItem } from "@/components/types";
import Loading from "@/components/loading";
import { SideBar } from "@/components/sideBar";
import { clientesSideBarItems,negociosSideBarItems } from "@/utils/routes";
import { Card, CardContent, Typography } from "@mui/material";


export default function PedidosOverView() {
    const router = useRouter();
    const { idNegocio, idCliente } = router.query;
    const [pedidos, setPedidos] = useState<IPedidoOverViewItem[]>([])
    const [loading, setLoading] = useState(true)
    const [cliente, setCliente] = useState(false)
    const [negocio, setNegocio] = useState(false)

    React.useEffect(() => {
      if (idNegocio && idNegocio !== 'undefined') {
        setNegocio(true)
        fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/${idNegocio}/pedidos/`)
        .then((res) => {
          return res.json()
        }).then((res) => {
            setPedidos(res)
        })
      }
    }, [idNegocio])

    React.useEffect(() => {
      if (idCliente && idCliente !== 'undefined') {
        setCliente(true)
        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${idCliente}/pedidos/`)
        .then((res) => {
          return res.json()
        }).then((res) => {
            setPedidos(res)
            if (res.length == 0) {
              setLoading(false)
            }
        })
      }
    }, [idCliente])
    
    React.useEffect(() => {
      if (Object.keys(pedidos).length > 0) {
        setLoading(false)
      }
    }, [pedidos])

    function handleClick() {
      router.back()
    }

  return (
    <>
    { loading ? <Loading /> 
    :
    <div className="flex flex-row">
    {/* @ts-ignore */}
    <SideBar items={ cliente ? clientesSideBarItems(idCliente) : negociosSideBarItems(idNegocio)}></SideBar>
      <div className="flex flex-col p-40">
          {
            pedidos.length > 0 ?
            <React.Fragment>
                      <h1 className="text-3xl font-bold text-black decoration-gray-400">
                          Pedidos
                      </h1>
                      <ul>
                          {
                            pedidos.map((pedido) => (
                              <PedidoOverViewItem {...pedido} key={pedido.idPedido} vistaCliente={cliente}/>
                              ))
                            }
                      </ul>
                  </React.Fragment>
                  :
                  <div className="flex justify-center w-max">
                  <Card className="cursor-pointer hover:bg-gray-300 w-max" onClick={handleClick}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Todavía no hay pedidos. ¿Qué esperas para hacer uno?
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                }
      </div>
    </div>
    }
    </>
  );
}
