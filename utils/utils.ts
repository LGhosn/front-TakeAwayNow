import {DiaDeLaSemana} from "@/components/types";

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