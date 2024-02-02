import { PedidoContext, PedidoContextType } from '@/context/context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as React from 'react';
import ResumenCarrito from './resumenCarrito';

export default function ModalCarrito() {
  const {hasProducts, pedido} = useContext(PedidoContext) as PedidoContextType
  const [open, setOpen] = useState(false)
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

  return (
    <>
    { open && 
    <ResumenCarrito pedido={pedido} handleClose={() => setOpen(false)} handlePurchase={() => setOpen(false)}/>
    }
    
    <div className="fixed bottom-6 right-16 p-5 bg-red-100 cursor-pointer rounded-full hover:bg-blue-400" onClick={verCarrito}> 
      <ShoppingCartOutlinedIcon className={`text-5xl text-gray-400 dark:text-gray-400`}/>
    </div>
    </>
  )
}
