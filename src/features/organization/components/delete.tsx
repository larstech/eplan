import { deleteOrganization } from "../actions"
import { Organization } from "@/features/organization"
import { WorkOrder } from "@/features/work-order"
import { FormEvent, useState } from "react"
import { Accordion, Button, Modal, Spinner, Table } from "react-bootstrap"

type OrganizationDeleteViewProps = {
  organization: Organization | null
  workOrders: WorkOrder[]
  show: boolean
  onHide: () => void
}

type AffectedWorkOrdersProps = {
  workOrders: WorkOrder[]
}

function AffectedWorkOrders({ workOrders }: AffectedWorkOrdersProps) {
  // Sort work orders by pipedrive id
  const sortedWorkOrders = workOrders.sort((a, b) =>
    b.pid.toString().localeCompare(a.pid.toString()),
  )

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Werkorders die worden verwijderd</Accordion.Header>
        <Accordion.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>PID</th>
                <th>Titel</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorkOrders.length > 0 ? (
                sortedWorkOrders.map((workOrder) => (
                  <tr key={workOrder.id}>
                    <td>{workOrder.pid}</td>
                    <td>{workOrder.title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>
                    <i>Geen werkorders gevonden</i>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default function OrganizationDeleteView({
  organization,
  workOrders,
  show,
  onHide,
}: OrganizationDeleteViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await deleteOrganization(organization?.id ?? -1)

    setIsSubmitting(false)
    onHide()
  }

  return (
    <Modal
      backdrop="static"
      centered
      keyboard={false}
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Organisatie verwijderen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Highlight the consequences of deleting an organization */}
        <p>
          Een organisatie verwijderen is een permanente actie en kan niet worden
          teruggedraaid. Wees bewust van de gevolgen:
        </p>
        <ul>
          <li>De organisatie wordt direct uit het systeem verwijderd</li>
          <li>De werkorders worden direct uit het systeem verwijderd </li>
          <li>De contactpersonen worden behouden</li>
        </ul>
        <p>
          Als je <strong>{organization?.name}</strong> wil verwijderen, klik dan
          op &quot;Ik weet het zeker&quot;
        </p>

        {/*
         * Highlight the work orders that will be deleted as part of the organization deletion.
         * The affected work orders are very important to take into consideration because it's an irreversible action
         */}
        <AffectedWorkOrders workOrders={workOrders} />
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel the deletion of an organization */}
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuleren
        </Button>

        {/* Confirm the deletion of an organization */}
        <Button
          variant="danger"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <Spinner animation="border" as="span" size="sm" role="status" />
          ) : (
            "Ik weet het zeker"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
