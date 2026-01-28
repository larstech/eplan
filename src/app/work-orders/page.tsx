"use server"

import LoadingState from "@/components/loading"
import { fetchContacts } from "@/features/contact"
import { fetchOrganizations } from "@/features/organization"
import { fetchWorkOrders } from "@/features/work-order"
import WorkOrderView from "@/features/work-order/components/view"
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
