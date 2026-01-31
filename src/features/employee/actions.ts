"use server"

import { signUp } from "@/features/auth/actions"
import { EmployeeDTO } from "@/features/employee/types"
import { validate } from "@/features/employee/validation"
import { route } from "@/helpers/routes"
import { adminAction, authAction } from "@/lib/auth/action"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchEmployees = async (): Promise<EmployeeDTO[]> => {
  return (
    (await authAction(async () => {
      return (
        await sql<EmployeeDTO[]>`SELECT *
                                   FROM employees`
      ).map((employee: any) => ({
        ...employee,
        firstName: employee.first_name,
        lastName: employee.last_name,
      }))
    })) ?? []
  )
}

export const createEmployee = async (employeeDTO: EmployeeDTO) => {
  await adminAction(async () => {
    if (!validate(employeeDTO)) {
      return
    }

    await sql`INSERT INTO employees (first_name, last_name, freelancer) 
              VALUES (${employeeDTO.firstName}, ${employeeDTO.lastName}, ${employeeDTO.freelancer})`

    await signUp({
      email: employeeDTO.email!,
      password: employeeDTO.password!,
      name: `${employeeDTO.firstName} ${employeeDTO.lastName}`,
    })

    revalidatePath(route.employees)
  })
}

export const editEmployee = async (employee: EmployeeDTO) => {
  await adminAction(async () => {
    if (!validate(employee)) {
      return
    }

    await sql`UPDATE employees
              SET first_name = ${employee.firstName}, last_name = ${employee.lastName}, freelancer = ${employee.freelancer}
              WHERE id = ${employee.id}`

    revalidatePath(route.employees)
  })
}

export const deleteEmployee = async (employeeId: number) => {
  await adminAction(async () => {
    await sql`DELETE FROM employees
              WHERE id = ${employeeId}`

    revalidatePath(route.employees)
  })
}
