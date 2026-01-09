import "@/app/v2/styles/globals.css"
import { ReactNode } from "react"

type LayoutParams = Readonly<{ children: ReactNode }>

export default async function Layout({ children }: LayoutParams) {
  return <main className="container-fluid">{children}</main>
}
