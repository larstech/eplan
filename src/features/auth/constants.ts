import { AuthFieldData } from "@/features/auth"
import { companyEmail } from "@/utils/regexp"
import z from "zod"

export const authFields: AuthFieldData[] = [
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

export const authSchema = z.object({
  email: z.email({
    error: "Het emailadres moet afkomstig zijn van Yourtech",
    pattern: companyEmail,
  }),
  password: z.string(),
})
