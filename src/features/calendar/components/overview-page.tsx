"use client"

import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import { deleteCalendar, getAllCalendars } from "../services/calendar"
import { Calendar } from "../types"
import { Employee } from "@/features/employee"
import { getAllEmployees } from "@/features/employee/services"
import { date } from "@/lib/datetime"
import { exportCalendarToJpeg } from "@/utils/calendar"
import { nextWeek, previousWeek } from "@/utils/datetime"
import { sortEmployeesByName } from "@/utils/employee"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { DateTime, Interval } from "luxon"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

const CalendarControl = ({
  date,
  setWeek: setDate,
}: {
  date: DateTime
  setWeek: React.Dispatch<React.SetStateAction<DateTime>>
}) => {
  return (
    <>
      <Button variant="outline" onClick={() => setDate(DateTime.local())}>
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
      Week {week.weekNumber} (
      {weekDates.start?.setLocale("nl").toFormat("d LLLL y")} -{" "}
      {weekDates.end?.setLocale("nl").toFormat("d LLLL y")})
    </span>
  )
}

const CalendarDetails = ({ calendar }: { calendar: Calendar }) => {
  const handleDelete = async () => {
    await deleteCalendar(calendar)
    toast(
      `Opdracht ${calendar.job.orderId} op ${DateTime.fromJSDate(calendar.date).toFormat("cccc d LLLL yyyy", { locale: "nl" })} uit de kalender gehaald`,
      {
        description: "Herlaad de pagina op de kalender te synchronizeren.",
      },
    )
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Werkzaamheid details</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 overflow-y-scroll">
        <div className="grid grid-cols-2 gap-x-2">
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold">Bedrijf</h3>
            <span className="text-sm">{calendar.job.customer.companyName}</span>
          </div>
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold">Adres</h3>
            <span className="text-sm">
              {calendar.job.customer.address.street}{" "}
              {calendar.job.customer.address.houseNumber},{" "}
              {calendar.job.customer.address.postalCode},{" "}
              {calendar.job.customer.address.city} (
              {calendar.job.customer.distanceInKm} km)
            </span>
          </div>
        </div>
        <div className="grid gap-3">
          <h3 className="text-sm font-semibold">Ordernummer</h3>
          <span className="text-sm">{calendar.job.orderId}</span>
        </div>
        <div className="grid gap-3">
          <h3 className="text-sm font-semibold">Omschrijving</h3>
          <p className="text-sm">{calendar.job.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold">Starttijd</h3>
            <span className="text-sm">
              {date(calendar.startTime).toFormat("HH:mm")}
            </span>
          </div>
          <div className="grid gap-3">
            <h3 className="text-sm font-semibold">Eindtijd</h3>
            <span className="text-sm">
              {date(calendar.endTime).toFormat("HH:mm")}
            </span>
          </div>
        </div>

        <Button variant="destructive" onClick={handleDelete}>
          Uit de planning verwijderen
        </Button>
      </div>
    </DialogContent>
  )
}

export default function CalendarOverviewPage() {
  const [date, setDate] = useState<DateTime>(DateTime.local())
  const [employees, setEmployees] = useState<Employee[]>([])
  const [calendars, setCalendars] = useState<Calendar[]>([])

  const datesInweek = Interval.after(date.startOf("week"), { week: 1 })

  const tableRef = useRef<HTMLTableElement | null>(null)

  const handleExport = () => {
    exportCalendarToJpeg(date, tableRef)
  }

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

      <div className="flex justify-between">
        <div className="flex items-center gap-x-1">
          <CalendarControl date={date} setWeek={setDate} />
          <DateOverview week={date} datesInWeek={datesInweek} />
        </div>
        <Button variant="outline" onClick={handleExport}>
          Exporteer
        </Button>
      </div>

      <Table className="bg-white" ref={tableRef}>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Medewerker</TableHead>
            {datesInweek.splitBy({ day: 1 }).map((date, index) => (
              <TableHead
                key={index}
                className="min-w-48 max-w-48 overflow-hidden text-ellipsis text-center"
              >
                <span className="font-semibold">
                  {date.start?.setLocale("nl").toFormat("cccc")}
                </span>
                <br />
                <Badge
                  variant={
                    DateTime.local().toFormat("yyyy LLL dd") ===
                    date.start?.toFormat("yyyy LLL dd")
                      ? "default"
                      : "outline"
                  }
                  className="mb-1"
                >
                  {date.start?.setLocale("nl").toFormat("d LLLL")}
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
                    <Dialog key={index}>
                      <TableCell className="min-w-48 max-w-48 overflow-hidden text-ellipsis bg-secondary/65 border cursor-pointer">
                        <DialogTrigger className="text-left min-w-48 max-w-48 overflow-hidden text-ellipsis">
                          {calendar.job.orderId} - {calendar.job.title}
                        </DialogTrigger>
                      </TableCell>
                      <CalendarDetails calendar={calendar} />
                    </Dialog>
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
