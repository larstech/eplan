import { Id } from "@/types/id"

export type Customer = {
  id?: Id
  companyName: string
  address: Address
  contact: CustomerContact
  distanceInKm: number
  travelTimeMinutes: number
  breakTimeMinutes: number
  notes: string
}

export type Address = {
  id?: Id
  country: string
  postalCode: string
  houseNumber: string
  street: string
  city: string
}

export type CustomerContact = {
  id?: Id
  firstName: string
  lastName: string
  phoneNumber: string
}
