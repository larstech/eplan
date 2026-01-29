"use server"

import { ScheduleItemDTO } from "@/features/schedule/types"
import { validate } from "@/features/schedule/validation"
import { route } from "@/helpers/routes"
import { sql } from "@/lib/neon"
import { DateTime } from "luxon"
import { revalidatePath } from "next/cache"

export const fetchScheduleItems = async (
  weekNumber: number,
): Promise<ScheduleItemDTO[]> => {
  const monday = DateTime.fromObject({ weekNumber }).startOf("week")
  const sunday = monday.plus({ days: 6 })

  return (
    await sql<ScheduleItemDTO[]>`SELECT *
                                 FROM schedule_items
                                 WHERE date BETWEEN ${monday} AND ${sunday}`
  ).map((scheduleItem: any) => ({
    ...scheduleItem,
    workOrderPid: scheduleItem.work_order_pid,
    employeeId: scheduleItem.employee_id,
    startTime: scheduleItem.start_time,
    endTime: scheduleItem.end_time,
  }))
}

export const createScheduleItem = async (scheduleItemDTO: ScheduleItemDTO) => {
  if (!validate(scheduleItemDTO)) {
    return
  }

  await sql`INSERT INTO schedule_items (work_order_pid, employee_id, date, start_time, end_time, note)
            VALUES (${scheduleItemDTO.workOrderPid}, ${scheduleItemDTO.employeeId}, ${scheduleItemDTO.date}, ${scheduleItemDTO.startTime}, ${scheduleItemDTO.endTime}, ${scheduleItemDTO.note})`

  revalidatePath(route.schedule)
}

export const editScheduleItem = async (scheduleItemDTO: ScheduleItemDTO) => {
  if (!validate(scheduleItemDTO)) {
    return
  }

  await sql`UPDATE schedule_items
            SET work_order_pid = ${scheduleItemDTO.workOrderPid}, employee_id = ${scheduleItemDTO.employeeId}, date = ${scheduleItemDTO.date}, start_time = ${scheduleItemDTO.startTime}, end_time = ${scheduleItemDTO.endTime}, note = ${scheduleItemDTO.note}
            WHERE id = ${scheduleItemDTO.id}`

  revalidatePath(route.schedule)
}

export const deleteScheduleItem = async (scheduleItemId: number) => {
  await sql`DELETE FROM schedule_items
            WHERE id = ${scheduleItemId}`

  revalidatePath(route.schedule)
}
