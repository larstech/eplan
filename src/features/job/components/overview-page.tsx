"use client"

import { Button } from "@/components/ui/button"
import { DataTable, SortableColumn } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAllJobs } from "@/features/job/services/job"
import { Job } from "@/features/job/types"
import { startsWith } from "@/utils/number"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "orderId",
    header: ({ column }) => (
      <SortableColumn column={column} name="Ordernummer" />
    ),
    filterFn: (row, id, filterVal) => startsWith(row.getValue(id), filterVal),
  },
  {
    id: "customerName",
    header: ({ column }) => (
      <SortableColumn column={column} name="Bedrijfsnaam" />
    ),
    accessorFn: (row) => row.customer.companyName,
  },
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "description",
    header: "Omschrijving",
    cell: ({ getValue }) => {
      const value = getValue() as string
      return (
        <div className="w-full max-w-xl text-wrap">
          <span>{value}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original
      return (
        <div className="text-right">
          <RowActions job={job} />
        </div>
      )
    },
  },
]

const RowActions = ({ job }: { job: Job }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/app/admin/job/edit/${job.id}`}>
          <DropdownMenuItem>Wijzig</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function JobOverviewPage() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllJobs()
      setJobs(data)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/app/admin/job/create">
        <Button className="w-full">Werkzaamheid toevoegen</Button>
      </Link>

      <DataTable data={jobs} columns={columns} filterColumn="orderId" />
    </div>
  )
}
