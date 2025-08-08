"use client"

import CalendarDetailsForm, { calendarDetailsFormSchema } from "./details-form"
import { createCalendar } from "@/services/calendar"
import { getEmployeeById } from "@/services/employee"
import { getJobByOrderId } from "@/services/job"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"

export default function CalendarCreatePage() {
  const router = useRouter()

  const formSubmit = async (
    values: z.infer<typeof calendarDetailsFormSchema>,
  ) => {
    const { orderId, employeeId, date, startTime, endTime } = values

    console.log(values)

    const job = await getJobByOrderId(Number(orderId))
    if (!job) {
      toast("Ongeldig ordernummer gekozen", {
        description: "Het ordernummer kan niet worden gevonden in het systeem",
      })
      return
    }

    const employee = await getEmployeeById(employeeId)
    if (!employee) {
      toast("Ongeldige medewerker gekozen", {
        description: "De medewerker kan niet worden gevonden in het systeem",
      })
      return
    }

    const createdCalendar = await createCalendar({
      job: job,
      employee: employee,
      date: DateTime.fromISO(date).toJSDate(),
      startTime: DateTime.fromISO(startTime).toJSDate(),
      endTime: DateTime.fromISO(endTime).toJSDate(),
    })

    toast("Werkzaamheid aangemaakt", {
      description: `Ordernummer: ${createdCalendar.job.orderId} voor ${createdCalendar.employee.firstName} ${createdCalendar.employee.lastName}`,
    })

    router.push("/app/calendar")
  }

  return (
    <CalendarDetailsForm
      submitLabel="Werkzaamheid inplannen"
      onSubmit={formSubmit}
    />
  )
}
