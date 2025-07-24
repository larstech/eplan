"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Employee } from "@/generated/prisma/client"
import { getAllEmployees } from "@/services/employee"
import { sortEmployeesByName } from "@/utils/employee"
import { useEffect, useState } from "react"

export default function EmployeeOverviewPage() {
  const [employees, setEmployees] = useState<Employee[] | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmployees()
      const sortedData = sortEmployeesByName(data)
      setEmployees(sortedData)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Naam</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow key={employee.email}>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
