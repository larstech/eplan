"use client"

import JobDetailsForm, { jobDetailsFormSchema } from "./details-form"
import { getCustomerById } from "@/features/customer/services/customer"
import { createJob } from "@/features/job/services/job"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"

export default function JobCreatePage() {
  const router = useRouter()

  const formSubmit = async (values: z.infer<typeof jobDetailsFormSchema>) => {
    const { orderId, customerId, title, description } = values

    const customer = await getCustomerById(customerId)

    if (!customer) {
      toast("Ongeldige klant geselecteerd", {
        description: "De klant kan niet worden gevonden in het systeem",
      })
      return
    }

    let createdJob;
    try {
      createdJob = await createJob({
        orderId: Number(orderId),
        customer: customer,
        title: title,
        description: description,
      })
    } catch {
      toast("Fout bij het maken van een order", {
        description: "Er is een fout opgetreden bij het maken van een order. Controleer of het order(nummer) al niet bestaat",
      })
      return
    }

    toast("Werkzaamheid aangemaakt", {
      description: `Ordernummer: ${createdJob.orderId} - ${createdJob.title}`,
    })

    router.push("/app/job")
  }

  return (
    <JobDetailsForm submitLabel="Werkzaamheid aanmaken" onSubmit={formSubmit} />
  )
}
