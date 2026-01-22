"use server"

import LoadingState from "@/app/v2/components/loading"
import { fetchEmployees } from "@/app/v2/features/employee"
import EmployeeView from "@/app/v2/features/employee/components/view"
import { Suspense } from "react"

export default async function Page() {
  const employees = fetchEmployees()

  return (
    <Suspense fallback={<LoadingState />}>
      <EmployeeView employeeDTOs={employees} />
    </Suspense>
  )
}
