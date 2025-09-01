import { DateTime } from "luxon"

const lastSundayInMarch = (): DateTime => lastSundayInMonth(3, 31)

const lastSundayInOctober = (): DateTime => lastSundayInMonth(10, 31)

const lastSundayInMonth = (month: number, day: number): DateTime => {
  const lastDay = DateTime.local().set({ month: month, day: day })
  const offsetLastSunday = lastDay.weekday % 7
  const lastSunday = lastDay.minus({ days: offsetLastSunday })
  return lastSunday
}

// The code below relies on hard‑coded DST rules that can break in any year.
// It assumes the EU will keep daylight saving. If they drop it, the logic will
// silently return wrong times.
//
// Read more: https://en.wikipedia.org/wiki/Summer_time_in_Europe
export const date = (date: Date): DateTime => {
  const dateTime = DateTime.fromJSDate(date, { zone: "UTC" }).setZone(
    "Europe/Amsterdam",
  )
  const now = DateTime.local()

  // Check if we are currently in DST (last Sunday of March - last Sunday of October).
  // If so, add an extra hour. This is a fragile hack that will fail
  // whenever the DST transition dates change or the policy changes.
  if (now >= lastSundayInMarch() && now <= lastSundayInOctober()) {
    // Total offset from UTC becomes +2 hours during DST.
    return dateTime.plus({ hour: 1 })
  }

  // Standard offset of +1 hour from UTC.
  return dateTime
}
