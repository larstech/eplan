import { ScheduleItemDTO } from "@/features/schedule/types"
import z from "zod"

const ScheduleItemZod = z.object({
  id: z.number(),
  workOrderPid: z.string(),
  employeeId: z.number(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
})

export const validate = (scheduleItem: ScheduleItemDTO): boolean => {
  const data = ScheduleItemZod.safeParse(scheduleItem)
  console.log(data)
  return data.success
}
