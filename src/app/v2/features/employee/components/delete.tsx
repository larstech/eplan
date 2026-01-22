import { deleteEmployee } from "../actions"
import { Employee } from "@/app/v2/features/employee"
import { FormEvent, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"

type EmployeeDeleteViewProps = {
  employee: Employee | null
  show: boolean
  onHide: () => void
}

export default function EmployeeDeleteView({
  employee,
  show,
  onHide,
}: EmployeeDeleteViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await deleteEmployee(employee?.id ?? -1)

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
        <Modal.Title>Medewerker verwijderen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Highlight the consequences of deleting an employee */}
        <p>
          Een medewerker verwijderen is een permanente actie en kan niet worden
          teruggedraaid. Wees bewust van de gevolgen:
        </p>
        <ul>
          <li>De medewerker wordt direct uit het systeem verwijderd</li>
          <li>De medewerker wordt ontzegd op zijn/haar taken</li>
        </ul>
        <p>
          Als je <strong>{employee?.fullName()}</strong> wil verwijderen, klik
          dan op &quot;Ik weet het zeker&quot;
        </p>
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel the deletion of an employee */}
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuleren
        </Button>

        {/* Confirm the deletion of an employee */}
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
