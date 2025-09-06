"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const signInResult = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  return signInResult
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut({ scope: "local" })

  revalidatePath("/")
  redirect("/")
}
