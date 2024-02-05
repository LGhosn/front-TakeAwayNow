import { SideBar } from "@/components/sideBar";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import { NegociosOverView } from "@/components/negocios/NegociosOverView";
import {useEffect, useState} from "react";
import { Card, Skeleton } from "@mui/material";

export default function Cliente() {
      const router = useRouter();
      const { id } = router.query;
      const [pedidos, setPedidos] = useState([]);
      const [negocios, setNegocios] = useState([]);

            useEffect(() => {
                // Traemos los pedidos del cliente
                fetch(`https://dcnt-take-away-now.onrender.com/api/clientes/${id}/pedidos/`)
                    .then((res) => {
                        return res.json()
                    }).then((res) => {
                    setPedidos(res)
                })

                // Traemos todos los negocios
                fetch(`https://dcnt-take-away-now.onrender.com/api/negocios/`)
                    .then((res) => {
                        return res.json()
                    }).then((res) => {
                    setNegocios(res)
                })
            }, [id])

      return (
          <div className="flex flex-row">
              <SideBar items={clientesSideBarItems(id)}></SideBar>
              <div className="flex flex-col pl-16 pt-5">
                <div className="container max-w-7xl mx-auto">
                    <h1> Bienvenido nuevamente !</h1>
                </div>
                <PedidosOverView idCliente={id}></PedidosOverView>
                <NegociosOverView negocios={negocios} idCliente={id}></NegociosOverView>
              </div>
          </div>
      )
}