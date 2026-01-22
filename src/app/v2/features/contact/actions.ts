"use server"

import { ContactDTO } from "@/app/v2/features/contact/types"
import { validate } from "@/app/v2/features/contact/validation"
import { route, routes } from "@/app/v2/helpers/routes"
import { revalidatePath } from "next/cache"

// Temporary in-memory contact database
const contacts: ContactDTO[] = [
  {
    id: 1,
    companyId: 1,
    country: "Nederland",
    streetName: "Dorpsstraat",
    houseNumber: "12",
    postalCode: "1234 AB",
    city: "Amsterdam",
    firstName: "Jan",
    lastName: "de Vries",
    email: "jan.devries@example.nl",
    phone: "0612345678",
  },
  {
    id: 2,
    companyId: 2,
    country: "Nederland",
    streetName: "Kerklaan",
    houseNumber: "45",
    postalCode: "2345 BC",
    city: "Utrecht",
    firstName: "Sanne",
    lastName: "Jansen",
    email: "sanne.jansen@example.nl",
    phone: "0623456789",
  },
  {
    id: 3,
    companyId: 3,
    country: "Nederland",
    streetName: "Stationsweg",
    houseNumber: "8",
    postalCode: "3456 CD",
    city: "Rotterdam",
    firstName: "Pieter",
    lastName: "van Dijk",
    email: "pieter.vandijk@example.nl",
    phone: "0634567890",
  },
  {
    id: 4,
    companyId: 4,
    country: "Nederland",
    streetName: "Molenstraat",
    houseNumber: "102",
    postalCode: "4567 DE",
    city: "Eindhoven",
    firstName: "Laura",
    lastName: "Bakker",
    email: "laura.bakker@example.nl",
    phone: "0645678901",
  },
  {
    id: 5,
    companyId: 5,
    country: "Nederland",
    streetName: "Schoolstraat",
    houseNumber: "19",
    postalCode: "5678 EF",
    city: "Groningen",
    firstName: "Tom",
    lastName: "Visser",
    email: "tom.visser@example.nl",
    phone: "0656789012",
  },
  {
    id: 6,
    companyId: 6,
    country: "Nederland",
    streetName: "Lindelaan",
    houseNumber: "77",
    postalCode: "6789 FG",
    city: "Haarlem",
    firstName: "Anouk",
    lastName: "Smit",
    email: "anouk.smit@example.nl",
    phone: "0667890123",
  },
  {
    id: 7,
    companyId: 7,
    country: "Nederland",
    streetName: "Parkweg",
    houseNumber: "3",
    postalCode: "7890 GH",
    city: "Amersfoort",
    firstName: "Mark",
    lastName: "Meijer",
    email: "mark.meijer@example.nl",
    phone: "0678901234",
  },
  {
    id: 8,
    companyId: 8,
    country: "Nederland",
    streetName: "Beukenstraat",
    houseNumber: "56",
    postalCode: "8901 HJ",
    city: "Apeldoorn",
    firstName: "Lisa",
    lastName: "de Boer",
    email: "lisa.deboer@example.nl",
    phone: "0689012345",
  },
  {
    id: 9,
    companyId: 9,
    country: "Nederland",
    streetName: "Nieuwstraat",
    houseNumber: "21",
    postalCode: "9012 JK",
    city: "Leiden",
    firstName: "Ruben",
    lastName: "Mulder",
    email: "ruben.mulder@example.nl",
    phone: "0690123456",
  },
  {
    id: 10,
    companyId: 10,
    country: "Nederland",
    streetName: "Hoofdstraat",
    houseNumber: "88",
    postalCode: "0123 KL",
    city: "Zwolle",
    firstName: "Eva",
    lastName: "Peters",
    email: "eva.peters@example.nl",
    phone: "0611122233",
  },
  {
    id: 11,
    companyId: 1,
    country: "Nederland",
    streetName: "Walstraat",
    houseNumber: "14",
    postalCode: "1122 LM",
    city: "Middelburg",
    firstName: "Koen",
    lastName: "Hermans",
    email: "koen.hermans@example.nl",
    phone: "0622233344",
  },
  {
    id: 12,
    companyId: 2,
    country: "Nederland",
    streetName: "Vijverlaan",
    houseNumber: "9",
    postalCode: "2233 MN",
    city: "Almere",
    firstName: "Nina",
    lastName: "van Leeuwen",
    email: "nina.vanleeuwen@example.nl",
    phone: "0633344455",
  },
  {
    id: 13,
    companyId: 3,
    country: "Nederland",
    streetName: "Burgemeesterstraat",
    houseNumber: "61",
    postalCode: "3344 NP",
    city: "Helmond",
    firstName: "Daan",
    lastName: "Kok",
    email: "daan.kok@example.nl",
    phone: "0644455566",
  },
  {
    id: 14,
    companyId: 4,
    country: "Nederland",
    streetName: "Oudeweg",
    houseNumber: "27",
    postalCode: "4455 PQ",
    city: "Deventer",
    firstName: "Femke",
    lastName: "Bos",
    email: "femke.bos@example.nl",
    phone: "0655566677",
  },
  {
    id: 15,
    companyId: 5,
    country: "Nederland",
    streetName: "Industrieweg",
    houseNumber: "150",
    postalCode: "5566 QR",
    city: "Tilburg",
    firstName: "Joris",
    lastName: "van den Berg",
    email: "joris.vandenberg@example.nl",
    phone: "0666677788",
  },
]
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

  revalidatePath(route(routes.contacts))
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

  revalidatePath(route(routes.contacts))
}

export const deleteContact = async (contactId: number) => {
  // Fake a delay to simulate an API call
  await new Promise((resolve) => setTimeout(resolve, 200))

  const index = contacts.findIndex((e) => e.id === contactId)
  if (index === -1) {
    return
  }

  contacts.splice(index, 1)

  revalidatePath(route(routes.contacts))
}
