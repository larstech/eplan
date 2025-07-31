"use client"

import z from "zod"
import { createEmployee } from "@/services/employee"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import EmployeeDetailsForm, { employeeDetailsFormSchema } from "./details-form"

export default function EmployeeCreatePage() {
  const router = useRouter()

  const formSubmit = async (
    values: z.infer<typeof employeeDetailsFormSchema>,
  ) => {
    const { firstName, lastName } = values
    const createdEmployee = await createEmployee({
      firstName: firstName,
      lastName: lastName,
    })

    toast("Medewerker aangemaakt", {
      description: `${createdEmployee.firstName} ${createdEmployee.lastName}`,
    })

    router.push("/app/employee")
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Medewerker aanmaken"
      onSubmit={formSubmit}
    />
  )
}
