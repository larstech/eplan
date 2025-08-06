import { Customer } from "./customer"
import { Id } from "./id"

export type Job = {
  id?: Id
  orderId: number
  customer: Customer
  title: string
  description: string
}
