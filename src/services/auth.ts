"use server"

import { supabase } from "@/libs/supabase"

const signIn = async (email: string, password: string) => {
  const result = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return result
}

export { signIn }
