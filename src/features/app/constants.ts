type NavigationLink = {
  href: string
  name: string
}

export const homeNavigationLinks: NavigationLink[] = [
  {
    href: "/app/calendar",
    name: "Planning bekijken",
  },
  {
    href: "/app/admin/job/create",
    name: "Nieuwe werkzaamheid registreren",
  },
  {
    href: "/app/admin/customer/create",
    name: "Nieuwe klant aanmaken",
  },
  {
    href: "/app/admin/employee/create",
    name: "Nieuwe medewerker aanmaken",
  },
]
