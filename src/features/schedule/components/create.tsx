import { createScheduleItem } from "../actions"
import {
  commonEndTime,
  commonStartTime,
  ScheduleItemFormData,
} from "@/features/schedule"
import ScheduleItemFormView from "@/features/schedule/components/form"
import { DateTime } from "luxon"
import { FormEvent, useState } from "react"

type ScheduleItemCreateViewProps = {
  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

const initialFormData: ScheduleItemFormData = {
  workOrderPid: "",
  employeeId: -1,
  date: DateTime.now().toFormat("yyyy-LL-dd"),
  startTime: commonStartTime,
  endTime: commonEndTime,
  note: "",
}

export default function ScheduleItemCreateView({
  show,
  onHide,
}: ScheduleItemCreateViewProps) {
  const [formData, setFormData] =
    useState<ScheduleItemFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Use the partial data object to update the form state, since not all fields may contain a value yet
  const updateFormData = (data: Partial<ScheduleItemFormData>) => {
    setFormData((prev: ScheduleItemFormData) => ({ ...prev, ...data }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await createScheduleItem({
      id: -1,
      ...formData,
    })

    // Reset the form field values
    setFormData(initialFormData)

    setIsSubmitting(false)
    onHide()
  }

  return (
    <ScheduleItemFormView
      formData={formData}
      formTitle="Werkorder inplannen"
      isSubmitting={isSubmitting}
      updateFormData={updateFormData}
      onSubmit={handleSubmit}
      show={show}
      onHide={onHide}
    />
  )
}
