import {Usuario} from "../types/types";

export interface ISidebarItem {
  href: string
  title: string
  children?: ISidebarItem[]
}

export interface ModalProps {
  modalOpen: boolean
  setModalOpen: (x: boolean) => void
  list: Usuario[]
}

export interface IPedidoOverViewItem {
  id: number
  nombreNegocio: string
  precioTotal: {
    monto: number
  }
  estado: string
  fechaYHoraEntrega:string
}

export interface INegocioOverViewItem {
  id: number
  nombre: string
  diaDeApertura: DiaDeLaSemana
  diaDeCierre: DiaDeLaSemana
  horarioDeApertura: string
  horarioDeCierre: string
}

export enum DiaDeLaSemana {
  MONDAY = "Lunes",
  TUESDAY = "Martes",
  WEDNESDAY = "Miércoles",
  THURSDAY = "Jueves",
  FRIDAY = "Viernes",
  SATURDAY = "Sábado",
  SUNDAY = "Domingo"
}