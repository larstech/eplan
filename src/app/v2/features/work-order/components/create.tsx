import { createWorkOrder, getNextWorkOrderId } from "../actions"
import { Contact } from "@/app/v2/features/contact"
import { Organization } from "@/app/v2/features/organization"
import { WorkOrderFormData } from "@/app/v2/features/work-order"
import WorkOrderFormView from "@/app/v2/features/work-order/components/form"
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

    const workOrderId = await getNextWorkOrderId()
    await createWorkOrder({
      id: workOrderId,
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
      formTitle="Werkorder bewerken"
      isSubmitting={isSubmitting}
      organizations={organizations}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      show={show}
      onHide={onHide}
    />
  )
}
