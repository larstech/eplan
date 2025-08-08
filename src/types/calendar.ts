import { Employee } from "./employee"
import { Id } from "./id"
import { Job } from "./job"

export type Calendar = {
  id?: Id
  job: Job
  employee: Employee
  date: Date
  startTime: Date
  endTime: Date
}
