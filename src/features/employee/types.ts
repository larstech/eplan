export interface EmployeeDTO {
  id: number
  firstName: string
  lastName: string
  freelancer: boolean
}

export class Employee {
  static fromDTO(dto: EmployeeDTO): Employee {
    return new Employee(dto.id, dto.firstName, dto.lastName, dto.freelancer)
  }

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public freelancer: boolean,
  ) {}

  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
