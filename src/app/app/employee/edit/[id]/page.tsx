import EmployeeEditPage from "@/components/employee/edit-page"
import { getEmployeeById } from "@/services/employee"
import { Id } from "@/types/id"

export default async function Page({
  params,
}: {
  params: Promise<{ id: Id }>
}) {
  const { id } = await params
  const employee = await getEmployeeById(id)

  return <EmployeeEditPage employee={employee!} />
}
