"use client"

import EmployeeDetailsForm from "./body"
import { EmployeeForm } from "@/features/employee"
import { createClient } from "@/lib/supabase/client"
import { strToBool } from "@/utils/boolean"
import { getFullName } from "@/utils/employee"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

export default function EmployeeCreatePage() {
  const router = useRouter()

  const handleSubmit = async (values: EmployeeForm) => {
    const { firstName, lastName, freelancer } = values
    const supabase = createClient()

    const { data } = await supabase
      .from("Employee")
      .insert({
        id: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        freelancer: strToBool(freelancer),
      })
      .select("*")
      .single()

    if (data) {
      toast("Niewe medewerker aangemaakt", {
        closeButton: true,
        description: getFullName(data),
      })

      // Do not push the create‑form URL to the browser's history stack.
      // Editing should be done via the table's row action instead.
      router.replace("/app/employee")
    } else {
      toast("Medewerker kan niet worden aangemaakt", {
        description: "Er is een onbekende fout opgetreden",
      })
    }
  }

  return (
    <EmployeeDetailsForm
      submitLabel="Medewerker aanmaken"
      handleSubmit={handleSubmit}
    />
  )
}
