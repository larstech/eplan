"use server"

import { ContactDTO } from "@/features/contact/types"
import { validate } from "@/features/contact/validation"
import { route } from "@/helpers/routes"
import { adminAction, authAction } from "@/lib/auth/action"
import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export const fetchContacts = async (): Promise<ContactDTO[]> => {
  return (
    (await authAction(async () => {
      return (
        await sql<ContactDTO[]>`SELECT *
                                  FROM contacts`
      ).map((contact: any) => ({
        ...contact,
        companyId: contact.organization_id,
        streetName: contact.street,
        houseNumber: contact.house_number,
        postalCode: contact.postal_code,
        firstName: contact.first_name,
        lastName: contact.last_name,
      }))
    })) ?? []
  )
}

export const createContact = async (contactDTO: ContactDTO) => {
  await adminAction(async () => {
    if (!validate(contactDTO)) {
      return
    }

    await sql`INSERT INTO contacts (organization_id, country, street, house_number, postal_code, city, first_name, last_name, email, phone)
              VALUES (${contactDTO.companyId}, ${contactDTO.country}, ${contactDTO.streetName}, ${contactDTO.houseNumber}, ${contactDTO.postalCode}, ${contactDTO.city}, ${contactDTO.firstName}, ${contactDTO.lastName}, ${contactDTO.email}, ${contactDTO.phone})`

    revalidatePath(route.contacts)
  })
}

export const editContact = async (contactDTO: ContactDTO) => {
  await adminAction(async () => {
    if (!validate(contactDTO)) {
      return
    }

    await sql`UPDATE contacts
              SET organization_id = ${contactDTO.companyId}, country = ${contactDTO.country}, street = ${contactDTO.streetName}, house_number = ${contactDTO.houseNumber}, postal_code = ${contactDTO.postalCode}, city = ${contactDTO.city}, first_name = ${contactDTO.firstName}, last_name = ${contactDTO.lastName}, email = ${contactDTO.email}, phone = ${contactDTO.phone}
              WHERE id = ${contactDTO.id}`

    revalidatePath(route.contacts)
  })
}

export const deleteContact = async (contactId: number) => {
  await adminAction(async () => {
    await sql`DELETE FROM contacts
              WHERE id = ${contactId}`

    revalidatePath(route.contacts)
  })
}
