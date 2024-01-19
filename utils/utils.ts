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

export const obtenerNombreDia = (dia: DiaDeLaSemana): string => {
  console.log(dia);
  switch (dia) {
    case DiaDeLaSemana.MONDAY: return "Lunes";
    case DiaDeLaSemana.TUESDAY: return "Martes";
    case DiaDeLaSemana.WEDNESDAY: return "Miércoles";
    case DiaDeLaSemana.THURSDAY: return "Jueves";
    case DiaDeLaSemana.FRIDAY: return "Viernes";
    case DiaDeLaSemana.SATURDAY: return "Sábado";
    case DiaDeLaSemana.SUNDAY: return "Domingo";
    default: return ""; // Manejar cualquier otro caso si es necesario
  }
};