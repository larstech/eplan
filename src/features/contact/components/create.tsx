import { createContact } from "../actions"
import { ContactFormData } from "../types"
import ContactFormView from "@/features/contact/components/form"
import { Organization } from "@/features/organization"
import { FormEvent, useState } from "react"

type ContactCreateViewProps = {
  organizations: Organization[]

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

const initialFormData: ContactFormData = {
  companyId: -1,
  country: "",
  streetName: "",
  houseNumber: "",
  postalCode: "",
  city: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
}

export default function ContactCreateView({
  organizations,
  show,
  onHide,
}: ContactCreateViewProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<ContactFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createContact({ id: -1, ...formData })

    // Reset the form field values
    setFormData(initialFormData)

    setIsSubmitting(false)
    onHide()
  }

  return (
    <ContactFormView
      formData={formData}
      formTitle="Contactpersoon toevoegen"
      isSubmitting={isSubmitting}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      organizations={organizations}
      show={show}
      onHide={onHide}
    />
  )
}
