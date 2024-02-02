import Loading from '@/components/loading';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, ButtonGroup } from '@mui/material';

interface ICarrito {
  idCliente: any;
}

export default function Carrito() {
  const [pedido, setPedido] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(false)
  const router = useRouter();
  const { id, idCliente } = router.query;

  useEffect(() => {
    const pedido = localStorage.getItem('pedido')
    if (pedido) {
      setPedido(JSON.parse(pedido))
    }
  }, [])

  useEffect(() => {
    if (pedido) {
      console.log(pedido)
      setLoading(false)
    }
  }, [pedido])


  return (
    <>
    {loading ? <Loading/>:
      <p> id negocio {id} idClient {idCliente}</p>
    }
    </>
  )

}

const card = () => (
  <div className="flex flex-row justify-between">
      <CardContent>
          <Typography variant="body2">
          </Typography>
          <Typography variant="h4">
              {'negocio'}
          </Typography>
          <Typography variant="h6">
              Código de retiro: {'codigoDeRetiro'}
          </Typography>
          <Typography variant="h6">
              Precio: ${'monto'}
          </Typography>
      </CardContent>
  </div>
);

export const PedidoOverViewItem = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card()}</Card>
    </Box>
  );
}
