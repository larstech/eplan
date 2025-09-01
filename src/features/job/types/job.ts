import { Customer } from "@/features/customer/types"
import { Id } from "@/types"

export type Job = {
  id?: Id
  orderId: number
  customer: Customer
  title: string
  description: string
}
