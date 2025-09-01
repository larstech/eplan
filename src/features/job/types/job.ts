import { Id } from "../../../types/id"
import { Customer } from "@/features/customer/types/customer"

export type Job = {
  id?: Id
  orderId: number
  customer: Customer
  title: string
  description: string
}
