import { deleteWorkOrder } from "../actions"
import { WorkOrder } from "@/features/work-order"
import { FormEvent, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"

type WorkOrderDeleteViewProps = {
  workOrder: WorkOrder

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function WorkOrderDeleteView({
  workOrder,
  show,
  onHide,
}: WorkOrderDeleteViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await deleteWorkOrder(workOrder.id)

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
        <Modal.Title>Werkorder verwijderen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Highlight the consequences of deleting a workOrder */}
        <p>
          Een werkorder verwijderen is een permanente actie en kan niet worden
          teruggedraaid. Wees bewust van de gevolgen:
        </p>
        <ul>
          <li>Het werkorder wordt direct uit het systeem verwijderd</li>
          <li>Het werkorder wordt direct uit de agenda verwijderd</li>
        </ul>
        <p>
          Als je <strong>PID {workOrder.pid}</strong> wil verwijderen, klik dan
          op &quot;Ik weet het zeker&quot;
        </p>
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel the deletion of a work order */}
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuleren
        </Button>

        {/* Confirm the deletion of a work order */}
        <Button
          variant="danger"
          type="submit"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <Spinner animation="border" as="span" size="sm" />
          ) : (
            "Ik weet het zeker"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
