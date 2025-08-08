import { DateTime } from "luxon"

export const previousWeek = (dateTime: DateTime): DateTime =>
  dateTime.minus({ week: 1 })

export const nextWeek = (dateTime: DateTime): DateTime =>
  dateTime.plus({ week: 1 })
