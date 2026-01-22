"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchOrganizations } from "@/app/v2/features/organization"
import OrganizationView from "@/app/v2/features/organization/components/view"
import { Suspense } from "react"

export default async function Page() {
  const organizations = fetchOrganizations()

  return (
    <Suspense fallback={<LoadingState />}>
      <OrganizationView organizationDTOs={organizations} />
    </Suspense>
  )
}
