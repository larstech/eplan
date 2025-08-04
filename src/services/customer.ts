"use server"

import { prisma } from "@/libs/prisma"
import { Customer } from "@/types/customer"
import { Id } from "@/types/id"

export const createCustomer = async (customer: Customer) => {
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

export const editCustomer = async (id: Id, customer: Customer) => {
  const editedCustomer = await prisma.customer.update({
    where: { id: id },
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
  return editedCustomer
}

export const getCustomerById = async (id: Id) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id: id,
    },
    include: {
      address: true,
      contact: true,
    },
  })
  return customer
}

export const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany({
    include: {
      address: true,
      contact: true,
    },
  })
  return customers
}
