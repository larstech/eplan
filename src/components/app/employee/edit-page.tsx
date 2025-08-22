"use client"

import EmployeeDetailsForm, { employeeSchema } from "./details-form"
import NotFound from "@/app/not-found"
import LoadingPage from "@/components/skeleton/page"
import { editEmployee, getEmployeeById } from "@/services/employee"
import { Employee } from "@/types/employee"
import { Id } from "@/types/id"
import { getFullName } from "@/utils/employee"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import z from "zod"

export default function EmployeeEditPage({ id }: { id: Id }) {
  const router = useRouter()
  const [state, setState] = useState<{
    employee: Employee | null
    loading: boolean
  }>({
    employee: null,
    loading: true,
  })

  useEffect(() => {
    const fetchEmployee = async () => {
      const employee = await getEmployeeById(id)

      setState({ employee: employee, loading: false })
    }

    fetchEmployee()
  }, [id])

  if (state.loading) {
    return <LoadingPage />
  }

  if (!state.employee) {
    return <NotFound />
  }

  const { employee } = state

  const formSubmit = async (values: z.infer<typeof employeeSchema>) => {
    const { firstName, lastName } = values

    await editEmployee(employee.id!, {
      firstName: firstName,
      lastName: lastName,
    })
      .then((editedEmployee) => {
        toast("Medewerker gegevens gewijzigd", {
          description: `'${getFullName(employee)}' naar '${getFullName(editedEmployee)}'`,
        })

        // Do not push the create‑form URL to the browser's history stack.
        // Editing should be done via the table's row action instead.
        router.push("/app/employee")
      })
      .catch(() => {
        toast("Medewerker kan niet worden gewijzigd", {
          description: "Er is een onbekende fout opgetreden",
        })
      })
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Wijzigingen opslaan"
      handleSubmit={formSubmit}
      employee={employee}
    />
  )
}
