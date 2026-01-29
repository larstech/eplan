import { createOrganization } from "../actions"
import { FormEvent, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

type OrganizationCreateViewProps = {
  show: boolean
  onHide: () => void
}

export default function OrganizationCreateView({
  show,
  onHide,
}: OrganizationCreateViewProps) {
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createOrganization({ id: -1, name })

    // Reset the form field values
    setName("")

    setIsSubmitting(false)
    onHide()
  }

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Organisatie toevoegen</Modal.Title>
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
          {/* Cancel creating the new organization */}
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Annuleren
          </Button>

          {/* Confirm creating the new organization */}
          <Button variant="primary" type="submit" disabled={isSubmitting}>
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
