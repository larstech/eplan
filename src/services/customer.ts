"use server"

import { prisma } from "@/libs/prisma"

const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      address: true,
      contact: true,
    },
  })
  return customers
}

export { getAllCustomers }
