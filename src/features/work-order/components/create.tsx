import { createWorkOrder } from "../actions"
import { Contact } from "@/features/contact"
import { Organization } from "@/features/organization"
import { WorkOrderFormData } from "@/features/work-order"
import WorkOrderFormView from "@/features/work-order/components/form"
import { FormEvent, useState } from "react"

type WorkOrderCreateViewProps = {
  contacts: Contact[]
  organizations: Organization[]

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

const initialFormData: WorkOrderFormData = {
  pid: "",
  organizationId: -1,
  contactId: -1,
  title: "",
  description: "",
}

export default function WorkOrderCreateView({
  contacts,
  organizations,
  show,
  onHide,
}: WorkOrderCreateViewProps) {
  const [formData, setFormData] = useState<WorkOrderFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<WorkOrderFormData>) => {
    setFormData((prev: WorkOrderFormData) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createWorkOrder({
      id: -1,
      ...formData,
    })

    // Reset the form field values
    setFormData(initialFormData)

    setIsSubmitting(false)
    onHide()
  }

  return (
    <WorkOrderFormView
      contacts={contacts}
      formData={formData}
      formTitle="Werkorder toevoegen"
      isSubmitting={isSubmitting}
      organizations={organizations}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      show={show}
      onHide={onHide}
    />
  )
}
