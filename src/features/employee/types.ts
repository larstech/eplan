export interface EmployeeDTO {
  id: number
  firstName: string
  lastName: string
  freelancer: boolean
  email?: string | undefined
  password?: string | undefined
}

export class Employee {
  static fromDTO(dto: EmployeeDTO): Employee {
    return new Employee(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.freelancer,
      dto.email,
    )
  }

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public freelancer: boolean,
    public email?: string | undefined,
  ) {}

  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
