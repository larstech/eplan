"use client"

import { getAllJobs } from "@/services/job"
import { Job } from "@/types/job"
import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { DataTable } from "../ui/data-table"

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "orderId",
    header: "Ordernummer",
  },
  {
    id: "customerName",
    header: "Bedrijfsnaam",
    accessorFn: (row) => row.customer.companyName
  },
  {
    accessorKey: "title",
    header: "Titel",
  },
  {
    accessorKey: "description",
    header: "Omschrijving",
  },
]

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
      <DataTable data={jobs} columns={columns} />
    </div>
  )
}