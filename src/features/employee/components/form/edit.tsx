"use client"

import EmployeeDetailsForm from "./body"
import NotFound from "@/app/not-found"
import LoadingPage from "@/components/skeleton/page"
import { Employee, employeeSchema } from "@/features/employee"
import { createClient } from "@/lib/supabase/client"
import { Id } from "@/types"
import { strToBool } from "@/utils/boolean"
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
      const supabase = createClient()
      const { data } = await supabase
        .from("Employee")
        .select("*")
        .eq("id", id)
        .single()
      return data
    }

    fetchEmployee().then((employee) => {
      if (employee) {
        setState({ employee: employee, loading: false })
      }
    })
  }, [id])

  if (state.loading) {
    return <LoadingPage />
  }

  if (!state.employee) {
    return <NotFound />
  }

  const { employee } = state

  const formSubmit = async (values: z.infer<typeof employeeSchema>) => {
    const { firstName, lastName, freelancer } = values
    const supabase = createClient()
    const { data } = await supabase
      .from("Employee")
      .update({
        firstName: firstName,
        lastName: lastName,
        freelancer: strToBool(freelancer),
      })
      .eq("id", employee.id!)
      .select("*")
      .single()

    if (data) {
      toast("Medewerker gegevens gewijzigd", {
        description: `'${getFullName(employee)}' naar '${getFullName(data)}'`,
      })

      // Do not push the create‑form URL to the browser's history stack.
      // Editing should be done via the table's row action instead.
      router.push("/app/employee")
    } else {
      toast("Medewerker kan niet worden gewijzigd", {
        description: "Er is een onbekende fout opgetreden",
      })
    }
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Wijzigingen opslaan"
      handleSubmit={formSubmit}
      employee={employee}
    />
  )
}
