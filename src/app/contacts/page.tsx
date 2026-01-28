"use server"

import LoadingState from "@/components/loading"
import { fetchContacts } from "@/features/contact"
import ContactView from "@/features/contact/components/view"
import { fetchOrganizations } from "@/features/organization"
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
