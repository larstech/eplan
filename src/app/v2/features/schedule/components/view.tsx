"use client"

import { Employee, EmployeeDTO } from "@/app/v2/features/employee"
import { ScheduleWeek, ScheduleWeekDTO } from "@/app/v2/features/schedule"
import ScheduleDataTable from "@/app/v2/features/schedule/components/data-table"
import ScheduleHeader from "@/app/v2/features/schedule/components/header"
import { use } from "react"

interface ScheduleProps {
  employeeDTOs: Promise<EmployeeDTO[]>
  scheduleWeekDTO: Promise<ScheduleWeekDTO>
}

export default function ScheduleView({
  employeeDTOs,
  scheduleWeekDTO,
}: ScheduleProps) {
  const employees = use(employeeDTOs).map((dto) => Employee.fromDTO(dto))
  const scheduleWeek = ScheduleWeek.fromDTO(use(scheduleWeekDTO))

  return (
    <>
      <ScheduleHeader scheduleWeek={scheduleWeek} />
      <ScheduleDataTable employees={employees} scheduleWeek={scheduleWeek} />
    </>
  )
}
