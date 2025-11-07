"use client"

import { Button } from "../../../components/ui/button"
import { Calendar } from "../../../components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { createCalendarFromBulk } from "../services/calendar"
import { Employee } from "@/features/employee"
import { getEmployees } from "@/features/employee/services"
import { sortEmployeesByName } from "@/utils/employee"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronDownIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm, ControllerRenderProps, FieldPath } from "react-hook-form"
import z from "zod"
import { Job } from "@/features/job/types"
import { getJobByOrderId } from "@/features/job/services/job"

const schema = z.object({
  orderId: z.string().min(1, "Ordernummer is verplicht"),
  employees: z
    .array(
      z.object({
        employeeId: z.string().min(1, "Selecteer een medewerker"),
        dates: z.array(z.string()).min(1, "Selecteer minstens één datum"),
        startTime: z.string().min(1, "Starttijd is verplicht"),
        endTime: z.string().min(1, "Eindtijd is verplicht"),
      }),
    )
    .min(1, "Plan minstens één medewerker in"),
})

type FormValues = z.infer<typeof schema>

type FormFieldComponentProps = {
  field: ControllerRenderProps<FormValues, FieldPath<FormValues>>
  data: Employee[]
}

type FormInput = {
  name: "employeeId" | "dates" | "startTime" | "endTime"
  label: string
  input: (props: FormFieldComponentProps) => React.ReactNode
}

const formFields: FormInput[] = [
  {
    name: "employeeId",
    label: "Medewerker",
    input: ({ field, data }) => {
      const value = field.value ? String(field.value) : ""
      return (
        <Select value={value} onValueChange={(val) => field.onChange(val)}>
          <FormControl className="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een medewerker" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {data.map((employee) => (
              <SelectItem key={String(employee.id)} value={String(employee.id)}>
                {employee.firstName} {employee.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    },
  },
  {
    name: "dates",
    label: "Datums",
    input: ({ field }) => {
      const selectedDatesStrings = Array.isArray(field.value)
        ? (field.value as string[])
        : []

      const selectedDateObjects: Date[] = selectedDatesStrings
        .map((selectedDate) => {
          const date = new Date(selectedDate)
          return isNaN(date.getTime()) ? null : date
        })
        .filter((date): date is Date => date !== null)

      const handleSelect = (dates: Date[] | Date | null) => {
        if (!dates) return
        const arr = Array.isArray(dates) ? dates : [dates]
        field.onChange(arr.map((date) => date.toISOString()))
      }

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="dates"
              className="justify-between font-normal w-full"
            >
              {selectedDateObjects.length > 0
                ? `${selectedDateObjects.length} datum(s) geselecteerd`
                : "Selecteer datums"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="multiple"
              selected={selectedDateObjects}
              onSelect={handleSelect}
              defaultMonth={new Date()}
              required
              showWeekNumber
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      )
    },
  },
  {
    name: "startTime",
    label: "Starttijd",
    input: ({ field }) => (
      <Input
        required
        type="time"
        {...field}
        value={field.value as string}
        onChange={(e) => field.onChange(e.target.value)}
      />
    ),
  },
  {
    name: "endTime",
    label: "Eindtijd",
    input: ({ field }) => (
      <Input
        required
        type="time"
        {...field}
        value={field.value as string}
        onChange={(e) => field.onChange(e.target.value)}
      />
    ),
  },
]

export default function CalendarCreatePage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeCount, setEmployeeCount] = useState(1)
  const router = useRouter()
  // The job that is the result of the order id. Used as a validation mechanism,
  // to ensure that the order id that is filled in is the correct one.
  const [job, setJob] = useState<Job | null>();
  // The buffers stores the text typed in the input field. Used for displaying
  // the correct state for the fetched job (which could either be something or
  // null).
  const [orderIdBuffer, setOrderIdBuffer] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      orderId: "",
      employees: Array.from({ length: employeeCount }).map(() => ({
        employeeId: "",
        dates: [] as string[],
        startTime: "",
        endTime: "",
      })),
    },
  })

  useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const data = await getEmployees()
        const sortedData = sortEmployeesByName(data)
        if (mounted) setEmployees(sortedData)
      } catch (err) {
        console.error("Failed to fetch employees:", err)
      }
    }

    fetchData()
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const current = form.getValues("employees")
    if (employeeCount > current.length) {
      form.setValue("employees", [
        ...current,
        ...Array.from({ length: employeeCount - current.length }).map(() => ({
          employeeId: "",
          dates: [],
          startTime: "",
          endTime: "",
        })),
      ])
    } else if (employeeCount < current.length) {
      form.setValue("employees", current.slice(0, employeeCount))
    }
  }, [employeeCount, form])

  const onSubmit = async (values: FormValues) => {
    await createCalendarFromBulk(values)
    router.push("/app/calendar")
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Ordernummer</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={async (e) => {
                      field.onChange(e);
                      setOrderIdBuffer(e.target.value);
                      if (e.target.value != "") {
                        setJob(await getJobByOrderId(parseInt(e.target.value)));
                      } else {
                        setJob(null);
                      }
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel className="pb-2 font-semibold">
                Aantal medewerkers
              </FormLabel>
              <Input
                type="number"
                min={1}
                max={10}
                value={employeeCount}
                onChange={(e) =>
                  setEmployeeCount(Math.max(1, Number(e.target.value) || 1))
                }
              />
            </div>
          </div>
          {
            job &&
            <div className="border-1 rounded-md p-2 border-primary">
              <b>Bedrijfsnaam</b><br />
              <span>{job.customer.companyName}</span><br /><br/>

              <b>Omschrijving</b><br />
              <span>{job.description}</span>
            </div>
          }
          {
            !job && orderIdBuffer != "" &&
            <div>
              <span className="text-red-500">Order niet gevonden in het systeem</span>
            </div>
          }
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 gap-y-8">
            {Array.from({ length: employeeCount }).map((_, outerIndex) =>
              formFields.map((fieldConfig) => {
                const path =
                  `employees.${outerIndex}.${fieldConfig.name}` as unknown as FieldPath<FormValues>
                return (
                  <FormField
                    key={`${outerIndex}-${fieldConfig.name}`}
                    control={form.control}
                    name={path}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          {fieldConfig.label}
                        </FormLabel>
                        <FormControl>
                          {fieldConfig.input({ field, data: employees })}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              }),
            )}
          </div>
          <Button
            type="submit"
            loading={form.formState.isSubmitting}
            className="w-full"
          >
            Medewerkers inplannen
          </Button>
        </form>
      </Form>
    </div>
  )
}
