import { ScheduleWeek } from "@/features/schedule"
import { route } from "@/helpers/routes"
import { redirect, RedirectType } from "next/navigation"

export default function Schedule() {
  const today = ScheduleWeek.today()
  redirect(
    route.schedule + `/${today.year}/${today.week}`,
    RedirectType.replace,
  )
}
