import { WorkOrderDTO } from "@/app/v2/features/work-order/types"
import z from "zod"

const WorkOrderZod = z.object({
  id: z.number(),
  pipedriveId: z.coerce.string().nonempty(),
  organizationId: z.number(),
  contactId: z.number(),
  title: z.string().nonempty(),
  description: z.string(),
})

export const validate = (workOrder: WorkOrderDTO): boolean => {
  const data = WorkOrderZod.safeParse(workOrder)
  return data.success
}
