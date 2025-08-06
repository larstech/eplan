"use server"

import { prisma } from "@/libs/prisma"

export const getAllJobs = async () => {
  const jobs = await prisma.job.findMany({
    include: {
      customer: {
        include: {
          address: true,
          contact: true,
        },
      },
    },
  })
  return jobs
}
