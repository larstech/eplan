"use client"

import { ScheduleWeek } from "@/features/schedule"
import { useRouter } from "next/navigation"

export default function ScheduleError() {
  const router = useRouter()
  const goToWeek = (y: number, w: number) => {
    router.push(`/v2/app/schedule/${y}/${w}`)
  }

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="card">
        <div className="card-header">Foutmelding</div>
        <div className="card-body">
          <h5 className="card-title">Ongeldig jaartal of weeknummer</h5>
          <p className="card-text">
            Probeer het opnieuw, of ga direct naar de huidige week
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              goToWeek(ScheduleWeek.today().year, ScheduleWeek.today().week)
            }}
          >
            Ga naar deze week
          </button>
        </div>
      </div>
    </div>
  )
}
