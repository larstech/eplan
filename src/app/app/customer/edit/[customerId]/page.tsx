import CustomerEditPage from "@/features/customer/components/edit-page"
import { Id } from "@/types"

type PageParams = Promise<{ customerId: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { customerId } = await params
  return <CustomerEditPage customerId={customerId} />
}
