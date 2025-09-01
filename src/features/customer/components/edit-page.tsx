"use client"

import { Customer } from "../types"
import CustomerDetailsForm, { customerDetailsFormSchema } from "./details-form"
import NotFound from "@/app/not-found"
import LoadingPage from "@/components/skeleton/page"
import {
  editCustomer,
  getCustomerById,
} from "@/features/customer/services/customer"
import { Id } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import z from "zod"

export default function CustomerEditPage({ customerId }: { customerId: Id }) {
  const router = useRouter()
  const [state, setState] = useState<{
    customer: Customer | null
    loading: boolean
  }>({
    customer: null,
    loading: true,
  })

  useEffect(() => {
    const fetchCustomer = async () => {
      const customerData = await getCustomerById(customerId)
      setState({ customer: customerData, loading: false })
    }

    fetchCustomer()
  }, [customerId])

  if (state.loading) {
    return <LoadingPage />
  }

  if (!state.customer) {
    return <NotFound />
  }

  const { customer } = state

  const formSubmit = async (
    values: z.infer<typeof customerDetailsFormSchema>,
  ) => {
    const {
      companyName,
      country,
      postalCode,
      street,
      houseNumber,
      city,
      contactFirstName,
      contactLastName,
      contactPhoneNumber,
      distanceInKm,
      travelTimeMinutes,
      breakTimeMinutes,
      notes,
    } = values

    const createdCustomer = await editCustomer(customerId, {
      companyName: companyName,
      distanceInKm: Number(distanceInKm),
      travelTimeMinutes: Number(travelTimeMinutes),
      breakTimeMinutes: Number(breakTimeMinutes),
      notes: notes,
      address: {
        country: country,
        postalCode: postalCode,
        street: street,
        houseNumber: houseNumber,
        city: city,
      },
      contact: {
        firstName: contactFirstName,
        lastName: contactLastName,
        phoneNumber: contactPhoneNumber,
      },
    })

    toast("Wijzigingen opgeslagen", {
      description: createdCustomer.companyName,
    })

    router.push("/app/customer")
  }

  return (
    <CustomerDetailsForm
      submitLabel="Wijzigingen opslaan"
      onSubmit={formSubmit}
      customer={customer}
    />
  )
}
