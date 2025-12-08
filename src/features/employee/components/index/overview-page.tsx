"use client"

import { Button } from "@/components/ui/button"
import { DataTable, SortableColumn } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Employee } from "@/features/employee"
import { createClient } from "@/lib/supabase/client"
import "@/utils/array"
import { getFullName } from "@/utils/employee"
import { ColumnDef } from "@tanstack/react-table"
import { Asterisk, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type EmployeeRowActionsParams = { employee: Employee }

const employeeColumns: ColumnDef<Employee>[] = [
  {
    id: "name",
    header: ({ column }) => <SortableColumn column={column} name="Naam" />,
    accessorFn: (employee) => `${getFullName(employee)}`,
    cell: (props) => {
      const freelancer = props.row.original.freelancer

      if (!freelancer) {
        return <span>{props.getValue<string>()}</span>
      }

      return (
        <div className="flex items-center gap-x-2">
          <span>{props.getValue<string>()}</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <Asterisk strokeWidth={1.5} />
            </TooltipTrigger>
            <TooltipContent>
              <p>ZZP&apos;er</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )
    },
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
        <Link href={`/app/admin/employee/edit/${employee.id}`}>
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
      const supabase = createClient()
      const { data } = await supabase.from("Employee").select("*")
      return data || []
    }

    fetchEmployees().then((employees) => setEmployees(employees))
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/app/admin/employee/create">
        <Button className="w-full">Medewerker toevoegen</Button>
      </Link>

      <div className="flex items-center rounded-md border-1 text-sm p-1 gap-x-2">
        <Asterisk strokeWidth={1.5} />
        <span>is ZZP&apos;er</span>
      </div>

      <DataTable
        data={employees}
        columns={employeeColumns}
        filterColumn="name"
      />
    </div>
  )
}
