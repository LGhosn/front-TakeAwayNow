import { NegocioOverViewItem } from "./NegocioOverViewItem"
import { INegocioOverViewItem } from "../types"
import Grid from "@mui/material/Grid";
import {ReactNode} from "react";


function Item(props: { children: ReactNode }) {
  return null;
}

export const NegociosOverView = ({ negocios }: { negocios: INegocioOverViewItem[] }) => {

  return (
      <Grid container spacing={2} columns={4}>
        {
          negocios.length > 0 ?
                negocios.map((negocio) => (
                    <Grid item xs={2} md={2} lg={2} xl={2}>
                        <NegocioOverViewItem {...negocio} key={negocio.id} />
                    </Grid>
                  ))
                :
                <h1>Aún no hay negocios disponibles.</h1>
        }
      </Grid>
  );
}

