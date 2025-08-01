"use server"

import { createClient } from "@/libs/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const signIn = async (email: string, password: string) => {
  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return result
}

const signOut = async () => {
  const supabase = await createClient()
  await supabase.auth.signOut({ scope: "local" })

  revalidatePath("/")
  redirect("/")
}

export { signIn, signOut }
