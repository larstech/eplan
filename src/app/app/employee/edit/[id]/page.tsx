import EmployeeEditPage from "@/components/employee/edit-page"
import { getEmployeeById } from "@/services/employee"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employee = await getEmployeeById(id)

  return <EmployeeEditPage employee={employee!} />
}
