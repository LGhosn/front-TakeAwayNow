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

export const clientesSideBarItems = (clientId: string | string[] | undefined) => {
  let items = [{
    title: "Mi Cuenta",
    href:  `/clientes/${clientId}`,
  },
  {
    title: "Plan Prime",
    href:  `/planPrime?idCliente=${clientId}`,
  },
  {
    title: "Salir",
    href: "/",
  }]
  return items;
}

