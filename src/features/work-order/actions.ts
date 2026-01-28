"use server"

import { WorkOrderDTO } from "@/features/work-order/types"
import { validate } from "@/features/work-order/validation"
import { route } from "@/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory workOrder database
const workOrders: WorkOrderDTO[] = []

let lastWorkOrderId = workOrders.length

export const getNextWorkOrderId = async (): Promise<number> => ++lastWorkOrderId

export const fetchWorkOrders = async (): Promise<WorkOrderDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return workOrders
}

export const fetchWorkOrderByPid = async (
  pid: string,
): Promise<WorkOrderDTO | undefined> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return workOrders.find((workOrder) => workOrder.pid === pid)
}

export const createWorkOrder = async (workOrderDTO: WorkOrderDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(workOrderDTO)) {
    return
  }

  workOrders.push(workOrderDTO)

  revalidatePath(route.workOrders)
}

export const editWorkOrder = async (workOrder: WorkOrderDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(workOrder)) {
    return
  }

  const index = workOrders.findIndex((e) => e.id === workOrder.id)
  if (index === -1) {
    return
  }

  workOrders[index] = workOrder

  revalidatePath(route.workOrders)
}

export const deleteWorkOrder = async (workOrderId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = workOrders.findIndex((e) => e.id === workOrderId)
  if (index === -1) {
    return
  }

  workOrders.splice(index, 1)

  revalidatePath(route.workOrders)
}

export const deleteWorkOrdersByOrganizationId = async (
  organizationId: number,
) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  workOrders.splice(
    0,
    workOrders.length,
    ...workOrders.filter(
      (workOrder) => workOrder.organizationId !== organizationId,
    ),
  )
}
