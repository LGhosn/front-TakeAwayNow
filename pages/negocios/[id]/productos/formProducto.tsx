import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface Props {
  producto ?: {}
}


export default function ProductoForm({producto} : Props) {
  const primerProducto = producto && Object.keys(producto).length > 0 ? producto : null;


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Información
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombre Producto"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            // @ts-ignore
            defaultValue={primerProducto ? primerProducto['nombre'] : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="precio"
            name="precio"
            label="Precio"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            // @ts-ignore
            defaultValue={primerProducto ? primerProducto['precio']['monto'] : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="stock"
            name="stock"
            label="Stock"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            // @ts-ignore
            defaultValue={primerProducto ? primerProducto['stock'] : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="puntosDeConfianza"
            name="puntosDeConfianza"
            label="Puntos de Confianza"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            // @ts-ignore
            defaultValue={primerProducto ? primerProducto['recompensaPuntosDeConfianza']['cantidad'] : ''}
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}