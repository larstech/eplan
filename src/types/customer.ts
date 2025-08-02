import { Id } from "./id"

type Customer = {
  id?: Id
  companyName: string
  address: Address | null
  contact: CustomerContact | null
  travelTimeMinutes: number
  breakTimeMinutes: number
  notes: string
}

type Address = {
  id?: Id
  customerId: string
  country: string
  postalCode: string
  houseNumber: string
  street: string
  city: string
}

type CustomerContact = {
  id?: Id
  customerId: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export type { Customer, Address, CustomerContact }
