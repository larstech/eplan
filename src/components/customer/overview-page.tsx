"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import "@/utils/array"
import LoadingTable from "@/components/skeleton/table"
import { Customer } from "@/types/customer"
import { getAllCustomers } from "@/services/customer"

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
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers ? (
            !customers.isEmpty() ? (
              customers?.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>
                    {customer.address?.street} {customer.address?.houseNumber},{" "}
                    {customer.address?.postalCode}, {customer.address?.city}
                  </TableCell>
                  <TableCell>
                    {customer.contact?.firstName} {customer.contact?.lastName}
                  </TableCell>
                  <TableCell>{customer.contact?.phoneNumber}</TableCell>
                  <TableCell>{customer.travelTimeMinutes} minuten</TableCell>
                  <TableCell>{customer.breakTimeMinutes} minuten</TableCell>
                  <TableCell>{customer.notes}</TableCell>
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
            <LoadingTable cols={7} />
          )}
        </TableBody>
      </Table>
    </div>
  )
}
