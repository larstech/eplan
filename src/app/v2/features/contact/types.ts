export interface ContactDTO {
  id: number
  companyId: number | undefined
  country: string
  streetName: string
  houseNumber: string
  postalCode: string
  city: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export class Contact {
  static fromDTO(dto: ContactDTO): Contact {
    return new Contact(
      dto.id,
      dto.companyId,
      dto.country,
      dto.streetName,
      dto.houseNumber,
      dto.postalCode,
      dto.city,
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone,
    )
  }

  constructor(
    public id: number,
    public companyId: number | undefined,
    public country: string,
    public streetName: string,
    public houseNumber: string,
    public postalCode: string,
    public city: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
  ) {}

  address(): string {
    let address = `${this.streetName} ${this.houseNumber}, ${this.postalCode} ${this.city}`

    // The most significant part of the addresses are located in the Netherlands.
    // Therefore, only display the country if it is not the Netherlands
    if (this.country !== "Nederland") {
      address += `, ${this.country}`
    }

    return address
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }
}

export type ContactFormData = Omit<ContactDTO, "id">
