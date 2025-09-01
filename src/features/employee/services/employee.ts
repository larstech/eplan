"use server"

import { Employee } from "@/features/employee/types/employee"
import { prisma } from "@/lib/prisma"
import { Id } from "@/types/id"
import { formatFirstName, formatLastName } from "@/utils/employee"

export const createEmployee = async (employee: Employee) => {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.create({ data: employee })
  return createdEmployee
}

export const editEmployee = async (id: Id, employee: Employee) => {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.update({
    where: { id: id },
    data: employee,
  })
  return createdEmployee
}

export const getEmployeeById = async (id: Id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  })
  return employee
}

export const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany()
  return employees
}
