import { deleteOrganization } from "../actions"
import { Organization } from "@/app/v2/features/organization"
import { FormEvent, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"

type OrganizationDeleteViewProps = {
  organization: Organization | null
  show: boolean
  onHide: () => void
}

export default function OrganizationDeleteView({
  organization,
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
          <li>De werkzaamheden worden behouden</li>
          <li>De contactpersonen worden behouden</li>
        </ul>
        <p>
          Als je <strong>{organization?.name}</strong> wil verwijderen, klik dan
          op &quot;Ik weet het zeker&quot;
        </p>
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
