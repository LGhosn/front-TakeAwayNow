import { PedidoContext, PedidoContextType } from '@/context/context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as React from 'react';
import ResumenCarrito from './resumenCarrito';
import SuccessfulNotification from '../notifications/successfulNotification';
import ErrorModal from "@/components/notifications/errorMessageModal";

export default function ModalCarrito() {
  const {hasProducts, pedido, clearCart} = useContext(PedidoContext) as PedidoContextType
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const router = useRouter();
  const { id, idCliente } = router.query;

  if (!hasProducts) {
    return ( 
      <h1> NO provider</h1>
    )
  }

  function verCarrito() {
    setOpen(true)
  }

  async function comprarCarrito() {
    if (!hasProducts()) {
      alert("Agrege al menos un producto a su pedido para poder confirmarlo.")
      return
    }
    const requestBody = {
      idCliente: idCliente,
      idNegocio: id,
      productos: Object.keys(pedido).reduce((acc: any, key: string) => {
        const productId = key;
        // @ts-ignore
        const cantidad = pedido[key].cantidad;
        return {
          ...acc,
          [productId]: cantidad
        };
      }, {})
    };
    

    console.log(requestBody)

    await fetch(`https://takeawaynow-dcnt.onrender.com/api/pedidos/`,
    {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (res) => {
      if (!res.ok) {
        setErrorMessage(await res.text());
      } else {
        setSuccessMessage(await res.text())
      }
    }).then((res) => {
      setOpen(false)
    })
  }

  function limpiarCarrito() {
    clearCart()
    router.back()
  }

  return (
    <>
    { open && 
    <ResumenCarrito pedido={pedido} handleClose={() => setOpen(false)} handlePurchase={comprarCarrito}/>
    }
    
    <div className="fixed bottom-6 right-16 p-5 bg-red-100 cursor-pointer rounded-full hover:bg-blue-400" onClick={verCarrito}> 
      <ShoppingCartOutlinedIcon className={`text-5xl text-gray-400 dark:text-gray-400`}/>
    </div>
      { errorMessage && <ErrorModal action= {() => {setErrorMessage("")}} value={errorMessage}/> }
      { successMessage && <SuccessfulNotification message={successMessage} actionPage={ () => {limpiarCarrito; setErrorMessage("")}}/> }
    </>
  )
}
