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

  const authForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      // Leave blank because we don't know this about the visitor.
      email: "",
      password: "",
    },
  })

  async function handleLoginAttempt(values: z.infer<typeof authSchema>) {
    const { email, password } = values

    const signInResult = await signIn(email, password)
    const signInSuccessfull = !signInResult.error

    if (!signInSuccessfull) {
      authForm.setError("root", {
        message:
          "Ongeldige inloggegevens. Neem contact op met de administrator als het probleem aanhoudt.",
      })
      return
    }

    router.replace("/")
  }

  return (
    <div className="space-y-6">
      <FormHeader />
      <FormBody
        form={authForm}
        fields={authFields}
        handleSubmit={handleLoginAttempt}
      />
      <FormFooter />
    </div>
  )
}
