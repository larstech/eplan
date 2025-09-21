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
    href: "/app/job/create",
    name: "Nieuwe werkzaamheid registreren",
  },
  {
    href: "/app/customer/create",
    name: "Nieuwe klant aanmaken",
  },
  {
    href: "/app/employee/create",
    name: "Nieuwe medewerker aanmaken",
  },
]
