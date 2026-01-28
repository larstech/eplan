export interface WorkOrderDTO {
  id: number
  pid: string // Pipedrive ID
  organizationId: number | undefined
  contactId: number | undefined
  title: string
  description: string
}

export class WorkOrder {
  static fromDTO(dto: WorkOrderDTO): WorkOrder {
    return new WorkOrder(
      dto.id,
      dto.pid,
      dto.organizationId,
      dto.contactId,
      dto.title,
      dto.description,
    )
  }

  constructor(
    public id: number,
    public pid: string,
    public organizationId: number | undefined,
    public contactId: number | undefined,
    public title: string,
    public description: string,
  ) {}
}

export type WorkOrderFormData = Omit<WorkOrderDTO, "id">
