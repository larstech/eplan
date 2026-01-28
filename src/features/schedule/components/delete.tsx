import { Employee } from "@/features/employee"
import { deleteScheduleItem, ScheduleItem } from "@/features/schedule"
import { WorkOrder } from "@/features/work-order"
import { localDateString } from "@/helpers/date"
import { FormEvent, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"

type ScheduleItemDeleteViewProps = {
  employee: Employee
  scheduleItem: ScheduleItem
  workOrder: WorkOrder

  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ScheduleItemDeleteView({
  employee,
  scheduleItem,
  workOrder,
  show,
  onHide,
}: ScheduleItemDeleteViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await deleteScheduleItem(scheduleItem?.id ?? -1)

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
        <Modal.Title>Agenda item verwijderen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Highlight the consequences of deleting a schedule item */}
        <p>
          Een agenda item verwijderen is een permanente actie en kan niet worden
          teruggedraaid. Wees bewust van de gevolgen:
        </p>
        <ul>
          <li>Het agenda item wordt direct uit het systeem verwijderd</li>
          <li>Het werkorder wordt behouden</li>
        </ul>
        <p>
          Als je <strong>{employee.fullName()}</strong> op{" "}
          <strong>
            {localDateString(scheduleItem.date, { dateStyle: "full" })}
          </strong>{" "}
          van <strong>PID {workOrder.pid}</strong> wil verwijderen, klik dan op
          &quot;Ik weet het zeker&quot;
        </p>
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel the deletion of a schedule item */}
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuleren
        </Button>

        {/* Confirm the deletion of a schedule item */}
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
