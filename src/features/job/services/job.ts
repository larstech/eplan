"use server"

import { Job } from "@/features/job/types"
import { prisma } from "@/lib/prisma"
import { Id } from "@/types"

export const createJob = async (job: Job) => {
  const createdJob = await prisma.job.create({
    data: {
      ...job,
      customer: { connect: { id: job.customer.id } },
    },
  })
  return createdJob
}

export const editJob = async (id: Id, job: Job) => {
  const updatedJob = await prisma.job.update({
    where: { id: id },
    data: {
      ...job,
      customer: { connect: { id: job.customer.id } },
    },
  })
  return updatedJob
}

export const getJobById = async (id: Id) => {
  const job = await prisma.job.findUnique({
    where: {
      id: id,
    },
    include: {
      customer: {
        include: {
          address: true,
          contact: true,
        },
      },
    },
  })
  return job
}

export const getJobByOrderId = async (orderId: number) => {
  const job = await prisma.job.findFirst({
    where: {
      orderId: orderId,
    },
    include: {
      customer: {
        include: {
          address: true,
          contact: true,
        },
      },
    },
  })
  return job
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
