"use server"

import LoadingState from "@/components/loading"
import { fetchContacts } from "@/features/contact"
import { fetchEmployees } from "@/features/employee"
import { fetchOrganizations } from "@/features/organization"
import { fetchScheduleItems } from "@/features/schedule"
import ScheduleError from "@/features/schedule/components/error"
import ScheduleView from "@/features/schedule/components/view"
import { fetchWorkOrders } from "@/features/work-order"
import { DateTime } from "luxon"
import { Suspense } from "react"

type ScheduleProps = {
  params: Promise<{ year: string; week: string }>
}

export default async function Page({ params }: ScheduleProps) {
  const { year, week } = await params
  const yearNum = Number(year)
  const weekNum = Number(week)

  const firstDayOfWeek = DateTime.fromObject({
    weekYear: yearNum,
    weekNumber: weekNum,
  })
    .startOf("week")
    .toISO()
  if (!firstDayOfWeek) {
    return <ScheduleError />
  }

  const employees = fetchEmployees()
  const workOrders = fetchWorkOrders()
  const scheduleItems = fetchScheduleItems(weekNum)
  const organizations = fetchOrganizations()
  const contacts = fetchContacts()

  return (
    <Suspense fallback={<LoadingState />}>
      <ScheduleView
        currentDate={firstDayOfWeek}
        contactDTOs={contacts}
        employeeDTOs={employees}
        organizationDTOs={organizations}
        scheduleItemDTOs={scheduleItems}
        workOrderDTOs={workOrders}
      />
    </Suspense>
  )
}
