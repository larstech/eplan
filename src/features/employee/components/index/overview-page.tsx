"use client"

import { Button } from "@/components/ui/button"
import { DataTable, SortableColumn } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Employee, getEmployees } from "@/features/employee"
import "@/utils/array"
import { getFullName } from "@/utils/employee"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type EmployeeRowActionsParams = { employee: Employee }

const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "name",
    header: ({ column }) => <SortableColumn column={column} name="Naam" />,
    accessorFn: (employee) => `${getFullName(employee)}`,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-right">
        <EmployeeRowActions employee={row.original} />
      </div>
    ),
  },
]

function EmployeeRowActions({ employee }: EmployeeRowActionsParams) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
    const fetchEmployees = async () => {
      const employees = await getEmployees()

      setEmployees(employees)
    }

    fetchEmployees()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/app/employee/create">
        <Button className="w-full">Medewerker toevoegen</Button>
      </Link>

      <DataTable
        data={employees}
        columns={employeeColumns}
        filterColumn="name"
      />
    </div>
  )
}
