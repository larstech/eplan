import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  datasource: {
    url: env("POSTGRES_PRISMA_URL"),
  },
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
})
