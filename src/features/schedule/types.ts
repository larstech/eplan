import { DateTime } from "luxon"

export interface ScheduleItemDTO {
  id: number
  workOrderPid: string
  employeeId: number
  date: string
  startTime: string
  endTime: string
  note: string
}

export class ScheduleItem {
  static fromDTO(dto: ScheduleItemDTO): ScheduleItem {
    // @ts-expect-error The database returns a Date object, while the application treats it as a string
    const date = DateTime.fromJSDate(dto.date)

    const [startTimeHours, startTimeMinutes] = dto.startTime.split(":")
    const startTimeTrimmed: string = `${startTimeHours}:${startTimeMinutes}`

    const [endTimeHours, endTimeMinutes] = dto.endTime.split(":")
    const endTimeTrimmed: string = `${endTimeHours}:${endTimeMinutes}`

    return new ScheduleItem(
      dto.id,
      dto.workOrderPid,
      dto.employeeId,
      date,
      startTimeTrimmed,
      endTimeTrimmed,
      dto.note,
    )
  }

  constructor(
    public id: number,
    public workOrderPid: string,
    public employeeId: number,
    public date: DateTime,
    public startTime: string,
    public endTime: string,
    public note: string,
  ) {}
}

export type ScheduleItemFormData = Omit<ScheduleItemDTO, "id">
