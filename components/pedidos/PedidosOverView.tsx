import {PedidoOverViewItem} from "./PedidoOverViewItem"
import { IPedidoOverViewItem } from "../types"


export const PedidosOverView = ({ pedidos }: { pedidos: IPedidoOverViewItem[] }) => {

  return (
    <div className="flex flex-col">
        {
            pedidos.length > 0 ?
                <ul >
                    {
                        pedidos.map((pedido) => (
                            <PedidoOverViewItem {...pedido} key={pedido.id} />
                        ))
                    }
                </ul>:
                <h1>Usted aún no ha realizado pedidos, ¿Qué está esperando?</h1>
        }
    </div>
  );
}

