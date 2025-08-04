"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import "@/utils/array"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Customer } from "@/types/customer"
import { getAllCustomers } from "@/services/customer"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../ui/data-table"

const RowActions = ({ customer }: { customer: Customer }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`/app/customer/edit/${customer.id}`}>
          <DropdownMenuItem>Wijzig</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "companyName",
    header: "Bedrijfsnaam",
  },
  {
    id: "address",
    header: "Adres",
    accessorFn: (row) =>
      `${row.address.street} ${row.address.houseNumber}, ${row.address.postalCode}, ${row.address.city}`,
  },
  {
    id: "contactPerson",
    header: "Contactpersoon",
    accessorFn: (row) => `${row.contact.firstName} ${row.contact.lastName}`,
  },
  {
    id: "contactNumber",
    header: "Contactnummer",
    accessorFn: (row) => row.contact.phoneNumber,
  },
  {
    accessorKey: "travelTimeMinutes",
    header: "Reistijd",
  },
  {
    accessorKey: "breakTimeMinutes",
    header: "Pauzetijd",
  },
  {
    accessorKey: "notes",
    header: "Opmerkingen",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="text-right">
          <RowActions customer={customer} />
        </div>
      )
    },
  },
]

export default function CustomerOverviewPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCustomers()
      setCustomers(data)
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/app/customer/create">
        <Button className="w-full">Klant toevoegen</Button>
      </Link>

      <DataTable data={customers} columns={columns} />
    </div>
  )
}
