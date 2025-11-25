"use server";

import { Calendar, CalendarBulk } from "../types";
import { getJobByOrderId } from "@/features/job/services/job";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/client";
import { DateTime } from "luxon";
import { toast } from "sonner";


export const createCalendarFromBulk = async (calendarBulk: CalendarBulk) => {
  calendarBulk.employees.forEach(async (employee) => {
    const fetchedJob = await getJobByOrderId(Number(calendarBulk.orderId))
    const supabase = createClient()
    const { data } = await supabase
      .from("Employee")
      .select("*")
      .eq("id", employee.employeeId)
      .single()

    if (!fetchedJob) {
      toast(`Ordernummer '${calendarBulk.orderId}' niet gevonden.`)
      return
    }
    if (!data) {
      toast("Medewerker(s) niet gevonden.")
      return
    }

    employee.dates.forEach(async (date) => {
      await createCalendar({
        job: fetchedJob,
        employee: data,
        date: DateTime.fromISO(date).toJSDate(),
        startTime: DateTime.fromISO(employee.startTime).toJSDate(),
        endTime: DateTime.fromISO(employee.endTime).toJSDate(),
      })
    })
  })
}

export const createCalendar = async (calendar: Calendar) => {
  return await prisma.calendar.create({
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
}

export const getAllCalendars = async () => {
  return await prisma.calendar.findMany({
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
}

export const deleteCalendar = async (calendar: Calendar) => {
  await prisma.calendar.delete({ where: { id: calendar.id } })
}
