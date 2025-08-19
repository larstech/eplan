"use server"

import { getEmployeeById } from "./employee"
import { getJobByOrderId } from "./job"
import { prisma } from "@/libs/prisma"
import { Calendar, CalendarBulk } from "@/types/calendar"
import { DateTime } from "luxon"
import { toast } from "sonner"

export const createCalendarFromBulk = async (calendarBulk: CalendarBulk) => {
  calendarBulk.employees.forEach(async (employee) => {
    const fetchedJob = await getJobByOrderId(Number(calendarBulk.orderId))
    const fetchedEmployee = await getEmployeeById(employee.employeeId)

    if (!fetchedJob) {
      toast(`Ordernummer '${calendarBulk.orderId}' niet gevonden.`)
      return
    }
    if (!fetchedEmployee) {
      toast("Medewerker(s) niet gevonden.")
      return
    }

    employee.dates.forEach(async (date) => {
      await createCalendar({
        job: fetchedJob,
        employee: fetchedEmployee,
        date: DateTime.fromISO(date).toJSDate(),
        startTime: DateTime.fromISO(employee.startTime).toJSDate(),
        endTime: DateTime.fromISO(employee.endTime).toJSDate(),
      })
    })
  })
}

export const createCalendar = async (calendar: Calendar) => {
  const createdCalendar = await prisma.calendar.create({
    data: {
      ...calendar,
      job: { connect: { id: calendar.job.id } },
      employee: { connect: { id: calendar.employee.id } },
    },
    include: {
      job: {
        include: {
          customer: {
            include: {
              address: true,
              contact: true,
            },
          },
        },
      },
      employee: true,
    },
  })
  return createdCalendar
}

export const getAllCalendars = async () => {
  const Calendars = await prisma.calendar.findMany({
    include: {
      employee: true,
      job: {
        include: {
          customer: {
            include: {
              address: true,
              contact: true,
            },
          },
        },
      },
    },
  })
  return Calendars
}
