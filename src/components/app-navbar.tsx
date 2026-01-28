"use client"

import ThemeSwitcher from "@/features/theme-switcher/components/view"
import { route } from "@/helpers/routes"
import Image from "next/image"
import Link from "next/link"
import { Container, Nav, Navbar } from "react-bootstrap"

export default function AppNavbar() {
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
          <Nav className="me-auto">
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

          <Navbar.Text>
            <ThemeSwitcher />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
