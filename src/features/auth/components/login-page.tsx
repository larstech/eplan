"use client"

import FormBody from "./form/body"
import FormFooter from "./form/footer"
import FormHeader from "./form/header"
import { authFields, authSchema } from "@/features/auth"
import { signIn } from "@/features/auth/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

export function LoginPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function attemptLogin(values: z.infer<typeof authSchema>) {
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
    <div className="space-y-8">
      <FormHeader />
      <FormBody form={form} fields={authFields} attemptLogin={attemptLogin} />
      <FormFooter />
    </div>
  )
}
