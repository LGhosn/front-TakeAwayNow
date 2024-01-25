import {DiaDeLaSemana, IPedidoGroupedButton} from "@/components/types";

export const setElementInnerHtml = (elementId: string, innerHtml: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.innerHTML = innerHtml
  }
}

export const setElementValue = (elementId: string, value: string) => {
  const element = document.getElementById(elementId) as HTMLInputElement
  if (element) {
    element.value = value
  }
}

export const setSelectValue = (selectId: string, value: any) => {
  const select = document.getElementById(selectId) as HTMLSelectElement
  if (select) {
    const option = Array.from(select.options).find((option) => option.value === value)
    if (option) {
      option.selected = true
    }
  }
}

export function setFormatDate(date: string) {
  if (date) {
    const dateSplitted = date.split("-")
    return `${dateSplitted[2].substring(0, 2)}/${dateSplitted[1]}/${dateSplitted[0]} - ${dateSplitted[2].substring(3, 8)}`
  } else {
    return "Sin fecha"
  }
}

export function setFormatTime(time: string) {
  if (time) {
    const timeSplitted = time.split(":")
    return `${timeSplitted[0]}:${timeSplitted[2]}hs`
  } else {
    return "Sin horario"
  }
}

export const obtenerNombreDia = (dia: string): string => {
  switch (dia) {
    case "MONDAY": return "Lunes";
    case "TUESDAY": return "Martes";
    case "WEDNESDAY": return "Miércoles";
    case "THURSDAY": return "Jueves";
    case "FRIDAY": return "Viernes";
    case "SATURDAY": return "Sábado";
    case "SUNDAY": return "Domingo";
    default: return ""; // Manejar cualquier otro caso si es necesario
  }
}

export const obtenerNombreEstadoDelPedido = (estado: string): string => {
  switch (estado) {
    case "AGUARDANDO_PREPARACION": return "Aguardando preparación";
    case "EN_PREPARACION": return "En preparación";
    case "LISTO_PARA_RETIRAR": return "Listo para retirar";
    case "RETIRADO": return "Retirado";
    case "CANCELADO": return "Cancelado";
    case "DEVUELTO": return "Devuelto";
    default: return ""; // Manejar cualquier otro caso si es necesario
  }
}

export const obtenerColorDelBotonSegunEstadoParaElCliente = (estado: string): string => {
  switch (estado) {
    case "AGUARDANDO_PREPARACION": return "Cancelar";
    case "EN_PREPARACION": return "Cancelar";
    case "LISTO_PARA_RETIRAR": return "Cancelar";
    case "RETIRADO": return "Devolver";
    default: return ""; // Manejar cualquier otro caso si es necesario
  }
}

export const obtenerBotonesDisponiblesParaElCliente = (estadoActual: string): IPedidoGroupedButton[] => {
  let arrBtns: IPedidoGroupedButton[] = [];
  if ( ['AGUARDANDO_PREPARACION', 'EN_PREPARACION', 'LISTO_PARA_RETIRAR'].includes(estadoActual) ) {
    arrBtns.push(
        {
          estimulo: "Cancelar",
          color: "#F3B95F"
        }
    )
  }

  if ( ['RETIRADO'].includes(estadoActual) ) {
    arrBtns.push(
        {
          estimulo: "Devolver",
          color: "#D04848"
        }
    )
  }

  return arrBtns;
}

export const pedidoAplicarEstimulo = async (pedidoId: number, estimulo: string) => {
  try {
    const response = await fetch(`https://dcnt-take-away-now.onrender.com/api/pedidos/${pedidoId}/${estimulo}`, {
        method: 'PATCH',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    })
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}