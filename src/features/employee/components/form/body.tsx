"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Employee,
  employeeFields,
  EmployeeForm,
  employeeSchema,
} from "@/features/employee"
import { boolToStr } from "@/utils/boolean"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"

type EmployeeDetailsFormParams = {
  submitLabel: string
  employee?: Employee
  handleSubmit: (values: z.infer<typeof employeeSchema>) => void
}

export default function EmployeeDetailsForm({
  submitLabel,
  employee,
  handleSubmit: onSubmit,
}: EmployeeDetailsFormParams) {
  const form = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: employee?.firstName ?? "",
      lastName: employee?.lastName ?? "",
      freelancer: boolToStr(employee?.freelancer ?? false),
    },
  })

  return (
    <div className="md:w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {employeeFields.map((data) => (
            <FormField
              key={data.name}
              control={form.control}
              name={data.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">{data.label}</FormLabel>
                  <FormControl>
                    <data.input field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <div className="space-y-2">
            <Button loading={form.formState.isSubmitting} className="w-full">
              {submitLabel}
            </Button>
            <Link href="/app/admin/employee">
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
