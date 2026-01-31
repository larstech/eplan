"use server"

import { AuthFormData, SignUpFormData } from "@/features/auth/types"
import { auth } from "@/lib/auth/server"

export const signIn = async (authDTO: AuthFormData) => {
  try {
    const { error } = await auth.signIn.email({
      email: authDTO.email,
      password: authDTO.password,
    })

    return !error
  } catch {}

  return false
}

export const signUp = async (formData: SignUpFormData) => {
  try {
    await auth.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    })
  } catch {}
}
