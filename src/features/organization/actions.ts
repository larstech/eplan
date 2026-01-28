"use server"

import { OrganizationDTO } from "@/features/organization/types"
import { validate } from "@/features/organization/validation"
import { deleteWorkOrdersByOrganizationId } from "@/features/work-order"
import { route } from "@/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory organization database
const organizations: OrganizationDTO[] = []
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

  revalidatePath(route.organizations)
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

  revalidatePath(route.organizations)
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

  revalidatePath(route.organizations)
}
