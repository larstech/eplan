import { employeeSchema } from "@/features/employee"
import { ControllerRenderProps } from "react-hook-form"
import z from "zod"

export type Employee = {
  id?: string
  firstName: string
  lastName: string
  freelancer: boolean
}

export type FormValues = z.infer<typeof employeeSchema>

export type FormFieldComponentProps = {
  field: ControllerRenderProps<FormValues, keyof FormValues>
}

export type EmployeeField = {
  name: "firstName" | "lastName" | "freelancer"
  label: string
  input: (props: FormFieldComponentProps) => React.ReactNode
}

export type EmployeeForm = z.infer<typeof employeeSchema>
