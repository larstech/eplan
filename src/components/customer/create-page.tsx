"use client"

import CustomerDetailsForm, { customerDetailsFormSchema } from "./details-form"
import { createCustomer } from "@/services/customer"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import z from "zod"

export default function CustomerCreatePage() {
  const router = useRouter()

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
      travelTimeMinutes,
      breakTimeMinutes,
      notes,
    } = values

    const createdCustomer = await createCustomer({
      companyName: companyName,
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

    toast("Klant aangemaakt", {
      description: createdCustomer.companyName,
    })

    router.push("/app/customer")
  }

  return (
    <CustomerDetailsForm submitLabel="Klant aanmaken" onSubmit={formSubmit} />
  )
}
