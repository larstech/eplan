import { Employee } from "@/features/employee/types"
import { Job } from "@/features/job/types"
import { Id } from "@/types"

export type Calendar = {
  id?: Id
  job: Job
  employee: Employee
  date: Date
  startTime: Date
  endTime: Date
}

export type CalendarBulk = {
  orderId: Id
  employees: {
    employeeId: Id
    dates: string[]
    startTime: string
    endTime: string
  }[]
}
