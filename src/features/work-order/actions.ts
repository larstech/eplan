"use server"

import { WorkOrderDTO } from "@/features/work-order/types"
import { validate } from "@/features/work-order/validation"
import { route } from "@/helpers/routes"
import { adminAction, authAction } from "@/lib/auth/action"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchWorkOrders = async (): Promise<WorkOrderDTO[]> => {
  return (
    (await authAction(async () => {
      return (
        await sql<WorkOrderDTO[]>`SELECT *
                                FROM work_orders`
      ).map((workOrder: any) => ({
        ...workOrder,
        organizationId: workOrder.organization_id,
        contactId: workOrder.contact_id,
      }))
    })) ?? []
  )
}

export const createWorkOrder = async (workOrderDTO: WorkOrderDTO) => {
  await adminAction(async () => {
    if (!validate(workOrderDTO)) {
      return
    }

    await sql`INSERT INTO work_orders (pid, organization_id, contact_id, title, description)
              VALUES (${workOrderDTO.pid}, ${workOrderDTO.organizationId}, NULLIF(${workOrderDTO.contactId}, -1), ${workOrderDTO.title}, ${workOrderDTO.description})`

    revalidatePath(route.workOrders)
  })
}

export const editWorkOrder = async (workOrder: WorkOrderDTO) => {
  await adminAction(async () => {
    if (!validate(workOrder)) {
      return
    }

    await sql`UPDATE work_orders
              SET organization_id = ${workOrder.organizationId}, contact_id = NULLIF(${workOrder.contactId}, -1), title = ${workOrder.title}, description = ${workOrder.description}
              WHERE id = ${workOrder.id}`

    revalidatePath(route.workOrders)
  })
}

export const deleteWorkOrder = async (workOrderId: number) => {
  await adminAction(async () => {
    await sql`DELETE FROM work_orders
              WHERE id = ${workOrderId}`

    revalidatePath(route.workOrders)
  })
}

export const deleteWorkOrdersByOrganizationId = async (
  organizationId: number,
) => {
  await adminAction(async () => {
    await sql`DELETE FROM work_orders
              WHERE organization_id = ${organizationId}`

    revalidatePath(route.workOrders)
  })
}
