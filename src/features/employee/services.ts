"use server"

import { Employee } from "@/features/employee"
import { prisma } from "@/lib/prisma"
import { Id } from "@/types"
import { formatFirstName, formatLastName } from "@/utils/employee"

export async function createEmployee(employee: Employee): Promise<Employee> {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  return prisma.employee.create({ data: employee })
}

export async function getEmployeeById(id: Id): Promise<Employee | null> {
  return prisma.employee.findUnique({
    where: { id: id },
  })
}

export async function getEmployees(): Promise<Employee[]> {
  return prisma.employee.findMany()
}

export async function editEmployee(
  id: Id,
  employee: Employee,
): Promise<Employee> {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  return prisma.employee.update({
    where: { id: id },
    data: employee,
  })
}
