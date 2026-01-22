export const routes = {
  base: "/v2/app",
  schedule: "/schedule",
  employees: "/employees",
}

export const route = (route: string) => `${routes.base}${route}`
