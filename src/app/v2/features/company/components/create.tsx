function CompanyCreateForm() {
  return (
    <div
      id="company-create-form"
      className="modal fade"
      tabIndex={-1}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h5 className="modal-title">Nieuw bedrijf</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <label className="form-label">Bedrijfsnaam</label>
              <input type="text" className="form-control" />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Sluiten
              </button>
              <button type="submit" className="btn btn-primary">
                Opslaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function CompanyCreate() {
  return (
    <>
      <button
        type="button"
        className="btn btn-light"
        data-bs-target="#company-create-form"
        data-bs-toggle="modal"
      >
        Nieuw bedrijf
      </button>

      <CompanyCreateForm />
    </>
  )
}
