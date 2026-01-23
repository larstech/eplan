"use client"

import { Organization, OrganizationDTO } from "@/app/v2/features/organization"
import OrganizationCreateView from "@/app/v2/features/organization/components/create"
import OrganizationDeleteView from "@/app/v2/features/organization/components/delete"
import OrganizationEditView from "@/app/v2/features/organization/components/edit"
import { PencilIcon, Search, TrashIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { Stack } from "react-bootstrap"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"

type OrganizationViewProps = {
  organizationDTOs: Promise<OrganizationDTO[]>
}

type DataTableHeaderProps = {
  setSearchText: (text: string) => void
}

type DataTableBodyProps = {
  organizations: Organization[]
}

type DataTableEntryProps = {
  organization: Organization
}

function DataTableHeader({ setSearchText }: DataTableHeaderProps) {
  const [showCreateView, setShowCreateView] = useState(false)

  return (
    <>
      <Row className="g-3">
        <Col md="auto" className="me-auto">
          {/* Search for organizations by name */}
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Organisatie zoeken"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md="auto">
          {/* Open view to add new organization */}
          <Button className="w-100" onClick={() => setShowCreateView(true)}>
            Organisatie toevoegen
          </Button>
        </Col>
      </Row>

      <OrganizationCreateView
        show={showCreateView}
        onHide={() => setShowCreateView(false)}
      />
    </>
  )
}

function DataTableBody({ organizations }: DataTableBodyProps) {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th className="w-75">Naam</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {organizations.length > 0 ? (
          organizations.map((organization) => (
            <DataTableEntry key={organization.id} organization={organization} />
          ))
        ) : (
          <tr>
            <td colSpan={2}>
              <i>Geen organisaties gevonden</i>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function DataTableEntry({ organization }: DataTableEntryProps) {
  const [showEditView, setShowEditView] = useState(false)
  const [showDeleteView, setShowDeleteView] = useState(false)

  return (
    <>
      <tr>
        {/* Organization name column */}
        <td>{organization.name}</td>

        {/* Organization actions column */}
        <td className="align-top">
          <div className="d-flex gap-2">
            {/* Open view to edit organization details */}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setShowEditView(true)}
            >
              <PencilIcon />
            </Button>

            {/* Open view to delete organization */}
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

      <OrganizationEditView
        organization={organization}
        show={showEditView}
        onHide={() => setShowEditView(false)}
      />
      <OrganizationDeleteView
        organization={organization}
        show={showDeleteView}
        onHide={() => setShowDeleteView(false)}
      />
    </>
  )
}

export default function OrganizationView({
  organizationDTOs,
}: OrganizationViewProps) {
  // Sorted organizations is set in the useEffect to refresh itself when the organizations are modified in any way
  const [sortedOrganizations, setSortedOrganizations] = useState<
    Organization[]
  >([])

  // Used for searching for organizations by their full name
  const [searchText, setSearchText] = useState("")

  // Map organization DTOs to Organization instances so that complementary methods can be called on them
  const organizations = use(organizationDTOs).map((dto) =>
    Organization.fromDTO(dto),
  )

  // Filter organizations on their full name
  const filteredOrganizations = organizations.filter((organization) =>
    organization.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  useEffect(() => {
    setSortedOrganizations(
      // Sort organizations by full name
      filteredOrganizations.sort((a, b) => a.name.localeCompare(b.name)),
    )
  }, [organizationDTOs, searchText])

  return (
    <Stack gap={3} className="mt-3">
      <h1>Organisatiesoverzicht</h1>

      <DataTableHeader setSearchText={setSearchText} />
      <DataTableBody organizations={sortedOrganizations} />
    </Stack>
  )
}
