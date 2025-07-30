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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

const RowActions = ({ employee }: { employee: Employee }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/app/employee/edit/${employee.id}`}>
          <DropdownMenuItem>Wijzig</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
            <TableHead>{/* Actions column without label */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!employees.isEmpty() ? (
            employees?.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>
                  {employee.firstName} {employee.lastName}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions employee={employee} />
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
