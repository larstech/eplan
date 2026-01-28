"use server"

import { defaultTheme } from "@/app/v2/features/theme-switcher/contants"
import { cookies } from "next/headers"

export const toggleTheme = async (): Promise<"light" | "dark"> => {
  const cookieStore = await cookies()
  const theme = cookieStore.get("theme")?.value

  const nextTheme =
    theme === "light" ? "dark" : theme === "dark" ? "light" : defaultTheme

  cookieStore.set("theme", nextTheme, {
    path: "/",
    sameSite: "strict",
  })

  return nextTheme
}
