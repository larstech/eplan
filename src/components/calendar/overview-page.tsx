"use client"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { formatDate } from "@/libs/datetime"
import { getAllCalendars } from "@/services/calendar"
import { getAllEmployees } from "@/services/employee"
import { Calendar } from "@/types/calendar"
import { Employee } from "@/types/employee"
import { nextWeek, previousWeek } from "@/utils/datetime"
import { sortEmployeesByName } from "@/utils/employee"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DateTime, Interval } from "luxon"
import Link from "next/link"
import { useEffect, useState } from "react"

const CalendarControl = ({
  date,
  setWeek: setDate,
}: {
  date: DateTime
  setWeek: React.Dispatch<React.SetStateAction<DateTime>>
}) => {
  return (
    <>
      <Button variant="outline" onClick={() => setDate(formatDate())}>
        Deze week
      </Button>
      <Button variant="outline" onClick={() => setDate(previousWeek(date))}>
        <ArrowLeft />
      </Button>
      <Button variant="outline" onClick={() => setDate(nextWeek(date))}>
        <ArrowRight />
      </Button>
    </>
  )
}

const DateOverview = ({
  week,
  datesInWeek: weekDates,
}: {
  week: DateTime
  datesInWeek: Interval
}) => {
  return (
    <span>
      Week {week.weekNumber} ({weekDates.start?.toFormat("d LLLL y")} -{" "}
      {weekDates.end?.toFormat("d LLLL y")})
    </span>
  )
}

export default function CalendarOverviewPage() {
  const [date, setDate] = useState<DateTime>(formatDate())
  const [employees, setEmployees] = useState<Employee[]>([])
  const [calendars, setCalendars] = useState<Calendar[]>([])

  const datesInweek = Interval.after(date.startOf("week"), { week: 1 })

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getAllEmployees()
      const sortedData = sortEmployeesByName(employees)
      setEmployees(sortedData)

      const calendars = await getAllCalendars()
      setCalendars(calendars)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/app/calendar/create">
        <Button className="w-full">Werkzaamheid inplannen</Button>
      </Link>

      <div className="flex gap-x-1 items-center">
        <CalendarControl date={date} setWeek={setDate} />
        <DateOverview week={date} datesInWeek={datesInweek} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Medewerker</TableHead>
            {datesInweek.splitBy({ day: 1 }).map((date, index) => (
              <TableHead
                key={index}
                className="min-w-48 max-w-48 overflow-hidden text-ellipsis text-center"
              >
                <span className="font-semibold">
                  {date.start?.toFormat("cccc")}
                </span>
                <br />
                <Badge
                  variant={
                    formatDate().weekday === date.start?.weekday
                      ? "default"
                      : "outline"
                  }
                  className="mb-1"
                >
                  {date.start?.toFormat("d LLLL")}
                </Badge>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell className="border-r">
                {employee.firstName} {employee.lastName}
              </TableCell>

              {datesInweek.splitBy({ day: 1 }).map((date, index) => {
                const filteredCalendars = calendars.filter((calendar) => {
                  const dateToDateTime = DateTime.fromJSDate(calendar.date)

                  return (
                    datesInweek.contains(dateToDateTime) &&
                    dateToDateTime.day == date.start?.day &&
                    calendar.employee.id === employee.id
                  )
                })

                return filteredCalendars.length > 0 ? (
                  filteredCalendars.map((calendar, index) => (
                    <TableCell
                      key={index}
                      className="min-w-48 max-w-48 overflow-hidden text-ellipsis bg-secondary/65 border"
                    >
                      {calendar.job.orderId} - {calendar.job.title}
                    </TableCell>
                  ))
                ) : (
                  <TableCell key={index} className="min-w-48 max-w-48" />
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
