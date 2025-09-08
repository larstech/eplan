"use server"

import { Employee } from "@/features/employee"
import { prisma } from "@/lib/prisma"
import { Id } from "@/types"
import { formatFirstName, formatLastName } from "@/utils/employee"

export async function createEmployee(employee: Employee) {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.create({ data: employee })
  return createdEmployee
}

export async function editEmployee(id: Id, employee: Employee) {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.update({
    where: { id: id },
    data: employee,
  })
  return createdEmployee
}

export async function getEmployeeById(id: Id) {
  const employee = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  })
  return employee
}

export async function getAllEmployees() {
  const employees = await prisma.employee.findMany()
  return employees
}
