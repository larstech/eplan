export default function ScheduleError() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="card">
        <div className="card-header">Foutmelding</div>
        <div className="card-body">
          <h5 className="card-title">Ongeldig jaartal of weeknummer</h5>
          <p className="card-text">
            Probeer het opnieuw, of ga direct naar de huidige week
          </p>
        </div>
      </div>
    </div>
  )
}
