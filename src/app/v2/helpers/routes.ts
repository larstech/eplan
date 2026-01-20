export const routes = {
  base: "/v2/app",
  schedule: "/schedule",
}

export const route = (route: string) => `${routes.base}${route}`
