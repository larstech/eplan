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
import { signIn } from "@/features/auth/services/auth"
import { getGreetingByTime } from "@/lib/greeting"
import { companyEmail } from "@/utils/regexp"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

type FieldData = {
  name: "email" | "password"
  label: string
  type: string
  placeholder: string
}

const fields: FieldData[] = [
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

const schema = z.object({
  email: z.email({
    error: "Het emailadres moet afkomstig zijn van Yourtech",
    pattern: companyEmail,
  }),
  password: z.string(),
})

function FormHeader() {
  const timeBasedGreeting = getGreetingByTime()

  return (
    <div className="space-y-2">
      <h1 className="text-xl text-center font-bold">{timeBasedGreeting}!</h1>
      <p className="text-sm text-center text-muted-foreground">
        Log in op het Elektronisch Planbord
      </p>
    </div>
  )
}

function FormContent() {
  const router = useRouter()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const attemptLogin = async (values: z.infer<typeof schema>) => {
    const result = await signIn(values.email, values.password)

    if (result.error) {
      // Note to future self: Struggled with Supabase localized error messages. Defaulting to display the most common error.
      form.setError("root", {
        message:
          "Ongeldige inloggegevens. Neem contact op met de administrator als het probleem aanhoudt.",
      })
      return
    }

    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(attemptLogin)} className="space-y-8">
        {fields.map((data) => (
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
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button loading={form.formState.isSubmitting} className="w-full">
          Inloggen
        </Button>

        {form.formState.errors.root && (
          <span className="text-sm text-red-500">
            Fout: {form.formState.errors.root.message}
          </span>
        )}
      </form>
    </Form>
  )
}

function FormFooter() {
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

export function LoginPage() {
  return (
    <div className="space-y-8">
      <FormHeader />
      <FormContent />
      <FormFooter />
    </div>
  )
}
