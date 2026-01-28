"use server"

import LoadingState from "@/components/loading"
import { fetchOrganizations } from "@/features/organization"
import OrganizationView from "@/features/organization/components/view"
import { fetchWorkOrders } from "@/features/work-order"
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
