"use client"

import z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Employee } from "@/types/employee"
import { editEmployee, getEmployeeById } from "@/services/employee"
import EmployeeDetailsForm, { employeeDetailsFormSchema } from "./details-form"
import { useEffect, useState } from "react"
import { Id } from "@/types/id"
import NotFound from "@/app/not-found"

export default function EmployeeEditPage({ employeeId }: { employeeId: Id }) {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>()

  useEffect(() => {
    const fetchEmployee = async () => {
      const employeeData = await getEmployeeById(employeeId)
      setEmployee(employeeData)
    }

    fetchEmployee()
  }, [employeeId])

  if (!employee) {
    return <NotFound />
  }

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
