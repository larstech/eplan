export default function LoadingState() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Laden...</span>
      </div>
    </div>
  )
}
