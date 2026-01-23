"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchOrganizations } from "@/app/v2/features/organization"
import OrganizationView from "@/app/v2/features/organization/components/view"
import { fetchWorkOrders } from "@/app/v2/features/work-order"
import { Suspense } from "react"

export default async function Page() {
  const organizations = fetchOrganizations()
  const workOrders = fetchWorkOrders()

  return (
    <Suspense fallback={<LoadingState />}>
      <OrganizationView
        organizationDTOs={organizations}
        workOrderDTOs={workOrders}
      />
    </Suspense>
  )
}
