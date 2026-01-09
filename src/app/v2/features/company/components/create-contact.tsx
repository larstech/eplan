"use client"

import { Company, CompanyDTO } from "@/app/v2/features/company"
import { use } from "react"

interface CompanyCreateContactProps {
  companyDTOs: Promise<CompanyDTO[]>
}

interface CompanyCreateContactFormProps {
  companies: Company[]
}

function CompanyCreateContactForm({
  companies,
}: CompanyCreateContactFormProps) {
  return (
    <div
      id="company-create-contact-form"
      className="modal fade"
      tabIndex={-1}
      data-bs-backdrop="static"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form>
            <div className="modal-header">
              <h5 className="modal-title">Nieuw contact</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Bedrijf</label>
                <select className="form-select">
                  {companies.map((company) => (
                    <option key={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>

              {/* Company branch's location information */}
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Postcode</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Stad</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Straatnaam</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Huisnummer</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <hr className="border-secondary-subtle" />

              {/* Company branch's contact personal information */}
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Voornaam</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Achternaam</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="form-label">E-mailadres</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Telefoonnummer</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
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

export default function CompanyCreateContact({
  companyDTOs,
}: CompanyCreateContactProps) {
  const companies = use(companyDTOs).map((company) => Company.fromDTO(company))

  return (
    <>
      <button
        type="button"
        className="btn btn-light"
        data-bs-target="#company-create-contact-form"
        data-bs-toggle="modal"
      >
        Nieuw contact
      </button>

      <CompanyCreateContactForm companies={companies} />
    </>
  )
}
