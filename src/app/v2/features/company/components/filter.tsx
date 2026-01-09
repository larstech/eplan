"use client"

import { Company, CompanyDTO } from "@/app/v2/features/company"
import { Dispatch, SetStateAction, use, useState } from "react"

interface CompanySearchProps {
  companySearchQuery: string
  setCompanySearchQuery: (query: string) => void
}

interface CompanyListItemProps {
  company: Company
  visibleCompanyIds: number[]
  setVisibleCompanyIds: Dispatch<SetStateAction<number[]>>
}

interface CompanyToggleAllProps {
  companies: Company[]
  setVisibleCompanyIds: Dispatch<SetStateAction<number[]>>
}

interface CompanyFilterProps {
  companyDTOs: Promise<CompanyDTO[]>
}

function CompanySearch({
  companySearchQuery,
  setCompanySearchQuery,
}: CompanySearchProps) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Zoek bedrijf..."
      value={companySearchQuery}
      onChange={(e) => setCompanySearchQuery(e.target.value)}
      onClick={(e) => e.stopPropagation()}
    />
  )
}

function CompanyListItem({
  company,
  visibleCompanyIds,
  setVisibleCompanyIds,
}: CompanyListItemProps) {
  return (
    <li key={company.id} className="dropdown-item">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={`filter-company-${company.id}`}
          checked={visibleCompanyIds.includes(company.id)}
          onChange={() => {
            setVisibleCompanyIds((prev) =>
              prev.includes(company.id)
                ? prev.filter((id) => id !== company.id)
                : [...prev, company.id],
            )
          }}
        />
        <label
          className="form-check-label w-100 cursor-pointer"
          htmlFor={`filter-company-${company.id}`}
        >
          {company.name}
        </label>
      </div>
    </li>
  )
}

function CompanyToggleAll({
  companies,
  setVisibleCompanyIds,
}: CompanyToggleAllProps) {
  return (
    <div className="d-flex justify-content-around gap-2">
      <button
        className="btn btn-link p-0 text-decoration-none small"
        onClick={() => setVisibleCompanyIds(companies.map((c) => c.id))}
      >
        Alles aan
      </button>
      <button
        className="btn btn-link p-0 text-decoration-none small"
        onClick={() => setVisibleCompanyIds([])}
      >
        Alles uit
      </button>
    </div>
  )
}

export default function CompanyFilter({ companyDTOs }: CompanyFilterProps) {
  const companies = use(companyDTOs).map((dto) => Company.fromDTO(dto))
  const [visibleCompanyIds, setVisibleCompanyIds] = useState<number[]>(() =>
    companies.map((c) => c.id),
  )
  const [companySearchQuery, setCompanySearchQuery] = useState("")

  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle w-100 d-flex justify-content-between align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        {visibleCompanyIds.length === companies.length
          ? "Alle bedrijven"
          : `Bedrijven (${visibleCompanyIds.length})`}
      </button>
      <ul className="dropdown-menu w-100">
        <li>
          <div className="px-2">
            <CompanySearch
              companySearchQuery={companySearchQuery}
              setCompanySearchQuery={setCompanySearchQuery}
            />
          </div>
        </li>
        <div
          className="overflow-y-scroll border rounded m-2"
          style={{ maxHeight: "50vh" }}
        >
          {companies
            .filter((c) =>
              c.name.toLowerCase().includes(companySearchQuery.toLowerCase()),
            )
            .map((company) => (
              <CompanyListItem
                key={company.id}
                company={company}
                visibleCompanyIds={visibleCompanyIds}
                setVisibleCompanyIds={setVisibleCompanyIds}
              />
            ))}
        </div>
        <li>
          <CompanyToggleAll
            companies={companies}
            setVisibleCompanyIds={setVisibleCompanyIds}
          />
        </li>
      </ul>
    </div>
  )
}
