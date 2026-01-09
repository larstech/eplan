import LoadingState from "@/app/v2/components/loading"
import { fetchCompanies } from "@/app/v2/features/company"
import CompanyCreate from "@/app/v2/features/company/components/create"
import CompanyCreateContact from "@/app/v2/features/company/components/create-contact"
import CompanyFilter from "@/app/v2/features/company/components/filter"
import { Suspense } from "react"

export default async function CompanyView() {
  const companies = fetchCompanies()

  return (
    <div className="card">
      <div className="card-header">Bedrijven</div>
      <div className="card-body d-flex flex-column gap-2">
        <Suspense fallback={<LoadingState />}>
          <CompanyFilter companyDTOs={companies} />
          <CompanyCreate />
          <CompanyCreateContact companyDTOs={companies} />
        </Suspense>
      </div>
    </div>
  )
}
