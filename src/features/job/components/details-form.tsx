"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getAllCustomers } from "@/features/customer/services/customer"
import { Customer } from "@/features/customer/types"
import { Job } from "@/features/job/types"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import z from "zod"

type FormFieldComponentProps = {
  field: ControllerRenderProps<
    z.infer<typeof jobDetailsFormSchema>,
    keyof z.infer<typeof jobDetailsFormSchema>
  >
  // eslint-disable-next-line
  data: any[]
}

type FormInput = {
  name: "orderId" | "customerId" | "title" | "description"
  label: string
  input: (props: FormFieldComponentProps) => React.ReactNode
}

const formFields: FormInput[] = [
  {
    name: "orderId",
    label: "Ordernummer",
    input: ({ field }) => <Input required type="number" {...field} />,
  },
  {
    name: "customerId",
    label: "Klant",
    input: ({ field, data }) => {
      return (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...field}
        >
          <FormControl className="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een klant" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {data.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.companyName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    name: "title",
    label: "Titel",
    input: ({ field }) => <Input required {...field} />,
  },
  {
    name: "description",
    label: "Omschrijving",
    input: ({ field }) => <Textarea required {...field} />,
  },
]

export const jobDetailsFormSchema = z.object({
  orderId: z.string(),
  customerId: z.string(),
  title: z.string().min(3, { error: "Gebruik minimaal 3 tekens" }),
  description: z.string().min(3, { error: "Gebruik minimaal 3 tekens" }),
})

type JobDetailsForm = {
  submitLabel: string
  job?: Job
  onSubmit: (values: z.infer<typeof jobDetailsFormSchema>) => void
}

export default function JobDetailsForm({
  submitLabel,
  job,
  onSubmit,
}: JobDetailsForm) {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllCustomers()
      const sortedData = data.sort((a, b) =>
        a.companyName.localeCompare(b.companyName),
      )
      setCustomers(sortedData)
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof jobDetailsFormSchema>>({
    resolver: zodResolver(jobDetailsFormSchema),
    defaultValues: {
      orderId: String(job?.orderId ?? ""),
      customerId: job?.customer.id ?? "",
      title: job?.title ?? "",
      description: job?.description ?? "",
    },
  })

  return (
    <div className="md:w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((data) => (
            <FormField
              key={data.name}
              control={form.control}
              name={data.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">{data.label}</FormLabel>
                  <FormControl>
                    <data.input field={field} data={customers} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="space-y-2">
            <Button loading={form.formState.isSubmitting} className="w-full">
              {submitLabel}
            </Button>
            <Link href="/app/job">
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
