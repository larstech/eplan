"use server"

import { prisma } from "@/libs/prisma"
import { Employee } from "@/types/employee"
import { Id } from "@/types/id"
import { formatFirstName, formatLastName } from "@/utils/employee"

const createEmployee = async (employee: Employee) => {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.create({ data: employee })
  return createdEmployee
}

const editEmployee = async (id: Id, employee: Employee) => {
  employee.firstName = formatFirstName(employee.firstName)
  employee.lastName = formatLastName(employee.lastName)

  const createdEmployee = await prisma.employee.update({
    where: { id: id },
    data: employee,
  })
  return createdEmployee
}

const getEmployeeById = async (id: Id) => {
  const employee = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  })
  return employee
}

const getAllEmployees = async () => {
  const employees = await prisma.employee.findMany()
  return employees
}

export { createEmployee, editEmployee, getEmployeeById, getAllEmployees }
