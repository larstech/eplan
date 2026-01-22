import { editContact } from "../actions"
import { Contact, ContactFormData } from "@/app/v2/features/contact"
import ContactFormView from "@/app/v2/features/contact/components/form"
import { Organization } from "@/app/v2/features/organization"
import { FormEvent, useState } from "react"

type ContactEditViewProps = {
  contact: Contact
  organizations: Organization[]

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ContactEditView({
  contact,
  organizations,
  show,
  onHide,
}: ContactEditViewProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    companyId: contact.companyId,
    country: contact.country,
    streetName: contact.streetName,
    houseNumber: contact.houseNumber,
    postalCode: contact.postalCode,
    city: contact.city,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phone: contact.phone,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<ContactFormData>) => {
    setFormData((prev: ContactFormData) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await editContact({
      ...contact,
      ...formData,
    })

    setIsSubmitting(false)
    onHide()
  }

  return (
    <ContactFormView
      formData={formData}
      formTitle="Contactpersoon bewerken"
      isSubmitting={isSubmitting}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      organizations={organizations}
      show={show}
      onHide={onHide}
    />
  )
}
