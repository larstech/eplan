import { authSchema } from "@/features/auth"
import z from "zod"

export type AuthFieldData = {
  name: "email" | "password"
  label: string
  type: string
  placeholder: string
}

export type AuthFormData = z.infer<typeof authSchema>
