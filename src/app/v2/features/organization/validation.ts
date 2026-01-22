import { OrganizationDTO } from "@/app/v2/features/organization/types"
import z from "zod"

const OrganizationZod = z.object({
  id: z.number(),
  name: z.string(),
})

export const validate = (organization: OrganizationDTO): boolean => {
  const data = OrganizationZod.safeParse(organization)
  return data.success
}
