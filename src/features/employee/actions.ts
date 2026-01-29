"use server"

import { EmployeeDTO } from "@/features/employee/types"
import { validate } from "@/features/employee/validation"
import { route } from "@/helpers/routes"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchEmployees = async (): Promise<EmployeeDTO[]> => {
  return (
    await sql<EmployeeDTO[]>`SELECT *
                                   FROM employees`
  ).map((employee: any) => ({
    ...employee,
    firstName: employee.first_name,
    lastName: employee.last_name,
  }))
}

export const createEmployee = async (employeeDTO: EmployeeDTO) => {
  if (!validate(employeeDTO)) {
    return
  }

  await sql`INSERT INTO employees (first_name, last_name, freelancer) 
            VALUES (${employeeDTO.firstName}, ${employeeDTO.lastName}, ${employeeDTO.freelancer})`

  revalidatePath(route.employees)
}

export const editEmployee = async (employee: EmployeeDTO) => {
  if (!validate(employee)) {
    return
  }

  await sql`UPDATE employees
            SET first_name = ${employee.firstName}, last_name = ${employee.lastName}, freelancer = ${employee.freelancer}
            WHERE id = ${employee.id}`

  revalidatePath(route.employees)
}

export const deleteEmployee = async (employeeId: number) => {
  await sql`DELETE FROM employees
            WHERE id = ${employeeId}`

  revalidatePath(route.employees)
}
