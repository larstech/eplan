"use server"

import { prisma } from "@/libs/prisma"
import { Calendar } from "@/types/calendar"

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
