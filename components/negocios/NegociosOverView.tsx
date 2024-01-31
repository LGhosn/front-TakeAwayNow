import { NegocioOverViewItem } from "./NegocioOverViewItem"
import { INegocioOverViewItem } from "../types"
import Grid from "@mui/material/Grid";
import {ReactNode} from "react";
import React from "react";
import { CartProvider } from "@/context/context";


function Item(props: { children: ReactNode }) {
  return null;
}

export const NegociosOverView = ({ negocios, idCliente }: { negocios: INegocioOverViewItem[], idCliente: any }) => {

  return (
      <React.Fragment>
          <h1 className="text-3xl font-bold text-black decoration-gray-400 dark:hover:text-blue-400 cursor-pointer">
              Negocios
          </h1>
          <Grid container spacing={2} columns={4}>
              {
                  negocios.length > 0 ?
                      negocios.map((negocio) => (
                          <Grid item key={negocio.id} xs={2} md={2} lg={2} xl={2}>
                              <NegocioOverViewItem {...negocio} idCliente={idCliente} key={negocio.id}/>
                          </Grid>
                      ))
                      :
                      <h1>Aún no hay negocios disponibles.</h1>
              }
          </Grid>
      </React.Fragment>
  );
}

