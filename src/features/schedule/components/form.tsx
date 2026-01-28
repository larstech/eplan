import { ScheduleItemFormData } from "../types"
import {
  EmployeesContext,
  WorkOrdersContext,
} from "@/features/schedule/components/view"
import { FormEvent, useContext } from "react"
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap"

type ScheduleItemFormViewProps = {
  formData: ScheduleItemFormData
  formTitle: string
  isSubmitting: boolean
  onSubmit: (e: FormEvent) => void
  updateFormData: (data: Partial<ScheduleItemFormData>) => void

  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ScheduleItemFormView({
  formData,
  formTitle,
  isSubmitting,
  updateFormData,
  onSubmit,
  show,
  onHide,
}: ScheduleItemFormViewProps) {
  const employees = useContext(EmployeesContext)
  const workOrders = useContext(WorkOrdersContext)

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {/* Work order details */}
          <Form.Group className="mb-3">
            <Form.Label>PID</Form.Label>
            <Form.Control
              value={formData.workOrderPid}
              onChange={(e) => updateFormData({ workOrderPid: e.target.value })}
            />
            {formData.workOrderPid !== "" &&
              workOrders.filter((wo) => wo.pid === formData.workOrderPid)
                .length === 0 && (
                <Form.Text muted>Dit PID bestaat niet</Form.Text>
              )}
          </Form.Group>

          {/* Employee details */}
          <Form.Select
            className="mb-3"
            value={formData.employeeId ?? -1}
            onChange={(e) =>
              updateFormData({ employeeId: parseInt(e.target.value) })
            }
          >
            <option value={-1}>Geen medewerker</option>
            {employees
              .sort((a, b) => a.fullName().localeCompare(b.fullName()))
              .map((employee) => {
                return (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName()}
                  </option>
                )
              })}
          </Form.Select>

          <hr />

          {/* Date and time details */}
          <Form.Group className="mb-3">
            <Form.Label>Datum</Form.Label>
            {/* The value only displays when the time part is trimmed off */}
            <Form.Control
              type="date"
              value={formData.date.toISOString().split("T")[0] ?? ""}
              onChange={(e) =>
                updateFormData({ date: new Date(e.target.value) })
              }
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Starttijd</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    updateFormData({ startTime: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Eindtijd</Form.Label>
                <Form.Control
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateFormData({ endTime: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />

          {/* Optional note for the employee */}
          <Form.Group>
            <Form.Label>Notitie voor de medewerker</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.note}
              onChange={(e) => updateFormData({ note: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel creating/editing the schedule item */}
          <Button disabled={isSubmitting} variant="secondary" onClick={onHide}>
            Annuleren
          </Button>

          {/* Confirm creating/editing the schedule item */}
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <Spinner animation="border" as="span" size="sm" />
            ) : (
              "Opslaan"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
