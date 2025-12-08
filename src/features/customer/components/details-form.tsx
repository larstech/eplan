"use client"

import { Customer } from "../types"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"

type FormInput = {
  name:
    | "companyName"
    | "country"
    | "postalCode"
    | "street"
    | "houseNumber"
    | "city"
    | "contactFirstName"
    | "contactLastName"
    | "contactPhoneNumber"
    | "distanceInKm"
    | "travelTimeMinutes"
    | "breakTimeMinutes"
    | "notes"
  label: string
  type?: string
}

const formFields: { items: FormInput[] }[] = [
  {
    items: [
      {
        name: "companyName",
        label: "Bedrijfsnaam",
      },
      {
        name: "contactFirstName",
        label: "Voornaam contactpersoon",
      },
      {
        name: "contactLastName",
        label: "Achternaam contactpersoon",
      },
      {
        name: "contactPhoneNumber",
        label: "Telefoonnummer contactpersoon",
      },
    ],
  },
  {
    items: [
      {
        name: "country",
        label: "Land",
      },
      {
        name: "postalCode",
        label: "Postcode",
      },
      {
        name: "street",
        label: "Straat",
      },
      {
        name: "houseNumber",
        label: "Huisnummer",
      },
      {
        name: "city",
        label: "Stad",
      },
    ],
  },
  {
    items: [
      {
        name: "distanceInKm",
        label: "Afstand (enkele reis; hele kilometers)",
        type: "number",
      },
      {
        name: "travelTimeMinutes",
        label: "Reistijd (enkele reis; in minuten)",
        type: "number",
      },
      {
        name: "breakTimeMinutes",
        label: "Pauzetijd (enkele reis; in minuten)",
        type: "number",
      },
      {
        name: "notes",
        label: "Opmerkingen (optioneel)",
      },
    ],
  },
]

export const customerDetailsFormSchema = z.object({
  companyName: z.string(),
  country: z.string(),
  postalCode: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  city: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string(),
  contactPhoneNumber: z.string(),
  distanceInKm: z.string(),
  travelTimeMinutes: z.string(),
  breakTimeMinutes: z.string(),
  notes: z.string(),
})

type CustomerDetailsForm = {
  submitLabel: string
  customer?: Customer
  onSubmit: (values: z.infer<typeof customerDetailsFormSchema>) => void
}

export default function CustomerDetailsForm({
  submitLabel,
  customer,
  onSubmit,
}: CustomerDetailsForm) {
  const form = useForm<z.infer<typeof customerDetailsFormSchema>>({
    resolver: zodResolver(customerDetailsFormSchema),
    defaultValues: {
      companyName: customer?.companyName ?? "",
      country: customer?.address?.country ?? "",
      postalCode: customer?.address?.postalCode ?? "",
      street: customer?.address?.street ?? "",
      houseNumber: customer?.address?.houseNumber ?? "",
      city: customer?.address?.city ?? "",
      contactFirstName: customer?.contact?.firstName ?? "",
      contactLastName: customer?.contact?.lastName ?? "",
      contactPhoneNumber: customer?.contact?.phoneNumber ?? "",
      distanceInKm: String(customer?.distanceInKm) ?? "",
      travelTimeMinutes: String(customer?.travelTimeMinutes) ?? "",
      breakTimeMinutes: String(customer?.breakTimeMinutes) ?? "",
      notes: customer?.notes ?? "",
    },
  })

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-2">
            {formFields.map((data, index) => (
              <div key={index}>
                {data.items?.map((item) => (
                  <FormField
                    key={item.name}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem className="py-2">
                        <FormLabel className="font-semibold">
                          {item.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            type={item.type ?? "text"}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Button loading={form.formState.isSubmitting} className="w-full">
              {submitLabel}
            </Button>
            <Link href="/app/admin/customer">
              <Button className="w-full" variant="outline">
                Annuleren
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  )
}
