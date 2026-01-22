export const routes = {
  base: "/v2/app",
  schedule: "/schedule",
  employees: "/employees",
  organizations: "/organizations",
}

export const route = (route: string) => `${routes.base}${route}`
