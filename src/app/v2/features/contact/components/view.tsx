"use client"

import { Contact, ContactDTO } from "@/app/v2/features/contact"
import ContactCreateView from "@/app/v2/features/contact/components/create"
import ContactDeleteView from "@/app/v2/features/contact/components/delete"
import ContactEditView from "@/app/v2/features/contact/components/edit"
import { Organization, OrganizationDTO } from "@/app/v2/features/organization"
import { PencilIcon, Search, TrashIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"

type ContactViewProps = {
  contactDTOs: Promise<ContactDTO[]>
  organizationDTOs: Promise<OrganizationDTO[]>
}

type DataTableHeaderProps = {
  setContactSearchText: (text: string) => void
  organizations: Organization[]
}

type DataTableBodyProps = {
  contacts: Contact[]
  organizations: Organization[]
}

type DataTableEntryProps = {
  contact: Contact
  organization: Organization | undefined
  organizations: Organization[]
}

function DataTableHeader({
  setContactSearchText,
  organizations,
}: DataTableHeaderProps) {
  const [showCreateView, setShowCreateView] = useState(false)

  return (
    <>
      <Row className="g-3">
        <Col md="auto" className="me-auto">
          {/* Search for contacts by name or organization name */}
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Contactpersoon zoeken"
              onChange={(e) => setContactSearchText(e.target.value)}
            />
          </InputGroup>
          <Form.Text muted>Je kan ook zoeken op organisatie</Form.Text>
        </Col>

        <Col md="auto">
          {/* Open view to add new contact */}
          <Button className="w-100" onClick={() => setShowCreateView(true)}>
            Contactpersoon toevoegen
          </Button>
        </Col>
      </Row>

      <ContactCreateView
        organizations={organizations}
        show={showCreateView}
        onHide={() => setShowCreateView(false)}
      />
    </>
  )
}

function DataTableBody({ contacts, organizations }: DataTableBodyProps) {
  // Map contacts to their corresponding organizations. All organizations are
  // fetched beforehand, reducing the need for repeated lookups.
  const contactOrganizationMapping = new Map<
    Contact,
    Organization | undefined
  >()
  contacts.forEach((contact) => {
    const organization = organizations.find(
      (organization) => organization.id === contact.companyId,
    )
    contactOrganizationMapping.set(contact, organization)
  })

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Naam</th>
          <th>Organization</th>
          <th>Locatie</th>
          <th>Email</th>
          <th>Telefoonnummer</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {contactOrganizationMapping.size > 0 ? (
          contacts.map((contact) => (
            <DataTableEntry
              key={contact.id}
              contact={contact}
              organization={contactOrganizationMapping.get(contact)}
              organizations={organizations}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <i>Geen contactpersonen gevonden</i>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function DataTableEntry({
  contact,
  organization,
  organizations,
}: DataTableEntryProps) {
  const [showEditView, setShowEditView] = useState(false)
  const [showDeleteView, setShowDeleteView] = useState(false)

  return (
    <>
      <tr>
        {/* Contact information columns */}
        <td>{contact.fullName()}</td>
        <td>{organization?.name ?? <i>[geen]</i>}</td>
        <td>{contact.address()}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>

        {/* Contact actions column */}
        <td className="align-top">
          <div className="d-flex gap-2">
            {/* Open view to edit contact details */}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setShowEditView(true)}
            >
              <PencilIcon />
            </Button>

            {/* Open view to delete contact */}
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => setShowDeleteView(true)}
            >
              <TrashIcon />
            </Button>
          </div>
        </td>
      </tr>

      <ContactEditView
        contact={contact}
        organizations={organizations}
        show={showEditView}
        onHide={() => setShowEditView(false)}
      />
      <ContactDeleteView
        contact={contact}
        show={showDeleteView}
        onHide={() => setShowDeleteView(false)}
      />
    </>
  )
}

export default function ContactView({
  contactDTOs,
  organizationDTOs,
}: ContactViewProps) {
  // Sorted contacts is set in the useEffect to refresh itself when the contacts are modified in any way
  const [sortedContacts, setSortedContacts] = useState<Contact[]>([])

  // Used for searching for contacts by their full name
  const [contactSearchText, setContactSearchText] = useState("")

  // Map contact DTOs to Contact instances so that complementary methods can be called on them
  const contacts = use(contactDTOs).map((dto) => Contact.fromDTO(dto))

  // Map organization DTOs to Organization instances so that complementary methods can be called on them
  const organizations = use(organizationDTOs).map((dto) =>
    Organization.fromDTO(dto),
  )

  // Filter contacts on their full name or organization name
  const filteredContacts = contacts.filter(
    (contact) =>
      // Filter on full name
      contact
        .fullName()
        .toLowerCase()
        .includes(contactSearchText.toLowerCase()) ||
      // Filter on organization name
      organizations.some(
        (organization) =>
          organization.id === contact.companyId &&
          organization.name
            .toLowerCase()
            .includes(contactSearchText.toLowerCase()),
      ),
  )

  useEffect(() => {
    setSortedContacts(
      // Sort contacts by full name
      filteredContacts.sort((a, b) => a.fullName().localeCompare(b.fullName())),
    )
  }, [contactDTOs, contactSearchText])

  return (
    <Stack gap={3} className="mt-3">
      <h1>Contactpersonenoverzicht</h1>

      <DataTableHeader
        setContactSearchText={setContactSearchText}
        organizations={organizations}
      />
      <DataTableBody contacts={sortedContacts} organizations={organizations} />
    </Stack>
  )
}
