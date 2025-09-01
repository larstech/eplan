"use client"

import JobDetailsForm, { jobDetailsFormSchema } from "./details-form"
import NotFound from "@/app/not-found"
import LoadingPage from "@/components/skeleton/page"
import { getCustomerById } from "@/features/customer/services/customer"
import { editJob, getJobById } from "@/features/job/services/job"
import { Job } from "@/features/job/types/job"
import { Id } from "@/types/id"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import z from "zod"

export default function JobEditPage({ jobId }: { jobId: Id }) {
  const router = useRouter()
  const [state, setState] = useState<{
    job: Job | null
    loading: boolean
  }>({
    job: null,
    loading: true,
  })

  useEffect(() => {
    const fetchJob = async () => {
      const jobData = await getJobById(jobId)
      setState({ job: jobData, loading: false })
    }

    fetchJob()
  }, [jobId])

  if (state.loading) {
    return <LoadingPage />
  }

  if (!state.job) {
    return <NotFound />
  }

  const { job } = state

  const formSubmit = async (values: z.infer<typeof jobDetailsFormSchema>) => {
    const { orderId, customerId, title, description } = values

    const customer = await getCustomerById(customerId)

    if (!customer) {
      toast("Ongeldige klant geselecteerd", {
        description: "De klant kan niet worden gevonden in het systeem",
      })
      return
    }

    const createdJob = await editJob(jobId, {
      orderId: Number(orderId),
      customer: customer,
      title: title,
      description: description,
    })

    toast("Wijzigingen opgeslagen", {
      description: `Ordernummer: ${createdJob.orderId} - ${createdJob.title}`,
    })

    router.push("/app/job")
  }

  return (
    <JobDetailsForm
      submitLabel="Wijzigingen opslaan"
      onSubmit={formSubmit}
      job={job}
    />
  )
}
