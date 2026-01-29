import { createEmployee } from "../actions"
import { FormEvent, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

type EmployeeCreateViewProps = {
  show: boolean
  onHide: () => void
}

export default function EmployeeCreateView({
  show,
  onHide,
}: EmployeeCreateViewProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [freelancer, setFreelancer] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createEmployee({
      id: -1,
      firstName,
      lastName,
      freelancer,
    })

    // Reset the form field values
    setFirstName("")
    setLastName("")
    setFreelancer(false)

    setIsSubmitting(false)
    onHide()
  }

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Medewerker toevoegen</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        {/* Employee details */}
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Voornaam</Form.Label>
            <Form.Control
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Achternaam</Form.Label>
            <Form.Control
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Check
              checked={freelancer}
              label="Werkt als zzp'er"
              type="checkbox"
              onChange={(e) => setFreelancer(e.target.checked)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel creating the new employee */}
          <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
            Annuleren
          </Button>

          {/* Confirm creating the new employee */}
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
