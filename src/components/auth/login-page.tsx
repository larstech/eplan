"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { getGreetingByTime } from "@/libs/greeting"
import { FormInput } from "@/types/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { companyEmail } from "@/utils/regexp"
import { signIn } from "@/services/auth"
import { useRouter } from "next/navigation"
import { translatedError } from "@/utils/supabase"

const formFields: FormInput[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Jouw.Naam@yourtech.nl",
  },
  {
    name: "password",
    label: "Wachtwoord",
    type: "password",
    placeholder: "********",
  },
]

const formSchema = z.object({
  email: z.email({
    error:
      "Het emailadres moet afkomstig zijn van Yourtech. Probeer het opnieuw.",
    pattern: companyEmail,
  }),
  password: z.string(),
})

const FormHeader = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-xl text-center font-bold">{getGreetingByTime()}!</h1>
      <p className="text-sm text-center text-muted-foreground">
        Log in op het Elektronisch Planbord
      </p>
    </div>
  )
}

const FormFooter = () => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        Deze omgeving is uitsluitend bedoeld voor medewerkers van Yourtech. Ben
        je geen medewerker, maar zoek je wel informatie over Yourtech?
      </p>
      <Link href="https://yourtech.nl/nl">
        <Button variant="link">Klik dan hier</Button>
      </Link>
    </div>
  )
}

const FormContent = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const formSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await signIn(values.email, values.password)

    if (result.error) {
      form.setError("root", { message: translatedError(result.error.message) })
      return
    }

    router.push("/")
  }

  return (
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
                  <Input
                    type={data.type}
                    placeholder={data.placeholder}
                    required
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button className="w-full">Inloggen</Button>

        <div className="flex flex-col gap-y-2">
          {form.formState.errors.email && (
            <span className="text-sm text-red-500">
              Fout: {form.formState.errors.email?.message}
            </span>
          )}
          {form.formState.errors.root && (
            <span className="text-sm text-red-500">
              Fout: {form.formState.errors.root?.message}
            </span>
          )}
        </div>
      </form>
    </Form>
  )
}

export function LoginPage() {
  return (
    <div className="space-y-4">
      <FormHeader />
      <FormContent />
      <FormFooter />
    </div>
  )
}
