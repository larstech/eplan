import { ScheduleWeek } from "@/app/v2/features/schedule"
import { route, routes } from "@/app/v2/helpers/routes"
import { redirect, RedirectType } from "next/navigation"

export default function Schedule() {
  const today = ScheduleWeek.today()
  redirect(
    route(routes.schedule + `/${today.year}/${today.week}`),
    RedirectType.replace,
  )
}
