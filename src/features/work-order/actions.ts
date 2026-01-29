"use server"

import { WorkOrderDTO } from "@/features/work-order/types"
import { validate } from "@/features/work-order/validation"
import { route } from "@/helpers/routes"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchWorkOrders = async (): Promise<WorkOrderDTO[]> => {
  return (
    await sql<WorkOrderDTO[]>`SELECT *
                              FROM work_orders`
  ).map((workOrder: any) => ({
    ...workOrder,
    organizationId: workOrder.organization_id,
    contactId: workOrder.contact_id,
  }))
}

export const createWorkOrder = async (workOrderDTO: WorkOrderDTO) => {
  if (!validate(workOrderDTO)) {
    return
  }

  await sql`INSERT INTO work_orders (pid, organization_id, contact_id, title, description)
            VALUES (${workOrderDTO.pid}, ${workOrderDTO.organizationId}, ${workOrderDTO.contactId}, ${workOrderDTO.title}, ${workOrderDTO.description})`

  revalidatePath(route.workOrders)
}

export const editWorkOrder = async (workOrder: WorkOrderDTO) => {
  if (!validate(workOrder)) {
    return
  }

  await sql`UPDATE work_orders
            SET organization_id = ${workOrder.organizationId}, contact_id = ${workOrder.contactId}, title = ${workOrder.title}, description = ${workOrder.description}
            WHERE pid = ${workOrder.pid}`

  revalidatePath(route.workOrders)
}

export const deleteWorkOrder = async (workOrderId: number) => {
  await sql`DELETE FROM work_orders
            WHERE pid = ${workOrderId}`

  revalidatePath(route.workOrders)
}

export const deleteWorkOrdersByOrganizationId = async (
  organizationId: number,
) => {
  await sql`DELETE FROM work_orders
            WHERE organization_id = ${organizationId}`

  revalidatePath(route.workOrders)
}
