import {
  editScheduleItem,
  ScheduleItem,
  ScheduleItemFormData,
} from "@/app/v2/features/schedule"
import ScheduleItemFormView from "@/app/v2/features/schedule/components/form"
import { FormEvent, useState } from "react"

type ScheduleItemEditViewProps = {
  scheduleItem: ScheduleItem

  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

export default function ScheduleItemEditView({
  scheduleItem,
  show,
  onHide,
}: ScheduleItemEditViewProps) {
  const [formData, setFormData] = useState<ScheduleItemFormData>(scheduleItem)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<ScheduleItemFormData>) => {
    setFormData((prev: ScheduleItemFormData) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await editScheduleItem({
      ...scheduleItem,
      ...formData,
    })

    setIsSubmitting(false)
    onHide()
  }

  return (
    <ScheduleItemFormView
      formData={formData}
      formTitle="Werkorder planning bewerken"
      isSubmitting={isSubmitting}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      show={show}
      onHide={onHide}
    />
  )
}
