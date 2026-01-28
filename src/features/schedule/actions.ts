"use server"

import { fetchEmployeeById } from "@/features/employee"
import {
  ScheduleItemDTO,
  ScheduleWeek,
  ScheduleWeekDTO,
} from "@/features/schedule/types"
import { validate } from "@/features/schedule/validation"
import { fetchWorkOrderByPid } from "@/features/work-order"
import { route } from "@/helpers/routes"
import { revalidatePath } from "next/cache"

const scheduleItems: ScheduleItemDTO[] = []

let lastScheduleItemId = scheduleItems.length

export const getNextScheduleItemId = async (): Promise<number> =>
  ++lastScheduleItemId

export const fetchScheduleWeek = async (
  year: number,
  week: number,
): Promise<ScheduleWeekDTO> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return { id: 1, year, week }
}

export const fetchScheduleItems = async (
  scheduleWeekDTO: ScheduleWeekDTO,
): Promise<ScheduleItemDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const scheduleWeek = ScheduleWeek.fromDTO(scheduleWeekDTO)
  return scheduleItems.filter((scheduleItem) =>
    scheduleWeek.containsDate(scheduleItem.date),
  )
}

export const createScheduleItem = async (scheduleItemDTO: ScheduleItemDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(scheduleItemDTO)) {
    console.log("invalid schedule item")
    return
  }

  const workOrder = await fetchWorkOrderByPid(scheduleItemDTO.workOrderPid)
  if (!workOrder) {
    console.log("no work order")
    return
  }

  const employee = await fetchEmployeeById(scheduleItemDTO.employeeId)
  if (!employee) {
    console.log("no employee")
    return
  }

  scheduleItems.push(scheduleItemDTO)

  revalidatePath(route.schedule)
}

export const editScheduleItem = async (scheduleItemDTO: ScheduleItemDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(scheduleItemDTO)) {
    return
  }

  const index = scheduleItems.findIndex((e) => e.id === scheduleItemDTO.id)
  if (index === -1) {
    return
  }

  const workOrder = await fetchWorkOrderByPid(scheduleItemDTO.workOrderPid)
  if (!workOrder) {
    return
  }

  const employee = await fetchEmployeeById(scheduleItemDTO.employeeId)
  if (!employee) {
    return
  }

  scheduleItems[index] = scheduleItemDTO

  revalidatePath(route.schedule)
}

export const deleteScheduleItem = async (scheduleItemId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = scheduleItems.findIndex((e) => e.id === scheduleItemId)
  if (index === -1) {
    return
  }

  scheduleItems.splice(index, 1)

  revalidatePath(route.schedule)
}
