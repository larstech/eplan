"use client"

import ThemeSwitcher from "@/features/theme-switcher/components/view"
import { route } from "@/helpers/routes"
import { authClient } from "@/lib/auth/client"
import Image from "next/image"
import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"

export default function AppNavbar() {
  const { data: session } = authClient.useSession()

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Image
            src="/yourtech-logo.svg"
            alt="Yourtech logo"
            height={30}
            width={107}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          {session && session.user && session.user.role === "admin" && (
            <Nav>
              <Nav.Link as={Link} href={route.schedule}>
                Agenda
              </Nav.Link>
              <Nav.Link as={Link} href={route.workOrders}>
                Werkorders
              </Nav.Link>
              <Nav.Link as={Link} href={route.employees}>
                Medewerkers
              </Nav.Link>
              <Nav.Link as={Link} href={route.organizations}>
                Organisaties
              </Nav.Link>
              <Nav.Link as={Link} href={route.contacts}>
                Contactpersonen
              </Nav.Link>
            </Nav>
          )}

          <Navbar.Text className="ms-auto">
            <ThemeSwitcher />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
