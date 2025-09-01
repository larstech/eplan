import EmployeeEditPage from "@/features/employee/components/edit-page"
import { Id } from "@/types"

type PageParams = Promise<{ id: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params
  return <EmployeeEditPage id={id} />
}
