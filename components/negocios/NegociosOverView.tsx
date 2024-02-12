import { NegocioOverViewItem } from "./NegocioOverViewItem"
import { INegocioOverViewItem } from "../types"
import Grid from "@mui/material/Grid";
import {ReactNode} from "react";
import React from "react";
import { CartProvider } from "@/context/context";


function Item(props: { children: ReactNode }) {
  return null;
}

export const NegociosOverView = ({ negociosAbiertos, negociosCerrados, idCliente }: { negociosAbiertos: INegocioOverViewItem[]
    , negociosCerrados: INegocioOverViewItem[], idCliente: any }) => {

  return (
      <React.Fragment>
          <Grid container spacing={2} columns={1}>
          <h1 className="text-3xl pt-9 font-bold text-black decoration-gray-400">
              Negocios Abiertos
          </h1>
              {
                  negociosAbiertos.length > 0 ?
                    negociosAbiertos.map((negocio) => (
                          <Grid item key={negocio.id} xs={2} md={2} lg={2} xl={2}>
                              <NegocioOverViewItem {...negocio} idCliente={idCliente} key={negocio.id}/>
                          </Grid>
                      ))
                      :
                      <h1>Aún no hay negocios abiertos disponibles.</h1>
              }
            <h1 className="text-3xl pt-9 font-bold text-black decoration-gray-400">
              Negocios Cerrados
            </h1>
              {
                  negociosCerrados.length > 0 ?
                  negociosCerrados.map((negocio) => (
                          <Grid item key={negocio.id} xs={2} md={2} lg={2} xl={2}>
                              <NegocioOverViewItem {...negocio} idCliente={idCliente} key={negocio.id}/>
                          </Grid>
                      ))
                      :
                      <h1>No hay negocios cerrados.</h1>
              }
          </Grid>
      </React.Fragment>
  );
}

