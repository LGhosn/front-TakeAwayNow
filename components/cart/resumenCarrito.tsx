import { PedidoContext, PedidoContextType } from '@/context/context';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import { Box, Button, Grid, Modal, FormGroup, FormControlLabel,Checkbox, Typography, Card, ButtonGroup } from "@mui/material";

interface ResumenCarritoProps {
  pedido: {};
  handleClose: () => void;
  handlePurchase: () => void;
  onlyView?: boolean;
  porcentajeDescuento?: number;
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
              ~Precio: ${item['precio']} (Puntos de Confianza: {item['pdc']})
            </Typography>
          </CardContent>
          {
            !onlyView &&
            <div className='flex flex-row items-center justify-center'>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="check-pdc"/>} label="Usar Puntos de Confianza"/>
            </FormGroup>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" className=''>
              <Button onClick={ () => {removeItem(key)} }>Eliminar</Button>
            </ButtonGroup>
            </div>
          }
        </div>
      );
    })}
  </>
  }
  </>
);

export default function ResumenCarrito({ pedido, handleClose, handlePurchase, onlyView, porcentajeDescuento = 0}: ResumenCarritoProps) {
  const {removeItem, hasProducts, totalPrice} = useContext(PedidoContext) as PedidoContextType

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
          {
            !onlyView && hasProducts() &&
            <Button variant="contained" onClick={handlePurchase}>Comprar</Button>
          }
        </div>
        <div className="absolute bottom-20 right-20">
          {porcentajeDescuento > 0 && 
          <>
          <h1>Total: ${totalPrice *  ((100 - porcentajeDescuento) / 100)}</h1>
          <h1>Descuento: {porcentajeDescuento}%</h1>
          </>
          }
        </div>
      </Box>
    </Modal>
  )
}
