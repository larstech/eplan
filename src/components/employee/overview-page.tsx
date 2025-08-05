"use client"

import { DataTable } from "../ui/data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAllEmployees } from "@/services/employee"
import { Employee } from "@/types/employee"
import "@/utils/array"
import { sortEmployeesByName } from "@/utils/employee"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

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

const columns: ColumnDef<Employee>[] = [
  {
    id: "name",
    header: "Naam",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const employee = row.original
      return (
        <div className="text-right">
          <RowActions employee={employee} />
        </div>
      )
    },
  },
]

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

      <DataTable data={employees} columns={columns} />
    </div>
  )
}
