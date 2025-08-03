import { Id } from "./id"

type Customer = {
  id?: Id
  companyName: string
  address: Address
  contact: CustomerContact
  travelTimeMinutes: number
  breakTimeMinutes: number
  notes: string
}

type Address = {
  id?: Id
  country: string
  postalCode: string
  houseNumber: string
  street: string
  city: string
}

type CustomerContact = {
  id?: Id
  firstName: string
  lastName: string
  phoneNumber: string
}

export type { Customer, Address, CustomerContact }
