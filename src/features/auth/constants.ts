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
    error: "Het emailadres moet afkomstig zijn van Yourtech",
    // Supabase authentication email is case-insensitive.
    pattern: new RegExp("\\w+@yourtech\.nl", "i"),
  }),
  password: z.string(),
})
