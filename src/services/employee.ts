"use server"

import { prisma } from "@/libs/prisma"

const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany()
  return employees
}

export { getAllEmployees }
