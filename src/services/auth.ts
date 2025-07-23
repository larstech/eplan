"use server"

import { createClient } from "@/libs/supabase/server"

const signIn = async (email: string, password: string) => {
  const supabase = await createClient()
  const result = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return result
}

export { signIn }
