import {
  max_week,
  max_year,
  min_week,
  min_year,
} from "@/features/schedule/index"
import { localDateString } from "@/helpers/date"

export const validScheduleWeek = (year: number, week: number): boolean =>
  year >= min_year && year <= max_year && week >= min_week && week <= max_week

export const isToday = (date: Date) =>
  localDateString(date) === localDateString(new Date())
