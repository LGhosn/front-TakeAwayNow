import { PedidoContext, PedidoContextType } from '@/context/context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import { Box, Button, Grid, Modal, TextField, Typography, Card, ButtonGroup } from "@mui/material";

interface ResumenCarritoProps {
  pedido: {};
  handleClose: () => void;
  handlePurchase: () => void;
  onlyView?: boolean;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '75%',
  minHeight: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const card = (pedido: Record<string, any>, removeItem: (key:string) => void, onlyView?:boolean) => (
  <>
  { Object.keys(pedido).length === 0 ?
  <h1>No hay productos en el carrito</h1>
  :
  <>
    {Object.keys(pedido).map((key: string) => {
      const item = pedido[key];
      return (
        <div key={key} className="flex flex-row justify-between mb-5 mt-5">
          <CardContent>
            <Typography variant="h5">
              {item['nombre']}
            </Typography>
            <Typography >
              ~Cantidad: {item['cantidad']}
            </Typography>
            <Typography >
              ~Precio: ${item['precio']}
            </Typography>
          </CardContent>
          {
            !onlyView &&
          <ButtonGroup variant="contained" aria-label="outlined primary button group" className=''>
            <Button onClick={ () => {removeItem(key)} }>Eliminar</Button>
          </ButtonGroup>
          }
        </div>
      );
    })}
  </>
  }
  </>
);

export default function ResumenCarrito({ pedido, handleClose, handlePurchase, onlyView}: ResumenCarritoProps) {
  const {removeItem} = useContext(PedidoContext) as PedidoContextType

  return (
    <Modal
    open={true}
    onClose={() => console.log('close')}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Card>{card(pedido, removeItem, onlyView)}</Card>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between">
          <Button variant="contained" onClick={handleClose}>Volver</Button>
          <Button variant="contained" onClick={handlePurchase}>Comprar</Button>
        </div>
      </Box>
    </Modal>
  )
}
