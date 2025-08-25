"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
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
import { getAllEmployees } from "@/services/employee"
import { Calendar } from "@/types/calendar"
import { Employee } from "@/types/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateTime } from "luxon"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ControllerRenderProps, useForm } from "react-hook-form"
import z from "zod"

type FormFieldComponentProps = {
  field: ControllerRenderProps<
    z.infer<typeof calendarDetailsFormSchema>,
    keyof z.infer<typeof calendarDetailsFormSchema>
  >
  // eslint-disable-next-line
  data?: any[]
}

type FormInput = {
  name: "orderId" | "employeeId" | "date" | "startTime" | "endTime"
  label: string
  input: (props: FormFieldComponentProps) => React.ReactNode
}

const formFields: FormInput[] = [
  {
    name: "orderId",
    label: "Ordernummer",
    input: ({ field }) => <Input type="number" required {...field} />,
  },
  {
    name: "employeeId",
    label: "Medewerker",
    input: ({ field, data }) => {
      return (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          {...field}
        >
          <FormControl className="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een medewerker" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {data?.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    name: "date",
    label: "Datum",
    input: ({ field }) => <Input type="date" required {...field} />,
  },
  {
    name: "startTime",
    label: "Startdatum",
    input: ({ field }) => <Input type="time" required {...field} />,
  },
  {
    name: "endTime",
    label: "Einddatum",
    input: ({ field }) => <Input type="time" required {...field} />,
  },
]

export const calendarDetailsFormSchema = z.object({
  orderId: z.string(),
  employeeId: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
})

type CalendarDetailsForm = {
  submitLabel: string
  calendar?: Calendar
  onSubmit: (values: z.infer<typeof calendarDetailsFormSchema>) => void
}

export default function CalendarDetailsForm({
  submitLabel,
  calendar,
  onSubmit,
}: CalendarDetailsForm) {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllEmployees()
      setEmployees(data)
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof calendarDetailsFormSchema>>({
    resolver: zodResolver(calendarDetailsFormSchema),
    defaultValues: {
      orderId: String(calendar?.job.id ?? ""),
      employeeId: String(calendar?.employee.id ?? ""),
      date: DateTime.local().toISODate(),
      startTime: DateTime.local().toISOTime(),
      endTime: DateTime.local().toISOTime(),
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
                    <data.input field={field} data={employees} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="space-y-2">
            <Button
              type="submit"
              loading={form.formState.isSubmitting}
              className="w-full"
            >
              {submitLabel}
            </Button>
            <Link href="/app/calendar">
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
