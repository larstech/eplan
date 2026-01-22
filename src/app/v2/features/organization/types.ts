export interface OrganizationDTO {
  id: number
  name: string
}

export class Organization {
  static fromDTO(dto: OrganizationDTO): Organization {
    return new Organization(dto.id, dto.name)
  }

  constructor(
    public id: number,
    public name: string,
  ) {}
}
