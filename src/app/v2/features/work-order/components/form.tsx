import { WorkOrderFormData } from "../types"
import { Contact } from "@/app/v2/features/contact"
import { Organization } from "@/app/v2/features/organization"
import { FormEvent } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"

type WorkOrderFormViewProps = {
  contacts: Contact[]
  formData: WorkOrderFormData
  formTitle: string
  isSubmitting: boolean
  organizations: Organization[]
  onSubmit: (e: FormEvent) => void
  updateFormData: (data: Partial<WorkOrderFormData>) => void

  // Field that are used by ModelProps
  show: boolean
  onHide: () => void
}

export default function WorkOrderFormView({
  contacts,
  formData,
  formTitle,
  isSubmitting,
  organizations,
  updateFormData,
  onSubmit,
  show,
  onHide,
}: WorkOrderFormViewProps) {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {/* Work order organization details */}
          <Form.Select
            className="mb-3"
            value={formData.companyId ?? -1}
            onChange={(e) =>
              updateFormData({ companyId: parseInt(e.target.value) })
            }
          >
            <option value={-1}>Geen bedrijf</option>
            {organizations
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((organization) => {
                return (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                )
              })}
          </Form.Select>

          <Form.Select
            value={formData.contactId ?? -1}
            onChange={(e) =>
              updateFormData({ contactId: parseInt(e.target.value) })
            }
          >
            <option value={-1}>Geen contactpersoon</option>
            {contacts
              .sort((a, b) => a.fullName().localeCompare(b.fullName()))
              .map((contact) => {
                return (
                  <option key={contact.id} value={contact.id}>
                    {contact.fullName()}
                  </option>
                )
              })}
          </Form.Select>

          <hr />

          {/* Work order details */}
          <Form.Group className="mb-3">
            <Form.Label>PID</Form.Label>
            <Form.Control
              value={formData.pid}
              onChange={(e) => updateFormData({ pid: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Titel</Form.Label>
            <Form.Control
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Omschrijving</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel creating the work order details */}
          <Button disabled={isSubmitting} variant="secondary" onClick={onHide}>
            Annuleren
          </Button>

          {/* Confirm creating the work order details */}
          <Button disabled={isSubmitting} type="submit" variant="primary">
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
