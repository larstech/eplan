"use server"

import { OrganizationDTO } from "@/features/organization/types"
import { validate } from "@/features/organization/validation"
import { deleteWorkOrdersByOrganizationId } from "@/features/work-order"
import { route } from "@/helpers/routes"
import { adminAction, authAction } from "@/lib/auth/action"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchOrganizations = async (): Promise<OrganizationDTO[]> => {
  return (
    (await authAction(async () => {
      return await sql<OrganizationDTO[]>`SELECT *
                                      FROM organizations`
    })) ?? []
  )
}

export const createOrganization = async (organizationDTO: OrganizationDTO) => {
  await adminAction(async () => {
    if (!validate(organizationDTO)) {
      return
    }

    await sql`INSERT INTO organizations (name)
              VALUES (${organizationDTO.name})`

    revalidatePath(route.organizations)
  })
}

export const editOrganization = async (organizationDTO: OrganizationDTO) => {
  await adminAction(async () => {
    if (!validate(organizationDTO)) {
      return
    }

    await sql`UPDATE organizations
              SET name = ${organizationDTO.name}
              WHERE id = ${organizationDTO.id}`

    revalidatePath(route.organizations)
  })
}

export const deleteOrganization = async (organizationId: number) => {
  await adminAction(async () => {
    await deleteWorkOrdersByOrganizationId(organizationId)
    await sql`DELETE FROM organizations
              WHERE id = ${organizationId}`

    revalidatePath(route.organizations)
  })
}
