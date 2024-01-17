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

export const clientesSideBarItems = (clientId: string | string[] | undefined) => [
  {
    title: "Mi Cuenta",
    href:  `/clientes/${clientId}`,
},
{
  title: "Salir",
  href: "/",
}
];

