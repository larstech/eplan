"use server"

import { OrganizationDTO } from "@/app/v2/features/organization/types"
import { validate } from "@/app/v2/features/organization/validation"
import { deleteWorkOrdersByOrganizationId } from "@/app/v2/features/work-order"
import { route, routes } from "@/app/v2/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory organization database
const organizations: OrganizationDTO[] = [
  { id: 1, name: "Van der Veen Logistiek" },
  { id: 2, name: "Bakker Transportgroep" },
  { id: 3, name: "Holland Food Movers" },
  { id: 4, name: "De Boer Distributie" },
  { id: 5, name: "Langerhuize Logistiek" },
  { id: 6, name: "Klaassen Food Services" },
  { id: 7, name: "Zorgeloos Logistiek" },
  { id: 8, name: "Flevoland Vervoer" },
  { id: 9, name: "Groenveld Voedingslogistiek" },
  { id: 10, name: "De Vries Transport" },
]

let lastOrganizationId = organizations.length

export const getNextOrganizationId = async (): Promise<number> =>
  ++lastOrganizationId

export const fetchOrganizations = async (): Promise<OrganizationDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return organizations
}

export const createOrganization = async (organizationDTO: OrganizationDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(organizationDTO)) {
    return
  }

  organizations.push(organizationDTO)

  revalidatePath(route(routes.organizations))
}

export const editOrganization = async (organizationDTO: OrganizationDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(organizationDTO)) {
    return
  }

  const index = organizations.findIndex((e) => e.id === organizationDTO.id)
  if (index === -1) {
    return
  }

  organizations[index] = organizationDTO

  revalidatePath(route(routes.organizations))
}

export const deleteOrganization = async (organizationId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = organizations.findIndex((e) => e.id === organizationId)
  if (index === -1) {
    return
  }

  await deleteWorkOrdersByOrganizationId(organizationId)
  organizations.splice(index, 1)

  revalidatePath(route(routes.organizations))
}
