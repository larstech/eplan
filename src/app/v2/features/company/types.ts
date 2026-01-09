export interface CompanyDTO {
  id: number
  name: string
}

export class Company {
  static fromDTO(dto: CompanyDTO): Company {
    return new Company(dto.id, dto.name)
  }

  constructor(
    public id: number,
    public name: string,
  ) {}
}
