"use client"

import { Button } from "../ui/button"
import { DataTable } from "../ui/data-table"
import { getAllJobs } from "@/services/job"
import { Job } from "@/types/job"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useEffect, useState } from "react"

const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "orderId",
    header: "Ordernummer",
  },
  {
    id: "customerName",
    header: "Bedrijfsnaam",
    accessorFn: (row) => row.customer.companyName,
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
      <Link href="/app/job/create">
        <Button className="w-full">Werkzaamheid toevoegen</Button>
      </Link>

      <DataTable data={jobs} columns={columns} />
    </div>
  )
}
