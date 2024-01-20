import {PedidoOverViewItem} from "./PedidoOverViewItem"
import { IPedidoOverViewItem } from "../types"
import { useRouter } from "next/router";


export const PedidosOverView = ({ pedidos }: { pedidos: IPedidoOverViewItem[] }) => {
    const router = useRouter();
    function handleClick() {
        localStorage.setItem('pedidos', JSON.stringify(pedidos))
        router.push('/pedidos')
    }
  return (
    <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-black decoration-gray-400 dark:hover:text-blue-400 cursor-pointer" onClick={handleClick}>
            Pedidos
        </h1>
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

