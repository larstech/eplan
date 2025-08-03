"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import LoadingTable from "@/components/skeleton/table"
import { Customer } from "@/types/customer"
import { getAllCustomers } from "@/services/customer"
import { MoreHorizontal } from "lucide-react"

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

export default function CustomerOverviewPage() {
  const [customers, setCustomers] = useState<Customer[] | null>(null)

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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Bedrijfsnaam</TableHead>
            <TableHead className="font-bold">Adres</TableHead>
            <TableHead className="font-bold">Contactpersoon</TableHead>
            <TableHead className="font-bold">Contactnummer</TableHead>
            <TableHead className="font-bold">Reistijd</TableHead>
            <TableHead className="font-bold">Pauzetijd</TableHead>
            <TableHead className="font-bold">Opmerkingen</TableHead>
            <TableHead>{/* Actions column without label */}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers ? (
            !customers.isEmpty() ? (
              customers?.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>
                    {customer.address.street} {customer.address.houseNumber},{" "}
                    {customer.address.postalCode}, {customer.address.city}
                  </TableCell>
                  <TableCell>
                    {customer.contact.firstName} {customer.contact.lastName}
                  </TableCell>
                  <TableCell>{customer.contact.phoneNumber}</TableCell>
                  <TableCell>{customer.travelTimeMinutes} minuten</TableCell>
                  <TableCell>{customer.breakTimeMinutes} minuten</TableCell>
                  <TableCell>{customer.notes}</TableCell>
                  <TableCell className="text-right">
                    <RowActions customer={customer} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <i>Er zijn geen medewerkers gevonden.</i>
                </TableCell>
              </TableRow>
            )
          ) : (
            <LoadingTable cols={8} />
          )}
        </TableBody>
      </Table>
    </div>
  )
}
