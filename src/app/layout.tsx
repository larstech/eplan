import AppNavbar from "@/components/app-navbar"
import { defaultTheme } from "@/features/theme-switcher/contants"
import { authClient } from "@/lib/auth/client"
import BootstrapClient from "@/providers/bootstrap-client"
import LuxonProvider from "@/providers/luxon-provider"
import "@/styles/globals.css"
import { NeonAuthUIProvider } from "@neondatabase/auth/react"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { Container } from "react-bootstrap"

type LayoutParams = Readonly<{ children: React.ReactNode }>

export const metadata: Metadata = {
  title: "Elektronisch Planbord",
  description:
    "Elektronisch planbord voor Yourtech, een simpel alternatief voor Excel",
}

export default async function Layout({ children }: LayoutParams) {
  const theme = (await cookies()).get("theme")?.value ?? defaultTheme

  return (
    <html lang="nl" data-bs-theme={theme} suppressHydrationWarning>
      <body>
        <NeonAuthUIProvider authClient={authClient}>
          <BootstrapClient />
          <LuxonProvider />

          <AppNavbar />

          <Container fluid>{children}</Container>
        </NeonAuthUIProvider>
      </body>
    </html>
  )
}
