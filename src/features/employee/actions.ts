"use server"

import { EmployeeDTO } from "@/features/employee/types"
import { validate } from "@/features/employee/validation"
import { route } from "@/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory employee database
const employees: EmployeeDTO[] = []

let lastEmployeeId = employees.length

export const getNextEmployeeId = async (): Promise<number> => ++lastEmployeeId

export const fetchEmployees = async (): Promise<EmployeeDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return employees
}

export const fetchEmployeeById = async (
  id: number,
): Promise<EmployeeDTO | undefined> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return employees.find((employee) => employee.id === id)
}

export const createEmployee = async (employeeDTO: EmployeeDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(employeeDTO)) {
    return
  }

  employees.push(employeeDTO)

  revalidatePath(route.employees)
}

export const editEmployee = async (employee: EmployeeDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(employee)) {
    return
  }

  const index = employees.findIndex((e) => e.id === employee.id)
  if (index === -1) {
    return
  }

  employees[index] = employee

  revalidatePath(route.employees)
}

export const deleteEmployee = async (employeeId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = employees.findIndex((e) => e.id === employeeId)
  if (index === -1) {
    return
  }

  employees.splice(index, 1)

  revalidatePath(route.employees)
}
