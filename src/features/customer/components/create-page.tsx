"use client"

import CustomerDetailsForm, { customerDetailsFormSchema } from "./details-form"
import { createCustomer } from "@/features/customer/services/customer"
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
      distanceInKm,
      travelTimeMinutes,
      breakTimeMinutes,
      notes,
    } = values

    const createdCustomer = await createCustomer({
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

    toast("Klant aangemaakt", {
      description: createdCustomer.companyName,
    })

    router.push("/app/admin/customer")
  }

  return (
    <CustomerDetailsForm submitLabel="Klant aanmaken" onSubmit={formSubmit} />
  )
}
