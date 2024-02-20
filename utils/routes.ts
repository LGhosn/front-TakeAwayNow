export const mainRoutes = [
  {
    href: "/clientes",
    title: "Clientes",
  },
  {
    href: "/negocios",
    title: "Negocios",
  }
]

export const negociosSideBarItems = (negocioId: string | string[] | undefined) => [
  {
      title: "Mi Negocio",
      href: `/negocios/${negocioId}`,
  },
  {
    title: "Salir",
    href: "/",
  }
];

export const clientesSideBarItems = (clientId: string | string[] | undefined, fechaNacimiento : any, idPlanPrime : any) => [
  {
    title: "Mi Cuenta",
    href:  `/clientes/${clientId}`,
  },
  {
    title: "Plan Prime",
    href:  `/planPrime?idCliente=${clientId}&fechaNacimiento=${fechaNacimiento}&idPlanPrime=${idPlanPrime}`,
  },
  {
    title: "Salir",
    href: "/",
  }
];

