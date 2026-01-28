"use server"

import LoadingState from "@/components/loading"
import { fetchContacts } from "@/features/contact"
import { fetchEmployees } from "@/features/employee"
import { fetchOrganizations } from "@/features/organization"
import {
  validScheduleWeek,
  fetchScheduleWeek,
  fetchScheduleItems,
} from "@/features/schedule"
import ScheduleError from "@/features/schedule/components/error"
import ScheduleView from "@/features/schedule/components/view"
import { fetchWorkOrders } from "@/features/work-order"
import { Suspense } from "react"

type ScheduleProps = {
  params: Promise<{ year: string; week: string }>
}

export default async function Page({ params }: ScheduleProps) {
  const { year, week } = await params
  const yearNum = Number(year)
  const weekNum = Number(week)

  if (!validScheduleWeek(yearNum, weekNum)) {
    return <ScheduleError />
  }

  const employees = fetchEmployees()
  const workOrders = fetchWorkOrders()
  const organizations = fetchOrganizations()
  const contacts = fetchContacts()

  const scheduleWeek = await fetchScheduleWeek(yearNum, weekNum)
  const scheduleItems = fetchScheduleItems(scheduleWeek)

  return (
    <Suspense fallback={<LoadingState />}>
      <ScheduleView
        contactDTOs={contacts}
        employeeDTOs={employees}
        organizationDTOs={organizations}
        scheduleWeekDTO={scheduleWeek}
        scheduleItemDTOs={scheduleItems}
        workOrderDTOs={workOrders}
      />
    </Suspense>
  )
}
