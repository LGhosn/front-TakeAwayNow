import React from "react";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {IPedidoGroupedButton} from "@/components/types";
import {obtenerBotonesDisponiblesParaElCliente} from "@/utils/utils";


export const PedidoButtons = ( estadoActual: string ) => {
    const availableButtons: IPedidoGroupedButton[] = obtenerBotonesDisponiblesParaElCliente(estadoActual);

    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {
              availableButtons.map((button, index) => (
                  <Button variant="contained" key={index}  style={{ backgroundColor: button.color }}>{button.estimulo}</Button>
              ))
          }
      </ButtonGroup>
  );
}

