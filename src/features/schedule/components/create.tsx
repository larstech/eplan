import { createScheduleItem, getNextScheduleItemId } from "../actions"
import {
  commonEndTime,
  commonStartTime,
  ScheduleItemFormData,
} from "@/features/schedule"
import ScheduleItemFormView from "@/features/schedule/components/form"
import { FormEvent, useState } from "react"

type ScheduleItemCreateViewProps = {
  // Fields that are used by ModalProps
  show: boolean
  onHide: () => void
}

const initialFormData: ScheduleItemFormData = {
  workOrderPid: "",
  employeeId: -1,
  date: new Date(),
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

    const scheduleItemId = await getNextScheduleItemId()
    await createScheduleItem({
      id: scheduleItemId,
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
