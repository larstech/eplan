"use client"

import z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Employee } from "@/types/employee"
import { editEmployee } from "@/services/employee"
import EmployeeDetailsForm, { employeeDetailsFormSchema } from "./details-form"

export default function EmployeeEditPage({ employee }: { employee: Employee }) {
  const router = useRouter()

  const formSubmit = async (
    values: z.infer<typeof employeeDetailsFormSchema>,
  ) => {
    const { firstName, lastName } = values
    const editedEmployee = await editEmployee(employee.id!, {
      firstName: firstName,
      lastName: lastName,
    })

    toast("Wijzigingen opgeslagen", {
      description: `'${employee.firstName} ${employee.lastName}' naar '${editedEmployee.firstName} ${editedEmployee.lastName}'`,
    })

    router.push("/app/employee")
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Wijzigingen opslaan"
      onSubmit={formSubmit}
      employee={employee}
    />
  )
}
