export const routes = {
  base: "/v2/app",
  contacts: "/contacts",
  schedule: "/schedule",
  employees: "/employees",
  organizations: "/organizations",
}

export const route = (route: string) => `${routes.base}${route}`
