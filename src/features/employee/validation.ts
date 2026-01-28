import { EmployeeDTO } from "@/features/employee/types"
import z from "zod"

const EmployeeZod = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  freelancer: z.boolean(),
})

export const validate = (employee: EmployeeDTO): boolean => {
  const data = EmployeeZod.safeParse(employee)
  return data.success
}
