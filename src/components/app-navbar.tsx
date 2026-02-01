"use client"

import ThemeSwitcher from "@/features/theme-switcher/components/view"
import { route } from "@/helpers/routes"
import { authClient } from "@/lib/auth/client"
import Image from "next/image"
import Link from "next/link"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { signOut } from "@/features/auth/actions"

export default function AppNavbar() {
  const { data: session } = authClient.useSession()

  const handleLogout = async () => {
    await signOut()
  }

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

          <Navbar.Text className="ms-auto d-flex align-items-center justify-content-between gap-2">
            {session && session.user && (
              <NavDropdown title={session.user.name} className="me-3">
                <NavDropdown.Item onClick={handleLogout}>Log uit</NavDropdown.Item>
              </NavDropdown>
            )}

            <Nav.Item>
              <ThemeSwitcher />
            </Nav.Item>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
