"use server"

import LoadingState from "@/components/loading"
import { fetchEmployees } from "@/features/employee"
import EmployeeView from "@/features/employee/components/view"
import { Suspense } from "react"

export default async function Page() {
  const employees = fetchEmployees()

  return (
    <Suspense fallback={<LoadingState />}>
      <EmployeeView employeeDTOs={employees} />
    </Suspense>
  )
}
