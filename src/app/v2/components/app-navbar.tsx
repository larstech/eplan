"use client"

import ThemeSwitcher from "@/app/v2/components/theme-switcher"
import { route, routes } from "@/app/v2/helpers/routes"
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
            <Nav.Link as={Link} href={route(routes.schedule)}>
              Agenda
            </Nav.Link>
            <Nav.Link as={Link} href={route(routes.workOrders)}>
              Werkorders
            </Nav.Link>
            <Nav.Link as={Link} href={route(routes.employees)}>
              Medewerkers
            </Nav.Link>
            <Nav.Link as={Link} href={route(routes.organizations)}>
              Organisaties
            </Nav.Link>
            <Nav.Link as={Link} href={route(routes.contacts)}>
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
