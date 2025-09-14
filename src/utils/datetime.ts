import { DateTime } from "luxon"

export function previousWeek(dateTime: DateTime): DateTime {
  return dateTime.minus({ week: 1 })
}

export function nextWeek(dateTime: DateTime): DateTime {
  return dateTime.plus({ week: 1 })
}
