"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Employee } from "@/types/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"

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

export const employeeSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

type EmployeeDetailsForm = {
  submitLabel: string
  employee?: Employee
  onSubmit: (values: z.infer<typeof employeeSchema>) => void
}

export default function EmployeeDetailsForm({
  submitLabel,
  employee,
  onSubmit,
}: EmployeeDetailsForm) {
  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
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
