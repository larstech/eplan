import AppNavbar from "@/app/v2/components/app-navbar"
import "@/app/v2/styles/globals.css"
import { ReactNode } from "react"
import { Container } from "react-bootstrap"

type LayoutParams = Readonly<{ children: ReactNode }>

export default function Layout({ children }: LayoutParams) {
  return (
    <>
      <AppNavbar />

      <Container fluid>{children}</Container>
    </>
  )
}
