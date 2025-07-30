import EmployeeEditPage from "@/components/employee/edit-page"
import { getEmployeeById } from "@/services/employee"

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params
  const employee = await getEmployeeById(Number(id))

  return <EmployeeEditPage employee={employee!} />
}
