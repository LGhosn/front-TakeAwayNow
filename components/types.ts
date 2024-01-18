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
  precioTotal: number
  estado: string
  fechaYHoraEntrega:string
}

export interface INegocioOverViewItem {
  id: number
  nombre: string
  diaDeApertura: string
  diaDeCierre: string
  horarioDeApertura: string
  horarioDeCierre: string
}