"use server"

import { fetchEmployeeById } from "@/app/v2/features/employee"
import {
  ScheduleItemDTO,
  ScheduleWeek,
  ScheduleWeekDTO,
} from "@/app/v2/features/schedule/types"
import { validate } from "@/app/v2/features/schedule/validation"
import { fetchWorkOrderByPid } from "@/app/v2/features/work-order"
import { route, routes } from "@/app/v2/helpers/routes"
import { revalidatePath } from "next/cache"

const scheduleItems: ScheduleItemDTO[] = [
  {
    id: 2,
    workOrderPid: "101",
    employeeId: 2,
    date: new Date("2026-01-27"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 3,
    workOrderPid: "102",
    employeeId: 3,
    date: new Date("2026-01-28"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 4,
    workOrderPid: "103",
    employeeId: 4,
    date: new Date("2026-01-29"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 5,
    workOrderPid: "104",
    employeeId: 5,
    date: new Date("2026-01-30"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 6,
    workOrderPid: "105",
    employeeId: 6,
    date: new Date("2026-01-31"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 7,
    workOrderPid: "106",
    employeeId: 7,
    date: new Date("2026-02-01"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 8,
    workOrderPid: "107",
    employeeId: 8,
    date: new Date("2026-01-26"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 9,
    workOrderPid: "108",
    employeeId: 9,
    date: new Date("2026-01-27"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 10,
    workOrderPid: "109",
    employeeId: 10,
    date: new Date("2026-01-28"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 11,
    workOrderPid: "110",
    employeeId: 11,
    date: new Date("2026-01-29"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 12,
    workOrderPid: "111",
    employeeId: 12,
    date: new Date("2026-01-30"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 13,
    workOrderPid: "112",
    employeeId: 13,
    date: new Date("2026-01-31"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 14,
    workOrderPid: "113",
    employeeId: 14,
    date: new Date("2026-02-01"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 15,
    workOrderPid: "114",
    employeeId: 15,
    date: new Date("2026-01-26"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 16,
    workOrderPid: "115",
    employeeId: 16,
    date: new Date("2026-01-27"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 17,
    workOrderPid: "116",
    employeeId: 17,
    date: new Date("2026-01-28"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 18,
    workOrderPid: "117",
    employeeId: 18,
    date: new Date("2026-01-29"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 19,
    workOrderPid: "118",
    employeeId: 19,
    date: new Date("2026-01-30"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
  {
    id: 20,
    workOrderPid: "119",
    employeeId: 20,
    date: new Date("2026-01-31"),
    startTime: "09:00",
    endTime: "17:00",
    note: "",
  },
]

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

  revalidatePath(route(routes.schedule))
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

  revalidatePath(route(routes.schedule))
}

export const deleteScheduleItem = async (scheduleItemId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = scheduleItems.findIndex((e) => e.id === scheduleItemId)
  if (index === -1) {
    return
  }

  scheduleItems.splice(index, 1)

  revalidatePath(route(routes.schedule))
}
