import "dotenv/config"
import type { PrismaConfig } from "prisma"

export default {
  datasource: {
    url: process.env.POSTGRES_PRISMA_URL!,
  },
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
} satisfies PrismaConfig
