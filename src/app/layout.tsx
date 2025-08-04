import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/sonner"

type LayoutParams = Readonly<{ children: React.ReactNode }>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Elektronisch Planbord",
  description:
    "Elektronisch planbord voor Yourtech, een simpel alternatief voor Excel",
}

export default function Layout({ children }: LayoutParams) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Toaster />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
