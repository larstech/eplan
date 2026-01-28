import { editEmployee } from "../actions"
import { Employee } from "@/features/employee"
import { FormEvent, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

type EmployeeEditViewProps = {
  employee: Employee
  show: boolean
  onHide: () => void
}

export default function EmployeeEditView({
  employee,
  show,
  onHide,
}: EmployeeEditViewProps) {
  const [firstName, setFirstName] = useState(employee.firstName)
  const [lastName, setLastName] = useState(employee.lastName)
  const [freelancer, setFreelancer] = useState(employee.freelancer)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await editEmployee({
      ...employee,
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
        <Modal.Title>Medewerker bewerken</Modal.Title>
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
          {/* Cancel editing the employee details */}
          <Button disabled={isSubmitting} variant="secondary" onClick={onHide}>
            Annuleren
          </Button>

          {/* Confirm the changes in the employee details */}
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
