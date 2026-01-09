export interface EmployeeDTO {
  id: number
  firstName: string
  lastName: string
}

export class Employee {
  static fromDTO(dto: EmployeeDTO): Employee {
    return new Employee(dto.id, dto.firstName, dto.lastName)
  }

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
  ) {}

  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}
