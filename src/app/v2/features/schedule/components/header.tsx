"use client"

import { ScheduleWeek } from "@/app/v2/features/schedule"
import { localDateString } from "@/app/v2/helpers/date"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

type DateRangeProps = {
  scheduleWeek: ScheduleWeek
}

type DateControlsProps = {
  scheduleWeek: ScheduleWeek
}

type ScheduleHeaderProps = {
  scheduleWeek: ScheduleWeek
}

function DateRange({ scheduleWeek }: DateRangeProps) {
  return (
    <h5>
      {localDateString(scheduleWeek.start(), { dateStyle: "medium" })} -{" "}
      {localDateString(scheduleWeek.end(), { dateStyle: "medium" })}
    </h5>
  )
}

function DateControls({ scheduleWeek }: DateControlsProps) {
  const router = useRouter()
  const showWeek = (y: number, w: number) => {
    router.push(`/v2/app/schedule/${y}/${w}`)
  }

  return (
    <div className="d-flex gap-2">
      <div className="btn-group" role="group" aria-label="Basic example">
        {/* Go to the previous week */}
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            showWeek(scheduleWeek.previous().year, scheduleWeek.previous().week)
          }}
        >
          <ChevronLeft />
        </button>

        {/* A non-functional divider button for aesthetic reasons */}
        <button type="button" className="btn btn-light" disabled>
          <Calendar />
        </button>

        {/* Go to the next week */}
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            showWeek(scheduleWeek.next().year, scheduleWeek.next().week)
          }}
        >
          <ChevronRight />
        </button>
      </div>

      <button
        type="button"
        className="btn btn-light"
        onClick={() => {
          showWeek(ScheduleWeek.today().year, ScheduleWeek.today().week)
        }}
      >
        Vandaag
      </button>
    </div>
  )
}

export default function ScheduleHeader({ scheduleWeek }: ScheduleHeaderProps) {
  return (
    <div className="d-flex justify-content-between my-2">
      <DateRange scheduleWeek={scheduleWeek} />
      <DateControls scheduleWeek={scheduleWeek} />
    </div>
  )
}
