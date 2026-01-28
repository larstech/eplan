import { defaultTheme } from "@/app/v2/features/theme-switcher/contants"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { cookies } from "next/headers"

type LayoutParams = Readonly<{ children: React.ReactNode }>

export const metadata: Metadata = {
  title: "Elektronisch Planbord",
  description:
    "Elektronisch planbord voor Yourtech, een simpel alternatief voor Excel",
}

export default async function Layout({ children }: LayoutParams) {
  const theme = (await cookies()).get("theme")?.value ?? defaultTheme

  return (
    <html lang="nl" data-bs-theme={theme}>
      <body>
        {children}

        <Toaster />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
