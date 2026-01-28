"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchContacts } from "@/app/v2/features/contact"
import { fetchEmployees } from "@/app/v2/features/employee"
import { fetchOrganizations } from "@/app/v2/features/organization"
import {
  validScheduleWeek,
  fetchScheduleWeek,
  fetchScheduleItems,
} from "@/app/v2/features/schedule"
import ScheduleError from "@/app/v2/features/schedule/components/error"
import ScheduleView from "@/app/v2/features/schedule/components/view"
import { fetchWorkOrders } from "@/app/v2/features/work-order"
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
