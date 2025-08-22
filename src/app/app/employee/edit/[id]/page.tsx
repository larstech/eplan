import EmployeeEditPage from "@/components/app/employee/edit-page"
import { Id } from "@/types/id"

type PageParams = Promise<{ id: Id }>

export default async function Page({ params }: { params: PageParams }) {
  const { id } = await params
  return <EmployeeEditPage id={id} />
}
