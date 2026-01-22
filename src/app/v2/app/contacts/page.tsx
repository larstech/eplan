"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchContacts } from "@/app/v2/features/contact"
import ContactView from "@/app/v2/features/contact/components/view"
import { fetchOrganizations } from "@/app/v2/features/organization"
import { Suspense } from "react"

export default async function Page() {
  const contacts = fetchContacts()
  const organizations = fetchOrganizations()

  return (
    <Suspense fallback={<LoadingState />}>
      <ContactView contactDTOs={contacts} organizationDTOs={organizations} />
    </Suspense>
  )
}
