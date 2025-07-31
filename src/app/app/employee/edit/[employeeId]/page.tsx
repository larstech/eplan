import EmployeeEditPage from "@/components/employee/edit-page"
import { Id } from "@/types/id"

type PageParams = Promise<{ employeeId: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { employeeId } = await params
  return <EmployeeEditPage employeeId={employeeId} />
}
