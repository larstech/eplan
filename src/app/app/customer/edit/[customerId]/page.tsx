import CustomerEditPage from "@/components/app/customer/edit-page"
import { Id } from "@/types/id"

type PageParams = Promise<{ customerId: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { customerId } = await params
  return <CustomerEditPage customerId={customerId} />
}
