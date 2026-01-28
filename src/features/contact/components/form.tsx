import { ContactFormData } from "../types"
import { Organization } from "@/features/organization"
import { FormEvent } from "react"
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap"

type ContactFormViewProps = {
  formData: ContactFormData
  formTitle: string
  isSubmitting: boolean
  onSubmit: (e: FormEvent) => void
  updateFormData: (data: Partial<ContactFormData>) => void

  organizations: Organization[]

  // Field that are used by ModelProps
  show: boolean
  onHide: () => void
}

export default function ContactFormView({
  formData,
  formTitle,
  isSubmitting,
  onSubmit,
  updateFormData,
  organizations,
  show,
  onHide,
}: ContactFormViewProps) {
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{formTitle}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={onSubmit}>
        <Modal.Body>
          {/* Contact organization details */}
          <Form.Select
            value={formData.companyId ?? -1}
            onChange={(e) =>
              updateFormData({ companyId: parseInt(e.target.value) })
            }
          >
            <option value={-1}>Geen organization</option>
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

          <hr />

          {/* Contact location details */}
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Land</Form.Label>
            <Form.Control
              value={formData.country}
              onChange={(e) => updateFormData({ country: e.target.value })}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Straatnaam</Form.Label>
              <Form.Control
                value={formData.streetName}
                onChange={(e) => updateFormData({ streetName: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Huisnummer</Form.Label>
              <Form.Control
                value={formData.houseNumber}
                onChange={(e) =>
                  updateFormData({ houseNumber: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                value={formData.postalCode}
                onChange={(e) => updateFormData({ postalCode: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Stad</Form.Label>
              <Form.Control
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
              />
            </Form.Group>
          </Row>

          <hr />

          {/* Contact personal details */}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Voornaam</Form.Label>
              <Form.Control
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Achternaam</Form.Label>
              <Form.Control
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Telefoonnummer</Form.Label>
              <Form.Control
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
              />
            </Form.Group>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          {/* Cancel creating the contact details */}
          <Button disabled={isSubmitting} variant="secondary" onClick={onHide}>
            Annuleren
          </Button>

          {/* Confirm creating the contact details */}
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
