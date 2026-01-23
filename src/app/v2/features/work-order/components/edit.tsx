import { editWorkOrder } from "../actions"
import { Contact } from "@/app/v2/features/contact"
import { Organization } from "@/app/v2/features/organization"
import { WorkOrder, WorkOrderFormData } from "@/app/v2/features/work-order"
import WorkOrderFormView from "@/app/v2/features/work-order/components/form"
import { FormEvent, useState } from "react"

type WorkOrderEditViewProps = {
  contacts: Contact[]
  organizations: Organization[]
  workOrder: WorkOrder

  // Field that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function WorkOrderEditView({
  contacts,
  organizations,
  workOrder,
  show,
  onHide,
}: WorkOrderEditViewProps) {
  const [formData, setFormData] = useState<WorkOrderFormData>({
    pid: workOrder.pid,
    organizationId: workOrder.organizationId,
    contactId: workOrder.contactId,
    title: workOrder.title,
    description: workOrder.description,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<WorkOrderFormData>) => {
    setFormData((prev: WorkOrderFormData) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await editWorkOrder({
      ...workOrder,
      ...formData,
    })

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
      onSubmit={handleSubmit}
      updateFormData={updateFormData}
      show={show}
      onHide={onHide}
    />
  )
}
