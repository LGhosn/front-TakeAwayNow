import { createContext, useState, useMemo, ReactNode } from "react";

// Definición del tipo para los elementos del carrito
export interface CartItem {
  id: string;
  cantidad: number;
}

// Definición del tipo para el contexto
interface PedidoContextType {
  pedido: {};
  setPedido: (items: []) => void;
  hasProducts: () => boolean;
  addNewItem: (newItem: CartItem) => void;
  // removeItem: (id: string) => void;
  clearCart: () => void;
}

// Creación del contexto
const PedidoContext = createContext<PedidoContextType>({
  pedido: {},
  setPedido: () => {},
  hasProducts: () => false,
  addNewItem: () => {}, 
  clearCart: () => {},
  // removeItem: () => {},
});

// Definición del proveedor del contexto
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [pedido, setPedido] = useState([]);

  // const itemsTotal = useMemo(() => {
  //   return pedido.reduce((acc, item) => acc + item.cantidad, 0);
  // }, [pedido]);


  const hasProducts = () => {
    console.log(pedido);
    return Object.keys(pedido).length > 0;
  };

  const addNewItem = (newItem: CartItem) => {
    console.log('hola');
    isAlreadyInCart(newItem) ? updateCantidad(newItem) : setPedido(prevState => ({...prevState, [newItem.id]: newItem.cantidad}));
  };

  const isAlreadyInCart = (newItem: CartItem) => {
    return Object.keys(pedido).includes(newItem.id);
  };

  const updateCantidad = (newItem: CartItem) => {
    setPedido(prevState => ({...prevState, [newItem.id]: newItem.cantidad}))
  };

  // const removeItem = (id: string) => {
  //   setPedido(prevState => {
  //     const pedidoActualizado = {...prevState};
  //     delete pedidoActualizado[id];
  //     return pedidoActualizado;
  //   });

  // };

  const clearCart = () => {
    setPedido([]);
  };

  return (
    <PedidoContext.Provider
      value={{ pedido, setPedido, hasProducts, addNewItem, clearCart }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export { PedidoContext, CartProvider };
