import { EmployeeField } from "@/features/employee"
import z from "zod"

export const employeeFields: EmployeeField[] = [
  {
    name: "firstName",
    label: "Voornaam",
  },
  {
    name: "lastName",
    label: "Achternaam",
  },
]

export const employeeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})
