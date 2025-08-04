"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Employee } from "@/types/employee"

type FormInput = {
  name: "firstName" | "lastName"
  label: string
}

const formFields: FormInput[] = [
  {
    name: "firstName",
    label: "Voornaam",
  },
  {
    name: "lastName",
    label: "Achternaam",
  },
]

export const employeeDetailsFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

type EmployeeDetailsForm = {
  submitLabel: string
  employee?: Employee
  onSubmit: (values: z.infer<typeof employeeDetailsFormSchema>) => void
}

export default function EmployeeDetailsForm({
  submitLabel,
  employee,
  onSubmit,
}: EmployeeDetailsForm) {
  const form = useForm<z.infer<typeof employeeDetailsFormSchema>>({
    resolver: zodResolver(employeeDetailsFormSchema),
    defaultValues: {
      firstName: employee?.firstName ?? "",
      lastName: employee?.lastName ?? "",
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
                    <Input required {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <div className="space-y-2">
            <Button loading={form.formState.isSubmitting} className="w-full">
              {submitLabel}
            </Button>
            <Link href="/app/employee">
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
