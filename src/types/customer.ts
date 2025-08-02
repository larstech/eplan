import { Id } from "./id"

type Customer = {
  id?: Id
  companyName: String
  address: Address | null
  contact: CustomerContact | null
  travelTimeMinutes: number
  breakTimeMinutes: number
  notes: String
}

type Address = {
  id?: Id
  customerId: String
  country: String
  postalCode: String
  houseNumber: String
  street: String
  city: String
}

type CustomerContact = {
  id?: Id
  customerId: String
  firstName: String
  lastName: String
  phoneNumber: String
}

export type { Customer, Address, CustomerContact }
