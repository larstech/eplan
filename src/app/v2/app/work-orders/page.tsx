"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchContacts } from "@/app/v2/features/contact"
import { fetchOrganizations } from "@/app/v2/features/organization"
import { fetchWorkOrders } from "@/app/v2/features/work-order"
import WorkOrderView from "@/app/v2/features/work-order/components/view"
import { Suspense } from "react"

export default async function Page() {
  const workOrder = fetchWorkOrders()
  const contacts = fetchContacts()
  const organizations = fetchOrganizations()

  return (
    <Suspense fallback={<LoadingState />}>
      <WorkOrderView
        workOrderDTOs={workOrder}
        contactDTOs={contacts}
        organizationDTOs={organizations}
      />
    </Suspense>
  )
}
