"use client"

import EmployeeDetailsForm, { employeeDetailsFormSchema } from "./details-form"
import { createEmployee } from "@/services/employee"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"

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
