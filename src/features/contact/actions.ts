"use server"

import { ContactDTO } from "@/features/contact/types"
import { validate } from "@/features/contact/validation"
import { route } from "@/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory contact database
const contacts: ContactDTO[] = []

let lastContactId = contacts.length

export const getNextContactId = async (): Promise<number> => ++lastContactId

export const fetchContacts = async (): Promise<ContactDTO[]> => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  return contacts
}

export const createContact = async (contactDTO: ContactDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(contactDTO)) {
    return
  }

  contacts.push(contactDTO)

  revalidatePath(route.contacts)
}

export const editContact = async (contact: ContactDTO) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  if (!validate(contact)) {
    return
  }

  const index = contacts.findIndex((e) => e.id === contact.id)
  if (index === -1) {
    return
  }

  contacts[index] = contact

  revalidatePath(route.contacts)
}

export const deleteContact = async (contactId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = contacts.findIndex((e) => e.id === contactId)
  if (index === -1) {
    return
  }

  contacts.splice(index, 1)

  revalidatePath(route.contacts)
}
