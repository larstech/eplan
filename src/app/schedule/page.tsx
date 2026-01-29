import { route } from "@/helpers/routes"
import { DateTime } from "luxon"
import { redirect, RedirectType } from "next/navigation"

export default function Schedule() {
  const today = DateTime.now()

  // There is no global schedule overview, so redirect to today's week
  redirect(
    route.schedule + `/${today.year}/${today.weekNumber}`,
    RedirectType.replace,
  )
}
