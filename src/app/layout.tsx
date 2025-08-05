import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"

type LayoutParams = Readonly<{ children: React.ReactNode }>

export const metadata: Metadata = {
  title: "Elektronisch Planbord",
  description:
    "Elektronisch planbord voor Yourtech, een simpel alternatief voor Excel",
}

export default function Layout({ children }: LayoutParams) {
  return (
    <html lang="nl">
      <body>
        {children}

        <Toaster />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
