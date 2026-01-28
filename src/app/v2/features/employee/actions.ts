"use server"

import { EmployeeDTO } from "@/app/v2/features/employee/types"
import { validate } from "@/app/v2/features/employee/validation"
import { route, routes } from "@/app/v2/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory employee database
const employees: EmployeeDTO[] = [
  { id: 1, firstName: "Jeroen", lastName: "Aerts", freelancer: false },
  { id: 2, firstName: "Annelies", lastName: "Bakker", freelancer: false },
  { id: 3, firstName: "Sophie", lastName: "Cohen", freelancer: false },
  { id: 4, firstName: "Lars", lastName: "de Vries", freelancer: false },
  { id: 5, firstName: "Maarten", lastName: "Eijk", freelancer: true },
  { id: 6, firstName: "Klaas", lastName: "Fischer", freelancer: false },
  { id: 7, firstName: "Eva", lastName: "Groot", freelancer: true },
  { id: 8, firstName: "Hannah", lastName: "Hendriks", freelancer: false },
  { id: 9, firstName: "Tom", lastName: "Ivens", freelancer: false },
  { id: 10, firstName: "Marlieke", lastName: "Janssen", freelancer: false },
  { id: 11, firstName: "Pieter", lastName: "Kramer", freelancer: false },
  { id: 12, firstName: "Lucia", lastName: "Lemmens", freelancer: false },
  { id: 13, firstName: "Joris", lastName: "Molenaar", freelancer: false },
  { id: 14, firstName: "Niels", lastName: "Nijhuis", freelancer: false },
  { id: 15, firstName: "Anne", lastName: "Oosterhuis", freelancer: false },
  { id: 16, firstName: "Pim", lastName: "Peeters", freelancer: true },
  { id: 17, firstName: "Renee", lastName: "Quist", freelancer: true },
  { id: 18, firstName: "Bram", lastName: "Rijks", freelancer: false },
  { id: 19, firstName: "Els", lastName: "Smit", freelancer: true },
  { id: 20, firstName: "Daan", lastName: "Timmermans", freelancer: false },
  { id: 21, firstName: "Valerie", lastName: "Utrecht", freelancer: false },
  { id: 22, firstName: "Wouter", lastName: "Verbeek", freelancer: false },
  { id: 23, firstName: "Mieke", lastName: "Willems", freelancer: false },
  { id: 24, firstName: "Xander", lastName: "Xander", freelancer: false },
  { id: 25, firstName: "Yvonne", lastName: "Ypma", freelancer: true },
  { id: 26, firstName: "Zara", lastName: "Zuidema", freelancer: true },
]
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

  revalidatePath(route(routes.employees))
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

  revalidatePath(route(routes.employees))
}

export const deleteEmployee = async (employeeId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = employees.findIndex((e) => e.id === employeeId)
  if (index === -1) {
    return
  }

  employees.splice(index, 1)

  revalidatePath(route(routes.employees))
}
