"use client"

import EmployeeDetailsForm, { employeeSchema } from "./details-form"
import { createEmployee } from "@/services/employee"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"

export default function EmployeeCreatePage() {
  const router = useRouter()

  const handleSubmit = async (values: z.infer<typeof employeeSchema>) => {
    const { firstName, lastName } = values

    await createEmployee({
      firstName: firstName,
      lastName: lastName,
    })
      .then((employee) => {
        toast("Niewe medewerker aangemaakt", {
          closeButton: true,
          description: `${employee.firstName} ${employee.lastName}`,
        })

        // Do not push the create‑form URL to the browser's history stack.
        // Editing should be done via the table's row action instead.
        router.replace("/app/employee")
      })
      .catch(() => {
        toast("Medewerker kan niet worden aangemaakt", {
          description: "Er is een onbekende fout opgetreden",
        })
      })
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Medewerker aanmaken"
      onSubmit={handleSubmit}
    />
  )
}
