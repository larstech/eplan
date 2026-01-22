import { ContactDTO } from "@/app/v2/features/contact/types"
import z from "zod"

const ContactZod = z.object({
  id: z.number(),
  companyId: z.number(),
  country: z.string().nonempty(),
  streetName: z.string().nonempty(),
  houseNumber: z.string().nonempty(),
  postalCode: z.string().nonempty(),
  city: z.string().nonempty(),
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.string().nonempty(),
  phone: z.string().nonempty(),
})

export const validate = (contact: ContactDTO): boolean => {
  const data = ContactZod.safeParse(contact)
  return data.success
}
