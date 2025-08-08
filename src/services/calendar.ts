"use server"

import { prisma } from "@/libs/prisma"

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
