import { Employee } from "./employee"
import { Id } from "./id"
import { Job } from "./job"
import { DateTime } from "luxon"

export type Calendar = {
  id?: Id
  job: Job
  employee: Employee
  date: DateTime
  startTime: DateTime
  endTime: DateTime
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
