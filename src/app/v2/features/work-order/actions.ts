"use server"

import { WorkOrderDTO } from "@/app/v2/features/work-order/types"
import { validate } from "@/app/v2/features/work-order/validation"
import { route, routes } from "@/app/v2/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory workOrder database
const workOrders: WorkOrderDTO[] = [
  {
    id: 1,
    pid: "101",
    organizationId: 1,
    contactId: 1,
    title: "Repareer lijn 1",
    description: "",
  },
  {
    id: 2,
    pid: "102",
    organizationId: 1,
    contactId: 2,
    title: "Vervang koelvloeistof",
    description: "",
  },
  {
    id: 3,
    pid: "103",
    organizationId: 1,
    contactId: 3,
    title: "Controleer heftruck batterij",
    description: "",
  },
  {
    id: 4,
    pid: "104",
    organizationId: 1,
    contactId: 4,
    title: "Reinig opslagruimte",
    description: "",
  },
  {
    id: 5,
    pid: "105",
    organizationId: 1,
    contactId: 5,
    title: "Inspecteer verpakking machines",
    description: "",
  },
  {
    id: 6,
    pid: "106",
    organizationId: 2,
    contactId: 6,
    title: "Kalibreer weegsystemen",
    description: "",
  },
  {
    id: 7,
    pid: "107",
    organizationId: 2,
    contactId: 7,
    title: "Ververs filters koeling",
    description: "",
  },
  {
    id: 8,
    pid: "108",
    organizationId: 2,
    contactId: 8,
    title: "Controleer voorraadniveau's",
    description: "",
  },
  {
    id: 9,
    pid: "109",
    organizationId: 2,
    contactId: 9,
    title: "Repareer verpakkingslijn",
    description: "",
  },
  {
    id: 10,
    pid: "110",
    organizationId: 3,
    contactId: 10,
    title: "Onderhoud transportbanden",
    description: "",
  },
  {
    id: 11,
    pid: "111",
    organizationId: 3,
    contactId: 11,
    title: "Vervang storing motor",
    description: "",
  },
  {
    id: 12,
    pid: "112",
    organizationId: 3,
    contactId: 12,
    title: "Herstel storing in software",
    description: "",
  },
  {
    id: 13,
    pid: "113",
    organizationId: 4,
    contactId: 13,
    title: "Verhuis voorraden naar magazijn",
    description: "",
  },
  {
    id: 14,
    pid: "114",
    organizationId: 4,
    contactId: 14,
    title: "Reinig gekoelde opslag",
    description: "",
  },
  {
    id: 15,
    pid: "115",
    organizationId: 4,
    contactId: 15,
    title: "Update voorraad systeem",
    description: "",
  },
  {
    id: 16,
    pid: "116",
    organizationId: 5,
    contactId: 1,
    title: "Vervang beschadigd rek",
    description: "",
  },
  {
    id: 17,
    pid: "117",
    organizationId: 5,
    contactId: 2,
    title: "Inspecteer inpakstations",
    description: "",
  },
  {
    id: 18,
    pid: "118",
    organizationId: 6,
    contactId: 3,
    title: "Test laad- en lospoorten",
    description: "",
  },
  {
    id: 19,
    pid: "119",
    organizationId: 6,
    contactId: 4,
    title: "Repareer verpakkingsmachine",
    description: "",
  },
  {
    id: 20,
    pid: "120",
    organizationId: 7,
    contactId: 5,
    title: "Update etiket software",
    description: "",
  },
]

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

  revalidatePath(route(routes.workOrders))
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

  revalidatePath(route(routes.workOrders))
}

export const deleteWorkOrder = async (workOrderId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = workOrders.findIndex((e) => e.id === workOrderId)
  if (index === -1) {
    return
  }

  workOrders.splice(index, 1)

  revalidatePath(route(routes.workOrders))
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
