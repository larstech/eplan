import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset>
            <NavHeader />

            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
