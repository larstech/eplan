"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllEmployees } from "@/services/employee"
import { Employee } from "@/types/employee"
import { sortEmployeesByName } from "@/utils/employee"
import { useEffect, useState } from "react"
import "@/utils/array"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EmployeeOverviewPage() {
  const [employees, setEmployees] = useState<Employee[]>([])

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
      <Link href="/app/employee/create">
        <Button className="w-full">Medewerker toevoegen</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Naam</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!employees.isEmpty() ? (
            employees?.map((employee) => (
              <TableRow key={employee.email}>
                <TableCell>
                  {employee.firstName} {employee.lastName}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <i>Er zijn geen medewerkers gevonden.</i>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
