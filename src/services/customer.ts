"use server"

import { prisma } from "@/libs/prisma"
import { Customer } from "@/types/customer"

const createCustomer = async (customer: Customer) => {
  const createdCustomer = await prisma.customer.create({
    data: {
      ...customer,
      address: { create: { ...customer.address } },
      contact: { create: { ...customer.contact } },
    },
    include: {
      address: true,
      contact: true,
    },
  })
  return createdCustomer
}

const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      address: true,
      contact: true,
    },
  })
  return customers
}

export { createCustomer, getAllCustomers }
