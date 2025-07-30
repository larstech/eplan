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
import { createEmployee } from "@/services/employee"
import Link from "next/link"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export type FormInput = {
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

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

export default function EmployeeCreatePage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })

  const formSubmit = async (values: z.infer<typeof formSchema>) => {
    const { firstName, lastName } = values
    const createdEmployee = await createEmployee({
      firstName: firstName,
      lastName: lastName,
    })

    toast("Medewerker aangemaakt", {
      description: `${createdEmployee.firstName} ${createdEmployee.lastName}`,
    })

    router.push("/app/employee")
  }

  return (
    <div className="md:w-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
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
            <Button className="w-full">Medewerker aanmaken</Button>
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
