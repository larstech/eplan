import BootstrapClient from "@/app/v2/providers/bootstrap-client"
import "@/app/v2/styles/globals.css"
import { ReactNode } from "react"

type LayoutParams = Readonly<{ children: ReactNode }>

export default function Layout({ children }: LayoutParams) {
  return (
    <>
      <BootstrapClient />

      {children}
    </>
  )
}
