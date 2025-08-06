"use server"

import { prisma } from "@/libs/prisma"
import { Job } from "@/types/job"

export const createJob = async (job: Job) => {
  const createdJob = await prisma.job.create({
    data: {
      ...job,
      customer: { connect: { id: job.customer.id } },
    },
  })
  return createdJob
}

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
