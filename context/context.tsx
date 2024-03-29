import { createContext, useState, useMemo, ReactNode } from "react";

// Definición del tipo para los elementos del carrito
export interface CartItem {
  id: string;
  cantidad: number;
  nombre: string;
  precio: number;
  pdc: number;
}

// Definición del tipo para el contexto
export interface PedidoContextType {
  pedido: {};
  setPedido: (items: []) => void;
  hasProducts: () => boolean;
  addNewItem: (newItem: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

// Creación del contexto
const PedidoContext = createContext<PedidoContextType | null>(null);

// Definición del proveedor del contexto
const CartProvider = ({ children }: { children: ReactNode }) => {
    const [pedido, setPedido] = useState({});

  const totalPrice = useMemo(() => {
    let total = 0;
    for (const [_, value] of Object.entries(pedido)) {
      let cantidad = (value as CartItem) ['cantidad'];
      let precio = (value as CartItem) ['precio'];
      total += cantidad * precio;
    }
    return total;
  }, [pedido]);


    const hasProducts = () => {
      return Object.keys(pedido).length > 0;
    };

  const addNewItem = (newItem: CartItem) => {
    isAlreadyInCart(newItem) ? updateCantidad(newItem) : setPedido(prevState => ({
      ...prevState,
      [newItem.id]: { cantidad: newItem.cantidad, nombre: newItem.nombre, precio: newItem.precio, pdc: newItem.pdc} 
    }));
  };
  

  const isAlreadyInCart = (newItem: CartItem) => {
    return Object.keys(pedido).includes(newItem.id);
  };

  const updateCantidad = (newItem: CartItem) => {
    setPedido(prevState => ({...prevState, [newItem.id]: newItem.cantidad}))
  };

  const removeItem = (id: string) => {
    // Filtrar las claves del objeto pedido
    const updatedItems = Object.keys(pedido).filter(key => {
      // Retornar true si el id del producto no coincide con el id proporcionado
      return key !== id;
    });
  
    // Crear un nuevo objeto a partir de las claves filtradas
    // @ts-ignore
    const updatedPedido = Object.fromEntries(updatedItems.map(key => [key, pedido[key]]));
  
    setPedido(updatedPedido);
  };
  

  const clearCart = () => {
    setPedido({});
  };

  return (
    <PedidoContext.Provider
      value={{ pedido, setPedido, hasProducts, addNewItem, clearCart, removeItem, totalPrice }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export { PedidoContext, CartProvider };
