"use server"

import { prisma } from "@/libs/prisma"
import { Employee } from "@/types/employee"
import { formatFirstName, formatLastName } from "@/utils/employee"

const createEmployee = async (employee: Employee) => {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.create({ data: employee })
  return createdEmployee
}

const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany()
  return employees
}

export { createEmployee, getAllEmployees }
