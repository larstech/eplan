import { editOrganization } from "../actions"
import { Organization } from "@/app/v2/features/organization"
import { FormEvent, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

type OrganizationEditViewProps = {
  organization: Organization
  show: boolean
  onHide: () => void
}

export default function OrganizationEditView({
  organization,
  show,
  onHide,
}: OrganizationEditViewProps) {
  const [name, setName] = useState(organization.name)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await editOrganization({
      ...organization,
      name,
    })

    // Reset the form field values
    setName("")

    setIsSubmitting(false)
    onHide()
  }

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Organisatie bewerken</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        {/* Organization details */}
        <Modal.Body>
          <Form.Group>
            <Form.Label>Naam</Form.Label>
            <Form.Control
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel editing the organization details */}
          <Button disabled={isSubmitting} variant="secondary" onClick={onHide}>
            Annuleren
          </Button>

          {/* Confirm the changes in the organization details */}
          <Button disabled={isSubmitting} type="submit" variant="primary">
            {isSubmitting ? (
              <Spinner animation="border" as="span" size="sm" role="status" />
            ) : (
              "Opslaan"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
