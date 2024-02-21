import { SideBar } from "@/components/sideBar";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";
import { PedidosOverView } from "@/components/pedidos/PedidosOverView";
import { NegociosOverView } from "@/components/negocios/NegociosOverView";
import {useEffect, useState} from "react";
import InfoCard from "@/components/infoCard";
import Loading from "@/components/loading";
import { Button, Grid } from "@mui/material";
import ErrorModal from "@/components/notifications/errorMessageModal";
import SuccessfulNotification from "@/components/notifications/successfulNotification";
import ModalForm from "@/components/modalForm";

export default function Cliente() {
    const router = useRouter();
    const { id } = router.query;
    const [negociosAbiertos, setNegociosAbiertos] = useState([]);
    const [negociosCerrados, setNegociosCerrados] = useState([]);
    const [infoCliente, setInfoCliente] = useState({})
    const [loading, setLoading] = useState(true);
    const [formBirthday, setFormBirthday] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function setFechaNacimiento() {
        const fechaNacimiento = (document.getElementById("fechaNacimiento") as HTMLInputElement).value.split('-');
        if (fechaNacimiento.length === 1) {
            setFormBirthday(false);
            setErrorMessage("La fecha de nacimiento no puede estar vacía")
            return
        }

        fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${id}/establecerFechaDeNacimiento?yyyy=${fechaNacimiento[0]}&mm=${fechaNacimiento[1]}&dd=${fechaNacimiento[2]}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) {
                setErrorMessage(await res.text());
            } else {
                setSuccessMessage(await res.text())
            }
        }).then(() => {
            setFormBirthday(false);
        })
    }

    useEffect(() => {
        // Traemos todos los negocios abiertos
        fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/negociosAbiertos`)
            .then((res) => {
                return res.json()
            }).then((res) => {
                setNegociosAbiertos(res)
        })

        // Traemos todos los negocios cerrados
        fetch(`https://takeawaynow-dcnt.onrender.com/api/negocios/negociosCerrados`)
        .then((res) => {
            return res.json()
        }).then((res) => {
            setNegociosCerrados(res)
        })
    
            // Traemos la info del cliente.
            fetch(`https://takeawaynow-dcnt.onrender.com/api/clientes/${id}`)
            .then((res) => {
                return res.json()
            }).then(async (res) => {
                setInfoCliente(await res)
            }).then(() => {
                setLoading(false);
            })

    }, [])

      return (
        <>
        {loading ? <Loading/> :
          <div className="flex flex-row">
                {/* @ts-ignore */}
              <SideBar items={clientesSideBarItems(id)}></SideBar>
              <div className="flex flex-col pl-16 pt-5">
                  <InfoCard  info={infoCliente}/>
                    {/* @ts-ignore */}
                    {!infoCliente['fechaDeNacimiento'] && 
                    <Grid item xs={12} sm={12} className="flex justify-center items-end">
                        <Button variant="contained" color="success" className="w-full" onClick={() => setFormBirthday(true)}>
                        Establecer fecha de nacimiento
                        </Button>
                    </Grid>
                    }
                  <PedidosOverView idCliente={id}></PedidosOverView>
                    {/* @ts-ignore */}
                  <NegociosOverView negociosAbiertos={negociosAbiertos} negociosCerrados={negociosCerrados} idCliente={id} clientePrime={infoCliente['idPlanPrime']}></NegociosOverView>
              </div>
          </div>
        }
        {formBirthday && 
        <ModalForm handleSave={setFechaNacimiento} 
        handleClose={() => setFormBirthday(false)} title="Fecha de nacimiento"
        fields={[{id: 'fechaNacimiento', name: 'fechaNacimiento', label: '', type: 'date'}]}
        />
        }
        { errorMessage && <ErrorModal action= {() => {setErrorMessage("")}} value={errorMessage}/> }
        { successMessage && <SuccessfulNotification message={successMessage} actionPage={() => {setSuccessMessage(""); router.reload()}}/> }
        </>
      )
}