import { DateTime } from "luxon"

export const isToday = (date: DateTime) => date.day === DateTime.now().day
