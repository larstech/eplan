import { min_year, max_year, min_week } from "@/app/v2/features/schedule"
import { weeksInYear } from "@/app/v2/helpers/date"

export interface ScheduleWeekDTO {
  id: number
  year: number
  week: number
}

export class ScheduleWeek {
  static fromDTO(dto: ScheduleWeekDTO): ScheduleWeek {
    return new ScheduleWeek(dto.year, dto.week)
  }

  static today(): ScheduleWeek {
    const now = new Date()

    // ISO week date weeks start on Monday
    const date = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
    )

    // Thursday in the current week decides the year
    const day = date.getUTCDay() || 7
    date.setUTCDate(date.getUTCDate() + 4 - day)

    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
    const week = Math.ceil(
      ((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
    )

    return new ScheduleWeek(date.getUTCFullYear(), week)
  }

  constructor(
    public year: number,
    public week: number,
  ) {}

  datesInRange(): Date[] {
    // Get Monday of the ISO week
    const simple = new Date(Date.UTC(this.year, 0, 1 + (this.week - 1) * 7))
    const dayOfWeek = simple.getUTCDay() || 7

    const monday = new Date(simple)
    if (dayOfWeek <= 4) {
      monday.setUTCDate(simple.getUTCDate() - dayOfWeek + 1)
    } else {
      monday.setUTCDate(simple.getUTCDate() + 8 - dayOfWeek)
    }

    // Build Monday -> Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setUTCDate(monday.getUTCDate() + i)
      return d
    })
  }

  start(): Date {
    return this.datesInRange()[0]
  }

  end(): Date {
    return this.datesInRange()[this.datesInRange().length - 1]
  }

  previous(): ScheduleWeek {
    if (this.year === min_year && this.week === min_week) {
      return this
    }

    // The previous week is in the same year
    if (this.week > min_week) {
      return new ScheduleWeek(this.year, this.week - 1)
    }

    // The previous week is in the previous year
    const prevYear = this.year - 1
    return new ScheduleWeek(prevYear, weeksInYear(prevYear))
  }

  next(): ScheduleWeek {
    const weeksThisYear = weeksInYear(this.year)

    if (this.year === max_year && this.week === weeksThisYear) {
      return this
    }

    // The next week is in the same year
    if (this.week < weeksThisYear) {
      return new ScheduleWeek(this.year, this.week + 1)
    }

    // The next week is in the next year
    return new ScheduleWeek(this.year + 1, min_week)
  }
}
