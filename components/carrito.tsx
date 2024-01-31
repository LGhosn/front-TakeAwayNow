import { PedidoContext, PedidoContextType } from '@/context/context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import React from 'react';
import { useContext } from 'react';

interface ICarrito {
  idCliente: any;
}

export default function Carrito({idCliente} : ICarrito) {
  const {hasProducts} = React.useContext(PedidoContext) as PedidoContextType

  if (!hasProducts) {
    return ( 
      <h1> NO provider</h1>
    )
  }

  function abrirCarrito() {
    console.log(`tiene productos ${hasProducts()}`)
  }

  return (
    <div className="fixed bottom-6 right-16 p-5 bg-red-100 cursor-pointer rounded-full hover:bg-blue-400"> 
      <ShoppingCartOutlinedIcon onClick={abrirCarrito} className={`text-5xl text-gray-400 dark:text-gray-400`}/>
    </div>
  )
}
