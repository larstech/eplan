import { employeeSchema } from "@/features/employee"
import z from "zod"

export type Employee = {
  id?: string
  firstName: string
  lastName: string
}

export type EmployeeField = {
  name: "firstName" | "lastName"
  label: string
}

export type EmployeeForm = z.infer<typeof employeeSchema>
