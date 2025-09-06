import { AuthFieldData } from "@/features/auth"
import z from "zod"

export const authFields: AuthFieldData[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "jouw.naam@yourtech.nl",
  },
  {
    name: "password",
    label: "Wachtwoord",
    type: "password",
    placeholder: "••••••••••••••••",
  },
]

export const authSchema = z.object({
  email: z.email({
    error: "De email moet eindigen met @yourtech.nl",
    // Supabase authentication email is case-insensitive.
    pattern: new RegExp("\\w+@yourtech\.nl", "i"),
  }),
  password: z.string(),
})
