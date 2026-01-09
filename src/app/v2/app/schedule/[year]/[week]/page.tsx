"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchEmployees } from "@/app/v2/features/employee"
import {
  validScheduleWeek,
  fetchScheduleWeek,
} from "@/app/v2/features/schedule"
import ScheduleError from "@/app/v2/features/schedule/components/error"
import ScheduleView from "@/app/v2/features/schedule/components/view"
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
  const scheduleWeek = fetchScheduleWeek(yearNum, weekNum)

  return (
    <Suspense fallback={<LoadingState />}>
      <ScheduleView employeeDTOs={employees} scheduleWeekDTO={scheduleWeek} />
    </Suspense>
  )
}
