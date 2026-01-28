"use client"

import { Contact, ContactDTO } from "@/features/contact"
import { Organization, OrganizationDTO } from "@/features/organization"
import { WorkOrder, WorkOrderDTO } from "@/features/work-order"
import WorkOrderCreateView from "@/features/work-order/components/create"
import WorkOrderDeleteView from "@/features/work-order/components/delete"
import WorkOrderEditView from "@/features/work-order/components/edit"
import { PencilIcon, Search, TrashIcon } from "lucide-react"
import { use, useEffect, useState } from "react"
import { OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { Table } from "react-bootstrap"

type WorkOrderViewProps = {
  contactDTOs: Promise<ContactDTO[]>
  organizationDTOs: Promise<OrganizationDTO[]>
  workOrderDTOs: Promise<WorkOrderDTO[]>
}

type DataTableHeaderProps = {
  contacts: Contact[]
  organizations: Organization[]
  setWorkOrderSearchText: (text: string) => void
}

type DataTableBodyProps = {
  contacts: Contact[]
  organizations: Organization[]
  workOrders: WorkOrder[]
}

type DataTableEntryProps = {
  contact: Contact | undefined
  contacts: Contact[]
  organization: Organization | undefined
  organizations: Organization[]
  workOrder: WorkOrder
}

function DataTableHeader({
  contacts,
  organizations,
  setWorkOrderSearchText,
}: DataTableHeaderProps) {
  const [showCreateView, setShowCreateView] = useState(false)

  return (
    <>
      <Row className="g-3">
        <Col md="auto" className="me-auto">
          {/* Search for work orders by name or organization name */}
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              placeholder="Werkorder zoeken"
              onChange={(e) => setWorkOrderSearchText(e.target.value)}
            />
          </InputGroup>
          <Form.Text muted>
            Je kan ook zoeken op organisatie en contactpersoon
          </Form.Text>
        </Col>

        <Col md="auto">
          {/* Open view to add new work order */}
          <Button className="w-100" onClick={() => setShowCreateView(true)}>
            Werkorder toevoegen
          </Button>
        </Col>
      </Row>

      <WorkOrderCreateView
        contacts={contacts}
        organizations={organizations}
        show={showCreateView}
        onHide={() => setShowCreateView(false)}
      />
    </>
  )
}

function DataTableBody({
  contacts,
  organizations,
  workOrders,
}: DataTableBodyProps) {
  // Map work orders to their corresponding organizations. All organizations are
  // fetched beforehand, reducing the need for repeated lookups.
  const workOrderOrganizationMapping = new Map<
    WorkOrder,
    Organization | undefined
  >()
  workOrders.forEach((workOrder) => {
    const organization = organizations.find(
      (organization) => organization.id === workOrder.organizationId,
    )
    workOrderOrganizationMapping.set(workOrder, organization)
  })

  // Map work orders to their corresponding contacts. All contacts are
  // fetched beforehand, reducing the need for repeated lookups.
  const workOrderContactMapping = new Map<WorkOrder, Contact | undefined>()
  workOrders.forEach((workOrder) => {
    const contact = contacts.find(
      (contact) => contact.id === workOrder.contactId,
    )
    workOrderContactMapping.set(workOrder, contact)
  })

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          {/* Show tooltip to indicate PID equals Pipedrive ID */}
          <OverlayTrigger overlay={<Tooltip>Pipedrive ID</Tooltip>}>
            <th>PID</th>
          </OverlayTrigger>
          <th>Titel</th>
          <th>Organisatie</th>
          <th>Contactpersoon</th>
          {/* The description should contain the most details */}
          <th className="w-50">Omschrijving</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {workOrderOrganizationMapping.size > 0 ? (
          workOrders.map((workOrder) => (
            <DataTableEntry
              key={workOrder.id}
              contact={workOrderContactMapping.get(workOrder)}
              contacts={contacts}
              organization={workOrderOrganizationMapping.get(workOrder)}
              organizations={organizations}
              workOrder={workOrder}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6}>
              <i>Geen werkorders gevonden</i>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}

function DataTableEntry({
  contact,
  contacts,
  organization,
  organizations,
  workOrder,
}: DataTableEntryProps) {
  const [showEditView, setShowEditView] = useState(false)
  const [showDeleteView, setShowDeleteView] = useState(false)

  return (
    <>
      <tr>
        {/* Work order information columns */}
        <td>{workOrder.pid}</td>
        <td>{workOrder.title}</td>
        <td>{organization?.name ?? <i>[geen]</i>}</td>
        <td>{contact?.fullName() ?? <i>[geen]</i>}</td>
        <td>{workOrder.description}</td>

        {/* Work order actions column */}
        <td className="align-top">
          <div className="d-flex gap-2">
            {/* Open view to edit work order details */}
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => setShowEditView(true)}
            >
              <PencilIcon />
            </Button>

            {/* Open view to delete work order */}
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

      <WorkOrderEditView
        contacts={contacts}
        organizations={organizations}
        workOrder={workOrder}
        show={showEditView}
        onHide={() => setShowEditView(false)}
      />
      <WorkOrderDeleteView
        workOrder={workOrder}
        show={showDeleteView}
        onHide={() => setShowDeleteView(false)}
      />
    </>
  )
}

export default function WorkOrderView({
  contactDTOs,
  organizationDTOs,
  workOrderDTOs,
}: WorkOrderViewProps) {
  // Sorted work orders is set in the useEffect to refresh itself when the work orders are modified in any way
  const [sortedWorkOrders, setSortedWorkOrders] = useState<WorkOrder[]>([])

  // Used for searching for work orders by their full name
  const [workOrderSearchText, setWorkOrderSearchText] = useState("")

  // Map work order DTOs to WorkOrder instances so that complementary methods can be called on them
  const workOrders = use(workOrderDTOs).map((dto) => WorkOrder.fromDTO(dto))

  // Map organization DTOs to Organization instances so that complementary methods can be called on them
  const organizations = use(organizationDTOs).map((dto) =>
    Organization.fromDTO(dto),
  )

  // Map contact DTOs to Contact instances so that complementary methods can be called on them
  const contacts = use(contactDTOs).map((dto) => Contact.fromDTO(dto))

  // Filter work orders on their title, contact full name, or organization name
  const filteredWorkOrders = workOrders.filter(
    (workOrder) =>
      // Filter on title
      workOrder.pid.toString().includes(workOrderSearchText.toLowerCase()) ||
      // Filter on contact full name
      contacts.some(
        (contact) =>
          contact.id === workOrder.contactId &&
          contact
            .fullName()
            .toLowerCase()
            .includes(workOrderSearchText.toLowerCase()),
      ) ||
      // Filter on organization name
      organizations.some(
        (organization) =>
          organization.id === workOrder.organizationId &&
          organization.name
            .toLowerCase()
            .includes(workOrderSearchText.toLowerCase()),
      ),
  )

  useEffect(() => {
    setSortedWorkOrders(
      // Sort work orders by pipedrive id
      filteredWorkOrders.sort((a, b) =>
        b.pid.toString().localeCompare(a.pid.toString()),
      ),
    )
  }, [workOrderDTOs, workOrderSearchText])

  return (
    <Stack gap={3} className="mt-3">
      <h1>Werkordersoverzicht</h1>

      <DataTableHeader
        contacts={contacts}
        organizations={organizations}
        setWorkOrderSearchText={setWorkOrderSearchText}
      />
      <DataTableBody
        contacts={contacts}
        organizations={organizations}
        workOrders={sortedWorkOrders}
      />
    </Stack>
  )
}
