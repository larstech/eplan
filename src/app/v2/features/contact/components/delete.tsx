import { deleteContact } from "../actions"
import { Contact } from "@/app/v2/features/contact"
import { FormEvent, useState } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"

type ContactDeleteViewProps = {
  contact: Contact | null

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ContactDeleteView({
  contact,
  show,
  onHide,
}: ContactDeleteViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await deleteContact(contact?.id ?? -1)

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
        <Modal.Title>Contactpersoon verwijderen</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Highlight the consequences of deleting a contact */}
        <p>
          Een contactpersoon verwijderen is een permanente actie en kan niet
          worden teruggedraaid. Wees bewust van de gevolgen:
        </p>
        <ul>
          <li>De contactpersoon wordt direct uit het systeem verwijderd</li>
          <li>De contactpersoon wordt ontzegd op de organization</li>
          <li>De contactpersoon wordt ontzegd op zijn/haar taken</li>
        </ul>
        <p>
          Als je <strong>{contact?.fullName()}</strong> wil verwijderen, klik
          dan op &quot;Ik weet het zeker&quot;
        </p>
      </Modal.Body>

      <Modal.Footer>
        {/* Cancel the deletion of a contact */}
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Annuleren
        </Button>

        {/* Confirm the deletion of a contact */}
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
